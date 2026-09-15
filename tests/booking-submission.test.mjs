import assert from "node:assert/strict";
import test from "node:test";

import {
  buildConfirmationEmail,
  buildInternalEmail,
  classifyLeadSource,
  handleBookingRequest,
} from "../worker/booking.js";

const completeFields = {
  projectType: "music-video",
  name: "Kevin Sanelus",
  email: "kevin@example.com",
  location: "Montréal",
  shootDate: "2026-10-10",
  budget: "1k-2.5k",
  brief: "A performance-led music video.",
  projectOne: "Artist",
  projectTwo: "Song",
  language: "en",
  utmSource: "instagram",
  utmMedium: "social",
  utmCampaign: "instagram_profile",
  referrer: "",
  landingPage: "https://kspvision.ca/booking?project=music-video&utm_source=instagram",
};

test("classifies lead attribution conservatively", () => {
  assert.equal(classifyLeadSource({ utmSource: "instagram" }), "Instagram");
  assert.equal(classifyLeadSource({ referrer: "https://www.google.ca/search?q=ksp" }), "Google");
  assert.equal(classifyLeadSource({ referrer: "https://example.com/article" }), "Referral");
  assert.equal(classifyLeadSource({}), "Direct");
  assert.equal(classifyLeadSource({ utmSource: "newsletter" }), "Other (Newsletter)");
});

test("builds the exact English and French inquiry confirmations", () => {
  const english = buildConfirmationEmail("en", "Kevin Sanelus");
  assert.equal(english.subject, "We received your inquiry | KSP Vision");
  assert.match(english.text, /^Hi Kevin,/);
  assert.match(english.text, /within 1–2 business days/);
  assert.doesNotMatch(english.text, /confirmed booking/i);

  const french = buildConfirmationEmail("fr", "Kévin Sanelus");
  assert.equal(french.subject, "Votre demande a bien été reçue | KSP Vision");
  assert.match(french.text, /^Bonjour Kévin,/);
  assert.match(french.text, /dans un délai de 1 à 2 jours ouvrables/);
});

test("keeps internal attribution out of the client confirmation", () => {
  const internal = buildInternalEmail(completeFields, ["song.mp3"]);
  assert.match(internal.text, /Lead source: Instagram/);
  assert.match(internal.text, /UTM campaign: instagram_profile/);
  assert.match(internal.text, /Attachments: song.mp3/);
  assert.doesNotMatch(buildConfirmationEmail("en", completeFields.name).text, /Lead source|UTM campaign/);
});

test("returns failure when delivery is unavailable and success only after both emails are accepted", async () => {
  const unavailable = await handleBookingRequest(
    new Request("https://kspvision.ca/api/booking", { method: "POST", body: new FormData() }),
    {},
  );
  assert.equal(unavailable.status, 503);
  assert.equal((await unavailable.json()).ok, false);

  const form = new FormData();
  for (const [key, value] of Object.entries({ ...completeFields, submissionId: "booking-test-1234" })) {
    form.append(key, value);
  }
  form.append("companyWebsite", "");

  const sent = [];
  const response = await handleBookingRequest(
    new Request("https://kspvision.ca/api/booking", {
      method: "POST",
      headers: { Origin: "https://kspvision.ca" },
      body: form,
    }),
    { RESEND_API_KEY: "test-key" },
    async (_url, init) => {
      sent.push({ headers: init.headers, body: JSON.parse(init.body) });
      return new Response(JSON.stringify({ id: `email-${sent.length}` }), { status: 200 });
    },
  );

  assert.equal(response.status, 200);
  assert.equal((await response.json()).ok, true);
  assert.equal(sent.length, 2);
  assert.equal(sent[0].body.to[0], "bookings@kspvision.ca");
  assert.equal(sent[0].body.reply_to, completeFields.email);
  assert.equal(sent[1].body.to[0], completeFields.email);
  assert.equal(sent[1].body.reply_to, "bookings@kspvision.ca");
  assert.notEqual(sent[0].headers["Idempotency-Key"], sent[1].headers["Idempotency-Key"]);
});

test("does not claim success when the confirmation email fails", async () => {
  const form = new FormData();
  for (const [key, value] of Object.entries({ ...completeFields, submissionId: "booking-test-5678" })) {
    form.append(key, value);
  }

  let requests = 0;
  const response = await handleBookingRequest(
    new Request("https://kspvision.ca/api/booking", { method: "POST", body: form }),
    { RESEND_API_KEY: "test-key" },
    async () => new Response(requests++ === 0 ? "{}" : "failed", { status: requests === 1 ? 200 : 500 }),
  );

  assert.equal(response.status, 502);
  assert.equal((await response.json()).ok, false);
});

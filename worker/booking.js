const BOOKING_EMAIL = "bookings@kspvision.ca";
const MAX_ATTACHMENT_BYTES = 18 * 1024 * 1024;
const PROJECT_TYPES = new Set([
  "wedding",
  "music-video",
  "brand-commercial",
  "documentary",
  "post-production-vfx",
  "other",
]);

const PROJECT_LABELS = {
  wedding: "Wedding",
  "music-video": "Music video",
  "brand-commercial": "Brand / Commercial",
  documentary: "Documentary",
  "post-production-vfx": "Post-Production & VFX",
  other: "Other",
};

const PROJECT_FIELD_LABELS = {
  wedding: ["Couple's names", "Venue / city"],
  "music-video": ["Artist name", "Song title"],
  "brand-commercial": ["Brand / organization", "Campaign / deliverable"],
  documentary: ["Subject / organization", "Expected scope"],
  "post-production-vfx": ["Project / film", "Post-production needs"],
  other: ["Project / organization", "Additional project detail"],
};

function textValue(form, key, maxLength = 4000) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function cleanHeaderValue(value) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function displayValue(value) {
  return value || "Not provided";
}

function titleCase(value) {
  return value
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function sameSiteReferrer(referrer, landingPage) {
  try {
    return new URL(referrer).hostname === new URL(landingPage).hostname;
  } catch {
    return false;
  }
}

export function classifyLeadSource({ utmSource = "", referrer = "", landingPage = "" }) {
  const source = utmSource.trim().toLowerCase();

  if (source === "instagram" || source === "ig") return "Instagram";
  if (source === "google") return "Google";
  if (source === "direct") return "Direct";
  if (source === "referral" || source === "referrer") return "Referral";
  if (source) return `Other (${titleCase(source)})`;

  if (!referrer) return "Direct";

  try {
    const hostname = new URL(referrer).hostname.toLowerCase();
    if (hostname === "instagram.com" || hostname.endsWith(".instagram.com")) {
      return "Instagram";
    }
    if (hostname === "google.com" || hostname.startsWith("google.") || hostname.includes(".google.")) {
      return "Google";
    }
  } catch {
    return "Unknown";
  }

  return sameSiteReferrer(referrer, landingPage) ? "Direct" : "Referral";
}

export function buildConfirmationEmail(language, name) {
  const firstName = name.trim().split(/\s+/)[0] || (language === "fr" ? "bonjour" : "there");

  if (language === "fr") {
    return {
      subject: "Votre demande a bien été reçue | KSP Vision",
      text: [
        `Bonjour ${firstName},`,
        "",
        "Merci d’avoir contacté KSP Vision. Votre demande a bien été reçue.",
        "",
        "Nous prendrons le temps de regarder les détails de votre projet et nous vous répondrons dans un délai de 1 à 2 jours ouvrables.",
        "",
        "Si vous souhaitez ajouter des informations, références ou documents entre-temps, vous pouvez simplement répondre à ce courriel.",
        "",
        "À bientôt,",
        "KSP Vision",
        "kspvision.ca",
      ].join("\n"),
    };
  }

  return {
    subject: "We received your inquiry | KSP Vision",
    text: [
      `Hi ${firstName},`,
      "",
      "Thanks for contacting KSP Vision. Your inquiry has been received.",
      "",
      "We’ll review the details of your project and get back to you within 1–2 business days.",
      "",
      "If you’d like to add any information, references, or documents in the meantime, you can simply reply to this email.",
      "",
      "Talk soon,",
      "KSP Vision",
      "kspvision.ca",
    ].join("\n"),
  };
}

export function buildInternalEmail(fields, attachmentNames = []) {
  const labels = PROJECT_FIELD_LABELS[fields.projectType] || PROJECT_FIELD_LABELS.other;
  const leadSource = classifyLeadSource(fields);
  const subject = `${PROJECT_LABELS[fields.projectType] || "Project"} inquiry | ${cleanHeaderValue(fields.name)} | KSP Vision`;
  const lines = [
    "New KSP Vision website inquiry",
    "",
    `Project type: ${PROJECT_LABELS[fields.projectType] || fields.projectType}`,
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    `${labels[0]}: ${displayValue(fields.projectOne)}`,
  ];

  if (fields.projectTwo) lines.push(`${labels[1]}: ${fields.projectTwo}`);

  lines.push(
    `Location: ${fields.location}`,
    `Preferred shoot date: ${fields.shootDate}`,
    `Budget: ${fields.budget}`,
    "",
    "Project brief:",
    fields.brief,
    "",
    `Attachments: ${attachmentNames.length ? attachmentNames.join(", ") : "None"}`,
    "",
    "--- Internal lead attribution ---",
    `Lead source: ${leadSource}`,
    `Referrer: ${displayValue(fields.referrer)}`,
    `Landing page: ${displayValue(fields.landingPage)}`,
    `UTM source: ${displayValue(fields.utmSource)}`,
    `UTM medium: ${displayValue(fields.utmMedium)}`,
    `UTM campaign: ${displayValue(fields.utmCampaign)}`,
  );

  return { subject, text: lines.join("\n") };
}

function jsonResponse(body, status = 200) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function fileValue(form, key) {
  const value = form.get(key);
  return value instanceof File && value.size > 0 ? value : null;
}

async function attachmentPayload(file) {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const chunkSize = 0x8000;
  let binary = "";

  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
  }

  return {
    filename: file.name.replace(/[\r\n]/g, " ").slice(0, 180),
    content: btoa(binary),
  };
}

async function sendEmail(apiKey, payload, idempotencyKey, send) {
  const response = await send("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const providerMessage = await response.text();
    console.error("Booking email provider rejected a request", response.status, providerMessage.slice(0, 500));
    throw new Error("email_provider_error");
  }
}

export async function handleBookingRequest(request, env, send = fetch) {
  if (request.method !== "POST") {
    return jsonResponse({ ok: false, error: "method_not_allowed" }, 405);
  }

  const requestUrl = new URL(request.url);
  const origin = request.headers.get("Origin");
  if (origin && origin !== requestUrl.origin) {
    return jsonResponse({ ok: false, error: "invalid_origin" }, 403);
  }

  if (!env.RESEND_API_KEY) {
    return jsonResponse({ ok: false, error: "service_unavailable" }, 503);
  }

  let form;
  try {
    form = await request.formData();
  } catch {
    return jsonResponse({ ok: false, error: "invalid_form" }, 400);
  }

  if (textValue(form, "companyWebsite", 200)) {
    return jsonResponse({ ok: false, error: "invalid_form" }, 400);
  }

  const fields = {
    projectType: textValue(form, "projectType", 80),
    name: textValue(form, "name", 160),
    email: textValue(form, "email", 254).toLowerCase(),
    location: textValue(form, "location", 300),
    shootDate: textValue(form, "shootDate", 40),
    budget: textValue(form, "budget", 100),
    brief: textValue(form, "brief", 12000),
    projectOne: textValue(form, "projectOne", 500),
    projectTwo: textValue(form, "projectTwo", 500),
    language: textValue(form, "language", 5) === "fr" ? "fr" : "en",
    utmSource: textValue(form, "utmSource", 200),
    utmMedium: textValue(form, "utmMedium", 200),
    utmCampaign: textValue(form, "utmCampaign", 300),
    referrer: textValue(form, "referrer", 2000),
    landingPage: textValue(form, "landingPage", 2000),
  };

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email);
  const projectDetailsValid = fields.projectType === "other"
    ? Boolean(fields.projectOne)
    : Boolean(fields.projectOne && fields.projectTwo);

  if (
    !PROJECT_TYPES.has(fields.projectType) ||
    !fields.name ||
    !emailValid ||
    !fields.location ||
    !fields.shootDate ||
    !fields.budget ||
    !fields.brief ||
    !projectDetailsValid
  ) {
    return jsonResponse({ ok: false, error: "invalid_form" }, 400);
  }

  const files = [fileValue(form, "songFile"), fileValue(form, "moodboardFile")].filter(Boolean);
  const totalAttachmentBytes = files.reduce((total, file) => total + file.size, 0);
  if (totalAttachmentBytes > MAX_ATTACHMENT_BYTES) {
    return jsonResponse({ ok: false, error: "attachments_too_large" }, 413);
  }

  const attachments = await Promise.all(files.map(attachmentPayload));
  const internal = buildInternalEmail(fields, attachments.map(({ filename }) => filename));
  const confirmation = buildConfirmationEmail(fields.language, fields.name);
  const submittedId = textValue(form, "submissionId", 100);
  const submissionId = /^[a-zA-Z0-9-]{8,100}$/.test(submittedId)
    ? submittedId
    : crypto.randomUUID();
  const from = `KSP Vision <${BOOKING_EMAIL}>`;

  try {
    await sendEmail(env.RESEND_API_KEY, {
      from,
      to: [BOOKING_EMAIL],
      reply_to: fields.email,
      subject: internal.subject,
      text: internal.text,
      attachments,
    }, `${submissionId}-internal`, send);

    await sendEmail(env.RESEND_API_KEY, {
      from,
      to: [fields.email],
      reply_to: BOOKING_EMAIL,
      subject: confirmation.subject,
      text: confirmation.text,
    }, `${submissionId}-confirmation`, send);
  } catch {
    return jsonResponse({ ok: false, error: "delivery_failed" }, 502);
  }

  return jsonResponse({ ok: true });
}

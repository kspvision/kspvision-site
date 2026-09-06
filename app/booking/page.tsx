import { pageMetadata } from "../page-metadata";

export const metadata = pageMetadata("/booking", "Start a Project | KSP Vision", "Tell KSP Vision about your music video, wedding, brand film or documentary. Share your project, preferred date, budget and creative brief.");

import { SiteFooter, SiteHeader } from "../site-language";
import BookingForm from "./booking-form";
import "./booking.css";
import "./booking-form.css";

export default function Page() {
  return (
    <main className="bookingPage bookingV2">
      <SiteHeader />
      <BookingForm />
      <SiteFooter />
    </main>
  );
}

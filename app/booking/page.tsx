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

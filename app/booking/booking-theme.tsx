"use client";

import { useState, type ReactNode } from "react";
import { useLanguage } from "../site-language";

export function BookingTheme({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [language] = useLanguage();
  const french = language === "fr";

  return (
    <main className="bookingPage bookingV2" data-booking-theme={theme}>
      {children}
      <aside className="bookingThemeToggle" role="group" aria-label={french ? "Thème de la page réservation" : "Booking page theme"}>
        <button type="button" aria-pressed={theme === "light"} onClick={() => setTheme("light")}>{french ? "CLAIR" : "LIGHT"}</button>
        <button type="button" aria-pressed={theme === "dark"} onClick={() => setTheme("dark")}>{french ? "SOMBRE" : "DARK"}</button>
      </aside>
    </main>
  );
}

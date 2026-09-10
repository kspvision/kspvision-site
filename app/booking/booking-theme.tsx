"use client";

import { useState, type ReactNode } from "react";

export function BookingTheme({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <main className="bookingPage bookingV2" data-booking-theme={theme}>
      {children}
      <aside className="bookingThemeToggle" role="group" aria-label="Booking page theme">
        <button type="button" aria-pressed={theme === "light"} onClick={() => setTheme("light")}>LIGHT</button>
        <button type="button" aria-pressed={theme === "dark"} onClick={() => setTheme("dark")}>DARK</button>
      </aside>
    </main>
  );
}

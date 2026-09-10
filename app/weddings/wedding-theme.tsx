"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { useLanguage } from "../site-language";

type Theme = "ivory" | "dark";
const WeddingThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
} | null>(null);

export function WeddingTheme({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("ivory");

  return (
    <WeddingThemeContext.Provider value={{ theme, setTheme }}>
      <main className="detailPage weddingPage" data-wedding-theme={theme}>
        {children}
      </main>
    </WeddingThemeContext.Provider>
  );
}

export function WeddingThemeToggle() {
  const state = useContext(WeddingThemeContext);
  const [language] = useLanguage();
  const french = language === "fr";
  if (!state) return null;

  return (
    <aside className="weddingThemeToggle" role="group" aria-label={french ? "Thème de la page mariages" : "Wedding page theme"}>
      <button type="button" aria-pressed={state.theme === "ivory"}
        onClick={() => state.setTheme("ivory")}>{french ? "CLAIR" : "LIGHT"}</button>
      <button type="button" aria-pressed={state.theme === "dark"}
        onClick={() => state.setTheme("dark")}>{french ? "SOMBRE" : "DARK"}</button>
    </aside>
  );
}

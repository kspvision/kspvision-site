"use client";

import { useEffect, useState } from "react";

type Copy = { en: string; fr: string };

function useLanguage() {
  const [language, setLanguage] = useState<"en" | "fr">("en");
  useEffect(() => {
    const saved = window.localStorage.getItem("ksp-language");
    if (saved === "fr") setLanguage("fr");
    const update = () => setLanguage(window.localStorage.getItem("ksp-language") === "fr" ? "fr" : "en");
    window.addEventListener("ksp-language", update);
    return () => window.removeEventListener("ksp-language", update);
  }, []);
  return [language, setLanguage] as const;
}

export function Localized({ en, fr }: Copy) {
  const [language] = useLanguage();
  return <>{language === "fr" ? fr : en}</>;
}

export function SiteHeader({ active }: { active?: "music" | "weddings" | "brand" }) {
  const [language, setLanguage] = useLanguage();
  const french = language === "fr";
  const toggle = () => {
    const next = french ? "en" : "fr";
    window.localStorage.setItem("ksp-language", next);
    window.dispatchEvent(new Event("ksp-language"));
    setLanguage(next);
  };
  return <header className="detailNav"><a className="brand" href="/" aria-label="KSP Vision home"><span>KSP</span> VISION</a><nav className="mainNav" aria-label="Main navigation"><a className={active === "music" ? "activeNav" : ""} href="/music-videos">{french ? "Clips musicaux" : "Music Videos"}</a><a className={active === "weddings" ? "activeNav" : ""} href="/weddings">{french ? "Mariages" : "Weddings"}</a><a className={active === "brand" ? "activeNav" : ""} href="/brand-documentary">{french ? "Marque / Doc" : "Brand / Doc"}</a><button className="langSwitch" aria-label={french ? "View the site in English" : "Afficher le site en français"} onClick={toggle}>{french ? "EN" : "FR"}</button><a href="/booking" className="navCta">{french ? "Réserver" : "Book"}</a></nav></header>;
}

export function SiteFooter() {
  return <footer><a className="brand" href="/"><span>KSP</span> VISION</a><p><Localized en="Production · Cinematography · Post-production" fr="Production · Cinématographie · Post-production" /></p><p>© 2026 KSP Vision Inc. <Localized en="All rights reserved." fr="Tous droits réservés." /></p></footer>;
}

"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [lang, setLang] = useState<"en" | "fr">("en");
  const l = (en: string, fr: string) => lang === "en" ? en : fr;
  useEffect(() => { if (window.localStorage.getItem("ksp-language") === "fr") setLang("fr"); }, []);
  const changeLanguage = () => { const next = lang === "en" ? "fr" : "en"; window.localStorage.setItem("ksp-language", next); window.dispatchEvent(new Event("ksp-language")); setLang(next); };

  return (
    <main>
      <header className="nav homeNav" aria-label="Main navigation">
        <a className="brand" href="/" aria-label="KSP Vision — Home"><span>KSP</span> VISION</a>
        <nav className="mainNav">
          <a href="/music-videos">{l("Music Videos","Clips musicaux")}</a><a href="/weddings">{l("Weddings","Mariages")}</a><a href="/brand-documentary">{l("Brand / Doc","Marque / Doc")}</a><a className="serviceNav" href="#services">Services</a>
          <button className="langSwitch" aria-label={lang === "en" ? "Afficher le site en français" : "View the site in English"} onClick={changeLanguage}>{lang === "en" ? "FR" : "EN"}</button>
          <a className="navCta" href="/booking">{l("Book","Réserver")}</a>
        </nav>
      </header>

      <section className="hero" id="accueil">
        <div className="heroImage" aria-hidden="true">
          <video autoPlay muted loop playsInline preload="auto" onCanPlay={(event) => event.currentTarget.play().catch(() => {})} onEnded={(event) => { event.currentTarget.currentTime = 0; event.currentTarget.play().catch(() => {}); }}>
              <source
                src="https://github.com/kspvision/kspvision-site/releases/download/hero-reel-2026-08-15/KSPVision.ca.REEL.Sequuence.mp4"
                type="video/mp4"
              />
          </video>
        </div>
        <div className="heroShade" />
        <div className="heroContent">
          <p className="eyebrow"><span /> {l("Production · Cinematography · Post-production","Production · Cinématographie · Post-production")}</p>
          <h1>{l("Your vision.","Votre vision.")}<br /><em>{l("Ready for the screen.","Prête pour l’écran.")}</em></h1>
          <p className="heroCopy">{l("Made with a clear eye and a feeling for the frame.","Des films portés par un regard clair et le sens du cadre.")}</p>
          <div className="heroActions"><a className="button gold" href="#types">{l("Choose a project type","Choisir un type de projet")}</a><a className="textLink" href="/booking">{l("Book a project","Réserver un projet")} <b>↗</b></a></div>
        </div>
        <div className="scrollHint">{l("Scroll","Défiler")} <span>↓</span></div>
      </section>

      <section className="pathways section" id="types">
        <div className="pathIntro"><p className="kicker">{l("Choose your project","Choisissez votre projet")}</p><h2>{l("What are we","Que créons-nous")}<br /><i>{l("creating?","ensemble?")}</i></h2></div>
        <div className="pathGrid">
          <a href="/music-videos"><span>{l("For artists","Pour artistes")}</span><h3>{l("Music videos","Clips musicaux")}</h3><p>{l("Concept, direction, cinematography, editing and visual effects.","Concept, réalisation, cinématographie, montage et effets visuels.")}</p><b>{l("Open page","Voir la page")} ↗</b></a>
          <a href="/weddings"><span>{l("For couples","Pour couples")}</span><h3>{l("Wedding films","Films de mariage")}</h3><p>{l("Emotional, cinematic films built around your day and your story.","Des films émotionnels et cinématographiques, centrés sur votre histoire.")}</p><b>{l("Open page","Voir la page")} ↗</b></a>
          <a href="/brand-documentary"><span>{l("For organizations","Pour organisations")}</span><h3>{l("Brand & documentary","Marque et documentaire")}</h3><p>{l("Campaigns, branded stories, portraits and documentary content.","Campagnes, récits de marque, portraits et contenu documentaire.")}</p><b>{l("Open page","Voir la page")} ↗</b></a>
        </div>
      </section>

      <section className="section services" id="services">
        <div className="sectionHead"><div><p className="kicker">{l("What we do","Ce que nous faisons")}</p><h2>{l("From idea","De l’idée")}<br /><i>{l("to final frame.","à l’image finale.")}</i></h2></div><p>{l("Choose one specialty or entrust KSP Vision with the complete production.","Choisissez une spécialité ou confiez la production complète à KSP Vision.")}</p></div>
        <div className="serviceList">
          {[
            ["01", "Production", l("Concept development, planning, crew direction and production management.","Développement du concept, préparation, direction d’équipe et gestion de production.")],
            ["02", l("Cinematography","Cinématographie"), l("Camera, lighting and visual direction designed around the story.","Caméra, lumière et direction visuelle pensées autour de votre histoire.")],
            ["03", "Post-production", l("Editing, colour, sound and visual effects through final delivery.","Montage, couleur, son et effets visuels jusqu’à la livraison finale.")],
            ["04", l("Creative direction","Direction créative"), l("A clear visual identity aligned with your audience and objectives.","Une identité visuelle claire, alignée sur votre public et vos objectifs.")],
          ].map(([number, title, copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p><b>↗</b></article>)}
        </div>
        <a className="serviceCta" href="/booking">{l("Discuss your project","Parler de votre projet")} <span>↗</span></a>
      </section>

      <section className="homeBook"><p>10+ {l("years of experience","ans d’expérience")} · 300+ {l("projects delivered","projets réalisés")}</p><a href="/booking">{l("Book a project","Réserver un projet")} ↗</a></section>

      <footer><a className="brand" href="#accueil"><span>KSP</span> VISION</a><p>{l("Production · Cinematography · Post-production","Production · Cinématographie · Post-production")}</p><p>© 2026 KSP Vision Inc. {l("All rights reserved.","Tous droits réservés.")}</p></footer>
    
<style>{`
/* Cinematic navigation integrated with homepage hero */
.homeNav{
  position:absolute !important;
  top:0;
  left:0;
  right:0;
  z-index:30;
  background:linear-gradient(
    180deg,
    rgba(0,0,0,.78) 0%,
    rgba(0,0,0,.38) 62%,
    rgba(0,0,0,0) 100%
  ) !important;
  border-bottom:0 !important;
}

.hero{
  padding-top:0 !important;
}

.hero .heroImage{
  min-height:100vh;
}

.heroContent{
  padding-top:8rem;
}

@media(max-width:800px){
  .heroContent{
    padding-top:7rem;
  }
}
`}</style>
</main>
  );
}

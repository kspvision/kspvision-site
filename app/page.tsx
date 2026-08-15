"use client";

import { useState } from "react";

export default function Home() {
  const [lang, setLang] = useState<"en" | "fr">("en");
  const l = (en: string, fr: string) => lang === "en" ? en : fr;

  return (
    <main>
      <aside className="previewNotice homeNotice">Preview edition — selected projects are being updated</aside>
      <header className="nav homeNav" aria-label="Main navigation">
        <a className="brand" href="/" aria-label="KSP Vision — Home"><span>KSP</span> VISION</a>
        <nav className="mainNav">
          <a href="/music-videos">{l("Music Videos","Clips musicaux")}</a><a href="/weddings">{l("Weddings","Mariages")}</a><a href="/brand-documentary">{l("Brand / Doc","Marque / Doc")}</a><a className="serviceNav" href="#services">Services</a>
          <button className="langSwitch" aria-label={lang === "en" ? "Afficher le site en français" : "View the site in English"} onClick={() => setLang(lang === "en" ? "fr" : "en")}>{lang === "en" ? "FR" : "EN"}</button>
          <a className="navCta" href="/booking">{l("Book","Réserver")}</a>
        </nav>
      </header>

      <section className="hero" id="accueil">
        <div className="heroImage" aria-hidden="true">
          <video autoPlay muted loop playsInline preload="auto" poster="/portfolio/hero.jpg" onCanPlay={(event) => event.currentTarget.play().catch(() => {})} onEnded={(event) => { event.currentTarget.currentTime = 0; event.currentTarget.play().catch(() => {}); }}>
              <source
                src="https://github.com/kspvision/kspvision-site/releases/download/hero-reel-2026-08-15/ksp-hero-reel.mp4"
                type="video/mp4"
              />
          </video>
        </div>
        <div className="heroShade" />
        <div className="heroContent">
          <p className="eyebrow"><span /> {l("Production · Cinematography · Post-production","Production · Cinématographie · Post-production")}</p>
          <h1>{l("Your vision.","Votre vision.")}<br /><em>{l("Ready for the screen.","Prête pour l’écran.")}</em></h1>
          <p className="heroCopy">{l("KSP Vision turns ideas into finished films through production, cinematography and post-production — one creative partner from concept to delivery.","KSP Vision transforme vos idées en films aboutis grâce à la production, la cinématographie et la post-production — un seul partenaire créatif, du concept à la livraison.")}</p>
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

      <footer><a className="brand" href="#accueil"><span>KSP</span> VISION</a><p>{l("Production · Cinematography · Post-production","Production · Cinématographie · Post-production")}</p><p>Montréal, Québec · © 2026</p></footer>
    </main>
  );
}

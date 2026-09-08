"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "./site-language";
import CollaborationRail from "./brand-documentary/collaboration-rail";
import "./home-sections.css";

import BranchCardRandomizer from "./branch-card-randomizer";
function BranchVideo({ src, poster }: { src: string; poster?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePlayback = () => {
      const video = videoRef.current;
      if (!video) return;

      if (reducedMotion.matches) {
        video.pause();
        video.currentTime = 0;
      } else {
        video.play().catch(() => {});
      }
    };

    updatePlayback();
    reducedMotion.addEventListener("change", updatePlayback);
    return () => reducedMotion.removeEventListener("change", updatePlayback);
  }, []);

  return (
    <video ref={videoRef} autoPlay muted loop playsInline preload="metadata" poster={poster}>
      <source src={src} type="video/mp4" />
    </video>
  );
}

export default function Home() {
  const [lang, setLang] = useLanguage();
  function toggleLanguage() {
    const next = lang === "en" ? "fr" : "en";
    window.localStorage.setItem("ksp-language", next);
    document.documentElement.lang = next;
    window.dispatchEvent(new Event("ksp-language"));
    setLang(next);
  }
  const l = (en: string, fr: string) => lang === "en" ? en : fr;

  return (
    <main>
      <header className="nav homeNav" aria-label="Main navigation">
        <a className="brand" href="/" aria-label="KSP Vision | Home"><span>KSP</span> VISION</a>
        <nav className="mainNav">
          <a href="/kspfilms">KSP FILMS</a><a href="/weddings">WEDDINGS</a><a href="/brand-documentary">{l("Brand / Doc","Marque / Doc")}</a><a href="/about">{l("About","À propos")}</a>
          <button className="langSwitch" aria-label={lang === "en" ? "Afficher le site en français" : "View the site in English"} onClick={toggleLanguage}>{lang === "en" ? "FR" : "EN"}</button>
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

      <section className="homeStudioIntro" id="types">
        <p className="homeStudioIndex">01 / 06</p>
        <div className="homeStudioIntroGrid">
          <div>
            <p className="kicker">{l("Independent production company", "Maison de production indépendante")}</p>
            <h2>{l("One vision.", "Une vision.")}<br /><em>{l("Built for every frame.", "Pensée pour chaque image.")}</em></h2>
          </div>
          <div className="homeStudioStatement">
            <p>{l(
              "KSP Vision is a Montréal production company bringing creative development, production and post-production together under one direction.",
              "KSP Vision est une maison de production montréalaise qui réunit développement créatif, production et postproduction sous une même direction."
            )}</p>
            <span>{l("Music / Weddings / Brand & Documentary", "Musique / Mariages / Marque et documentaire")}</span>
          </div>
        </div>
      </section>

      <section className="homeBranches" aria-labelledby="homeBranchesTitle">
        <div className="homeSectionHeading">
          <div>
            <p className="homeStudioIndex">02 / 06</p>
            <p className="kicker">{l("Three branches", "Trois branches")}</p>
            <h2 id="homeBranchesTitle">{l("One company.", "Une entreprise.")}<br /><em>{l("Three ways in.", "Trois portes d’entrée.")}</em></h2>
          </div>
          <p>{l(
            "A focused home for each kind of story, connected by the same cinematic standard.",
            "Un espace distinct pour chaque type d’histoire, uni par la même exigence cinématographique."
          )}</p>
        </div>

        <div className="homeBranchGrid">
          <a className="homeBranch homeBranchFilms" href="/kspfilms">
            <div className="homeBranchMedia" aria-hidden="true">
              <BranchVideo src="/music-hero-mobile.mp4" poster="/music-1603.jpg" />
            </div>
            <span className="homeBranchNumber">01</span>
            <div>
              <p>{l("Music Videos", "Vidéoclips")}</p>
              <h3>KSP FILMS</h3>
            </div>
            <b aria-hidden="true">↗</b>
          </a>
          <a className="homeBranch homeBranchWeddings" href="/weddings">
            <div className="homeBranchMedia" aria-hidden="true">
              <BranchVideo src="/wedding-reel-web.mp4" poster="/weddings/wedding-garden-portrait.jpg" />
            </div>
            <span className="homeBranchNumber">02</span>
            <div>
              <p>{l("Wedding films & photography", "Films et photographie de mariage")}</p>
              <h3>KSP WEDDINGS</h3>
            </div>
            <b aria-hidden="true">↗</b>
          </a>
          <a className="homeBranch homeBranchBrand" href="/brand-documentary">
            <div className="homeBranchMedia" aria-hidden="true">
              <BranchVideo src="/corneille-web.mp4" />
            </div>
            <span className="homeBranchNumber">03</span>
            <div>
              <p>{l("Commercial, Branded & Documentary Production", "Production commerciale, de marque et documentaire")}</p>
              <h3>{l("BRAND & DOCUMENTARY", "MARQUE ET DOCUMENTAIRE")}</h3>
            </div>
            <b aria-hidden="true">↗</b>
          </a>
        </div>
      </section>

      <section className="homeCapabilities" aria-labelledby="homeCapabilitiesTitle">
        <div className="homeCapabilitiesLead">
          <p className="homeStudioIndex">03 / 06</p>
          <p className="kicker">{l("What we do", "Ce que nous faisons")}</p>
          <h2 id="homeCapabilitiesTitle">{l("From first idea", "De la première idée")}<br /><em>{l("to final delivery.", "à la livraison finale.")}</em></h2>
          <p>{l(
            "A complete production and post-production practice, scaled around what the film needs.",
            "Une pratique complète de production et de postproduction, adaptée aux besoins réels du film."
          )}</p>
        </div>
        <div className="homeCapabilityList">
          {[
            [l("Creative Development", "Développement créatif"), l("Direction", "Réalisation")],
            [l("Production", "Production"), l("Cinematography", "Cinématographie")],
            [l("Editing", "Montage"), l("Colour / Finishing", "Couleur / Finition")],
            [l("Sound", "Son"), l("Visual Effects", "Effets visuels")],
          ].map((pair, index) => (
            <div key={index}>
              <span>0{index + 1}</span>
              <p>{pair[0]}</p>
              <p>{pair[1]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="homeFinishing" aria-labelledby="homeFinishingTitle">
        <div className="homeFinishingMark" aria-hidden="true"><span>V</span><span>F</span><span>X</span></div>
        <div className="homeFinishingCopy">
          <p className="homeStudioIndex">04 / 06</p>
          <p className="kicker">{l("Post-production capability", "Capacité de postproduction")}</p>
          <h2 id="homeFinishingTitle">{l("Visual Effects", "Effets visuels")}<br /><em>{l("& Finishing", "et finition")}</em></h2>
          <p>{l(
            "Compositing, cleanup, image manipulation, environment enhancement and creative visual effects built around the needs of the film.",
            "Compositing, nettoyage, manipulation d’image, bonification d’environnements et effets visuels créatifs conçus selon les besoins du film."
          )}</p>
          <a href="/booking?project=post-production-vfx">{l("Discuss production or post", "Parler de production ou de postproduction")} <span>↗</span></a>
        </div>
      </section>

      <section className="homeProof" aria-labelledby="homeProofTitle">
        <div className="homeSectionHeading">
          <div>
            <p className="homeStudioIndex">05 / 06</p>
            <p className="kicker">{l("Experience / Selected collaborations", "Expérience / Collaborations choisies")}</p>
            <h2 id="homeProofTitle">{l("Built through", "Bâti par")}<br /><em>{l("the work.", "le travail.")}</em></h2>
          </div>
          <p>{l(
            "More than a decade of production experience across hundreds of projects, artists, organizations and creative partners.",
            "Plus d’une décennie d’expérience en production à travers des centaines de projets, artistes, organisations et partenaires créatifs."
          )}</p>
        </div>

        <div className="homeProofStats">
          <div><strong>10<span>+</span></strong><p>{l("Years of experience", "Années d’expérience")}</p></div>
          <div><strong>300<span>+</span></strong><p>{l("Projects", "Projets")}</p></div>
          <div className="homeFounderProof">
            <p>{l("Founder-led.", "Dirigé par son fondateur.")}<br /><em>{l("Built to scale.", "Pensé pour évoluer.")}</em></p>
            <span>{l("Kevin Shayne leads the creative direction, with each team shaped around the project.", "Kevin Shayne dirige la vision créative, avec une équipe adaptée à chaque projet.")}</span>
            <a href="/about">{l("About KSP Vision", "À propos de KSP Vision")} ↗</a>
          </div>
        </div>

        <div className="homeCollaborations">
          <p>{l("Selected collaborations", "Collaborations choisies")}</p>
          <CollaborationRail />
        </div>
      </section>

      <section className="homeFinalCta" aria-labelledby="homeFinalCtaTitle">
        <p className="homeStudioIndex">06 / 06</p>
        <p className="kicker">{l("Start a project", "Démarrer un projet")}</p>
        <h2 id="homeFinalCtaTitle">{l("Bring the next story", "Portons la prochaine histoire")}<br /><em>{l("into focus.", "à l’écran.")}</em></h2>
        <p>{l(
          "Music video, wedding, brand film, documentary, production or post. Tell us what you are building.",
          "Vidéoclip, mariage, film de marque, documentaire, production ou postproduction. Parlez-nous de votre projet."
        )}</p>
        <a href="/booking">{l("Book a project", "Réserver un projet")} <span>↗</span></a>
      </section>

      <footer><a className="brand" href="#accueil"><span>KSP</span> VISION</a><p>{l("Production · Cinematography · Post-production","Production · Cinématographie · Post-production")}</p><p>Montréal, Québec · © 2026</p></footer>

      <BranchCardRandomizer />
</main>
  );
}

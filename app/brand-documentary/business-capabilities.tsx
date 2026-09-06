"use client";

import { useEffect, useState } from "react";
import styles from "./business-capabilities.module.css";

const copy = {
  en: {
    eyebrow: "WHAT WE BUILD",
    title: "ONE PRODUCTION. BUILT TO TRAVEL.",
    summary:
      "From the main film to campaign cutdowns and social assets, KSP Vision can carry a project from production through final delivery.",
    deliverables: "COMMON DELIVERABLES",
    items: [
      {
        number: "01",
        title: "COMPANY & FOUNDER STORIES",
        text: "Films that introduce the people, purpose and story behind a business."
      },
      {
        number: "02",
        title: "CAMPAIGNS & PRODUCT FILMS",
        text: "Commercial visuals for launches, products, services and campaigns."
      },
      {
        number: "03",
        title: "TESTIMONIAL & RECRUITMENT",
        text: "Interview-led stories built for trust, culture and recruitment."
      },
      {
        number: "04",
        title: "DOCUMENTARY & INTERVIEWS",
        text: "Profiles and documentary films shaped around real people and stories."
      },
      {
        number: "05",
        title: "SOCIAL & DIGITAL CONTENT",
        text: "Short edits and vertical assets built from the same production."
      },
      {
        number: "06",
        title: "PLATFORM-READY DELIVERY",
        text: "Finished assets prepared for web, social, YouTube and campaigns."
      }
    ],
    delivery: [
      "HERO FILM",
      "SHORT CUTDOWNS",
      "VERTICAL SOCIAL",
      "WEB & YOUTUBE",
      "SUBTITLED VERSIONS"
    ]
  },

  fr: {
    eyebrow: "CE QUE NOUS CRÉONS",
    title: "UNE PRODUCTION. PLUSIEURS FORMATS.",
    summary:
      "Du film principal aux déclinaisons de campagne et aux contenus sociaux, KSP Vision accompagne chaque projet de la production jusqu'à la livraison finale.",
    deliverables: "LIVRABLES COURANTS",
    items: [
      {
        number: "01",
        title: "HISTOIRES D'ENTREPRISE & DE FONDATEUR",
        text: "Des films qui présentent les personnes, la vision et l'histoire derrière une entreprise."
      },
      {
        number: "02",
        title: "CAMPAGNES & FILMS DE PRODUIT",
        text: "Des visuels commerciaux pour lancements, produits, services et campagnes."
      },
      {
        number: "03",
        title: "TÉMOIGNAGES & RECRUTEMENT",
        text: "Des récits fondés sur l'entrevue pour renforcer la confiance, la culture et le recrutement."
      },
      {
        number: "04",
        title: "DOCUMENTAIRE & ENTREVUES",
        text: "Des portraits et films documentaires construits autour de personnes et d'histoires réelles."
      },
      {
        number: "05",
        title: "CONTENU SOCIAL & NUMÉRIQUE",
        text: "Des formats courts et verticaux développés à partir de la même production."
      },
      {
        number: "06",
        title: "LIVRAISON MULTIPLATEFORME",
        text: "Des livrables préparés pour le web, les réseaux sociaux, YouTube et les campagnes."
      }
    ],
    delivery: [
      "FILM PRINCIPAL",
      "FORMATS COURTS",
      "CONTENU VERTICAL",
      "WEB & YOUTUBE",
      "VERSIONS SOUS-TITRÉES"
    ]
  }
};

function pageIsFrench() {
  if (typeof document === "undefined") return false;

  const lang = document.documentElement.lang?.toLowerCase() || "";
  if (lang.startsWith("fr")) return true;

  const body = document.body?.innerText || "";

  return (
    body.includes("DES HISTOIRES QUI COMPTENT") ||
    body.includes("LANCER UN PROJET") ||
    body.includes("TRAVAUX SÉLECTIONNÉS") ||
    body.includes("HISTOIRES DE MARQUE")
  );
}

export default function BusinessCapabilities() {
  const [language, setLanguage] = useState<"en" | "fr">("en");

  useEffect(() => {
    const sync = () => {
      setLanguage(pageIsFrench() ? "fr" : "en");
    };

    sync();

    const observer = new MutationObserver(sync);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"]
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });

    return () => observer.disconnect();
  }, []);

  const t = copy[language];

  return (
    <section className={styles.section}>
      <div className={styles.intro}>
        <div>
          <div className={styles.eyebrow}>{t.eyebrow}</div>
          <h2>{t.title}</h2>
        </div>

        <p className={styles.summary}>{t.summary}</p>
      </div>

      <div className={styles.grid}>
        {t.items.map((item) => (
          <article className={styles.card} key={item.number}>
            <span className={styles.number}>{item.number}</span>

            <div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.delivery}>
        <span className={styles.deliveryLabel}>{t.deliverables}</span>

        <div className={styles.deliveryItems}>
          {t.delivery.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

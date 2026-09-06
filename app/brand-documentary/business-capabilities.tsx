"use client";

import { useLanguage } from "../site-language";
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
        text: "Films that introduce the people, purpose and story behind a business.",
        details:
          "Typical scope: founder interviews, company profiles, leadership portraits and origin stories."
      },
      {
        number: "02",
        title: "CAMPAIGNS & PRODUCT FILMS",
        text: "Commercial visuals for launches, products, services and campaigns.",
        details:
          "Typical scope: campaign concepts, product visuals, launch films, hero edits and cutdowns."
      },
      {
        number: "03",
        title: "TESTIMONIAL & RECRUITMENT",
        text: "Interview-led stories built for trust, culture and recruitment.",
        details:
          "Typical scope: client testimonials, employee stories, culture pieces and recruitment films."
      },
      {
        number: "04",
        title: "DOCUMENTARY & INTERVIEWS",
        text: "Profiles and documentary films shaped around real people and stories.",
        details:
          "Typical scope: interviews, profiles, observational footage and human-led documentary storytelling."
      },
      {
        number: "05",
        title: "SOCIAL & DIGITAL CONTENT",
        text: "Short edits and vertical assets built from the same production.",
        details:
          "Typical scope: vertical edits, social cutdowns, teasers and platform-specific versions."
      },
      {
        number: "06",
        title: "PLATFORM-READY DELIVERY",
        text: "Finished assets prepared for web, social, YouTube and campaigns.",
        details:
          "Typical scope: web, YouTube, social, subtitled exports and campaign-ready masters."
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
        text: "Des films qui présentent les personnes, la vision et l'histoire derrière une entreprise.",
        details:
          "Portée typique : entrevues de fondateur, profils d'entreprise, portraits de dirigeants et histoire de marque."
      },
      {
        number: "02",
        title: "CAMPAGNES & FILMS DE PRODUIT",
        text: "Des visuels commerciaux pour lancements, produits, services et campagnes.",
        details:
          "Portée typique : concepts de campagne, visuels de produit, films de lancement, montage principal et déclinaisons."
      },
      {
        number: "03",
        title: "TÉMOIGNAGES & RECRUTEMENT",
        text: "Des récits fondés sur l'entrevue pour renforcer la confiance, la culture et le recrutement.",
        details:
          "Portée typique : témoignages clients, récits d'employés, culture d'entreprise et recrutement."
      },
      {
        number: "04",
        title: "DOCUMENTAIRE & ENTREVUES",
        text: "Des portraits et films documentaires construits autour de personnes et d'histoires réelles.",
        details:
          "Portée typique : entrevues, portraits, images d'observation et narration documentaire centrée sur l'humain."
      },
      {
        number: "05",
        title: "CONTENU SOCIAL & NUMÉRIQUE",
        text: "Des formats courts et verticaux développés à partir de la même production.",
        details:
          "Portée typique : montages verticaux, formats courts, teasers et versions adaptées aux plateformes."
      },
      {
        number: "06",
        title: "LIVRAISON MULTIPLATEFORME",
        text: "Des livrables préparés pour le web, les réseaux sociaux, YouTube et les campagnes.",
        details:
          "Portée typique : web, YouTube, réseaux sociaux, versions sous-titrées et masters de campagne."
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

export default function BusinessCapabilities() {
  const [language] = useLanguage();
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

            <div className={styles.cardCopy}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>

            <div className={styles.hoverDetails}>
              {item.details}
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

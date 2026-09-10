"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { Localized } from "../site-language";

type ProjectType =
  | ""
  | "wedding"
  | "music-video"
  | "brand-commercial"
  | "documentary"
  | "post-production-vfx"
  | "other";

type StepNumber = 1 | 2 | 3 | 4;

const budgetOptions = [
  {
    value: "under-1k",
    label: "UNDER $1K",
    labelFr: "MOINS DE 1 000 $",
    position: { en: "Lean / focused production", fr: "Production légère et ciblée" },
    details: [
      { label: { en: "Typical setup", fr: "Configuration typique" }, value: { en: "Often a solo filmmaker using the KSP in-house kit at an existing or client location, with natural or compact lighting.", fr: "Souvent un cinéaste solo avec l’équipement interne KSP, dans un lieu existant ou chez le client, avec un éclairage naturel ou compact." } },
      { label: { en: "Crew", fr: "Équipe" }, value: { en: "Usually a lean crew; no large crew or major rental package unless quoted separately.", fr: "Généralement une équipe légère; aucune grande équipe ni location majeure, sauf devis séparé." } },
      { label: { en: "Production", fr: "Production" }, value: { en: "Suited for a short, focused shoot with limited production complexity and no major talent or production-design costs.", fr: "Adaptée à un tournage court et ciblé, avec une complexité limitée et sans coûts majeurs de talent ou de direction artistique." } },
      { label: { en: "Deliverables", fr: "Livrables" }, value: { en: "Typically one focused main deliverable or a small social-first piece, with basic colour and sound finishing.", fr: "Généralement un livrable principal ciblé ou une courte pièce pensée pour les réseaux sociaux, avec finition couleur et sonore de base." } },
      { label: { en: "Revisions", fr: "Révisions" }, value: { en: "Typically one revision round.", fr: "Généralement une ronde de révisions." } },
      { label: { en: "Social formats", fr: "Formats sociaux" }, value: { en: "A 16:9 master for YouTube, websites or presentations may be possible. A 9:16 vertical version for Reels, TikTok, Stories or Shorts depends on scope.", fr: "Un master 16:9 pour YouTube, un site ou une présentation peut être possible. Une version verticale 9:16 pour Reels, TikTok, Stories ou Shorts dépend de la portée." } },
      { label: { en: "Usually not included", fr: "Habituellement non inclus" }, value: { en: "Large crews, major rentals, extensive production design, paid talent or a large set of format exports.", fr: "Grandes équipes, locations majeures, direction artistique élaborée, talents rémunérés ou grand ensemble d’exports." } },
    ],
  },
  {
    value: "1k-2.5k",
    label: "$1K–$2.5K",
    labelFr: "1 000 $ – 2 500 $",
    position: { en: "Small polished production", fr: "Petite production soignée" },
    details: [
      { label: { en: "Typical setup", fr: "Configuration typique" }, value: { en: "A more developed shoot with stronger lighting and audio, with rental possibilities depending on the concept.", fr: "Un tournage plus développé avec un éclairage et un son renforcés, et des possibilités de location selon le concept." } },
      { label: { en: "Crew", fr: "Équipe" }, value: { en: "A small crew may be added where the production needs it.", fr: "Une petite équipe peut être ajoutée lorsque la production le demande." } },
      { label: { en: "Production", fr: "Production" }, value: { en: "Suited for a polished brand, artist or social production with more room for coverage and craft.", fr: "Adaptée à une production de marque, d’artiste ou sociale soignée, avec plus de latitude pour la couverture et la finition." } },
      { label: { en: "Deliverables", fr: "Livrables" }, value: { en: "Typically a main or hero edit, with a possible vertical or social adaptation and potentially more than one deliverable depending on scope.", fr: "Généralement un montage principal, avec une possible adaptation verticale ou sociale et parfois plus d’un livrable selon la portée." } },
      { label: { en: "Revisions", fr: "Révisions" }, value: { en: "Typically one to two revision rounds.", fr: "Généralement une à deux rondes de révisions." } },
      { label: { en: "Social formats", fr: "Formats sociaux" }, value: { en: "16:9 supports YouTube, websites, Vimeo and presentations. A 9:16 cut may suit Reels, TikTok, Stories and Shorts when planned into the scope.", fr: "Le 16:9 convient à YouTube, aux sites, à Vimeo et aux présentations. Une version 9:16 peut convenir à Reels, TikTok, Stories et Shorts lorsqu’elle est prévue." } },
      { label: { en: "Usually not included", fr: "Habituellement non inclus" }, value: { en: "Large crews, extensive sets, major talent costs or a full campaign asset suite unless separately scoped.", fr: "Grandes équipes, décors élaborés, coûts majeurs de talent ou ensemble complet de campagne, sauf portée séparée." } },
    ],
  },
  {
    value: "2.5k-5k",
    label: "$2.5K–$5K",
    labelFr: "2 500 $ – 5 000 $",
    position: { en: "Campaign-level small production", fr: "Petite production de niveau campagne" },
    details: [
      { label: { en: "Typical setup", fr: "Configuration typique" }, value: { en: "Creative development, advanced lighting and studio or location rental where the concept calls for it.", fr: "Développement créatif, éclairage avancé et location de studio ou de lieu lorsque le concept le demande." } },
      { label: { en: "Crew", fr: "Équipe" }, value: { en: "Crew is shaped around the concept; talent and product work may be included depending on scope.", fr: "L’équipe est adaptée au concept; le talent et le travail produit peuvent être inclus selon la portée." } },
      { label: { en: "Production", fr: "Production" }, value: { en: "Suited for a small campaign with stronger production design and more comprehensive post-production.", fr: "Adaptée à une petite campagne avec une direction artistique plus poussée et une postproduction plus complète." } },
      { label: { en: "Deliverables", fr: "Livrables" }, value: { en: "Often a hero or master film, several social cutdowns and multiple campaign assets depending on scope.", fr: "Souvent un film principal, plusieurs formats courts sociaux et divers éléments de campagne selon la portée." } },
      { label: { en: "Revisions", fr: "Révisions" }, value: { en: "Multiple review stages may be included according to the production plan.", fr: "Plusieurs étapes de révision peuvent être incluses selon le plan de production." } },
      { label: { en: "Social formats", fr: "Formats sociaux" }, value: { en: "May include a 16:9 master, 9:16 vertical versions, 4:5 Instagram or Facebook feed edits, and 1:1 square versions for social or LinkedIn.", fr: "Peut inclure un master 16:9, des versions verticales 9:16, des montages 4:5 pour les fils Instagram ou Facebook et des formats carrés 1:1 pour les réseaux ou LinkedIn." } },
      { label: { en: "Usually not included", fr: "Habituellement non inclus" }, value: { en: "Large-scale builds, extensive talent usage or highly specialized equipment unless specifically quoted.", fr: "Constructions à grande échelle, droits de talent étendus ou équipement hautement spécialisé, sauf devis précis." } },
    ],
  },
  {
    value: "5k-plus",
    label: "$5K+",
    labelFr: "5 000 $ ET PLUS",
    position: { en: "Full / custom production", fr: "Production complète et sur mesure" },
    details: [
      { label: { en: "Typical setup", fr: "Configuration typique" }, value: { en: "Concept development, pre-production, locations or studio, production design and specialty equipment as needed.", fr: "Développement du concept, préproduction, lieux ou studio, direction artistique et équipement spécialisé au besoin." } },
      { label: { en: "Crew", fr: "Équipe" }, value: { en: "A tailored crew with talent, advanced lighting and audio, and multiple shoot components where appropriate.", fr: "Une équipe sur mesure avec talent, éclairage et son avancés, et plusieurs composantes de tournage lorsque pertinent." } },
      { label: { en: "Production", fr: "Production" }, value: { en: "Suited for complete campaigns and productions requiring a custom approach from idea through final delivery.", fr: "Adaptée aux campagnes complètes et aux productions nécessitant une approche sur mesure, de l’idée à la livraison." } },
      { label: { en: "Deliverables", fr: "Livrables" }, value: { en: "May include a hero film, multiple campaign pieces, cutdowns, advanced post or VFX and a larger deliverable ecosystem.", fr: "Peut inclure un film principal, plusieurs pièces de campagne, des formats courts, une postproduction ou des VFX avancés et un ensemble élargi de livrables." } },
      { label: { en: "Revisions", fr: "Révisions" }, value: { en: "Review stages are tailored to the approved production and post-production scope.", fr: "Les étapes de révision sont adaptées à la portée approuvée de production et de postproduction." } },
      { label: { en: "Social formats", fr: "Formats sociaux" }, value: { en: "A delivery plan may combine 16:9 for YouTube, web and presentations; 9:16 for Reels, TikTok, Stories, Shorts and Snapchat; 4:5 for Instagram and Facebook feeds; and 1:1 for social or LinkedIn.", fr: "Le plan de livraison peut réunir le 16:9 pour YouTube, le web et les présentations; le 9:16 pour Reels, TikTok, Stories, Shorts et Snapchat; le 4:5 pour les fils Instagram et Facebook; et le 1:1 pour les réseaux ou LinkedIn." } },
      { label: { en: "Usually not included", fr: "Habituellement non inclus" }, value: { en: "Every production is custom; usage, travel, talent, locations and specialty needs are confirmed in the proposal.", fr: "Chaque production est sur mesure; les droits, déplacements, talents, lieux et besoins spécialisés sont confirmés dans la proposition." } },
    ],
  },
  {
    value: "not-sure",
    label: "NOT SURE YET",
    labelFr: "À DÉTERMINER",
    position: { en: "We’ll help shape the right level", fr: "Nous vous aiderons à choisir le bon niveau" },
    details: [
      { label: { en: "What to share", fr: "Quoi partager" }, value: { en: "Describe the project, goal, timeline and intended platforms. KSP will recommend a production level suited to what you are building.", fr: "Décrivez le projet, l’objectif, l’échéancier et les plateformes visées. KSP recommandera un niveau de production adapté à votre projet." } },
      { label: { en: "Social formats", fr: "Formats sociaux" }, value: { en: "Tell us whether the work is for YouTube or web (16:9), Reels, TikTok, Stories or Shorts (9:16), social feeds (4:5), or square placements (1:1). We can recommend what is useful.", fr: "Dites-nous si le contenu vise YouTube ou le web (16:9), Reels, TikTok, Stories ou Shorts (9:16), les fils sociaux (4:5) ou les placements carrés (1:1). Nous pourrons recommander les formats utiles." } },
    ],
  },
] as const;

function formatCalendarDate(value: string) {
  if (!value) return "";

  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) return value;

  const date = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default function BookingForm() {

  function openBookingEmail() {
    const BOOKING_EMAIL = "bookings@kspvision.ca";
    const root = document.querySelector(".bookingV2") ?? document;

    const clean = (value: string | null | undefined) =>
      (value ?? "").replace(/\s+/g, " ").trim();

    const titleCase = (value: string) =>
      value
        .replace(/[-_]+/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

    const humanDate = (value: string) => {
      if (!value) return "";

      const parts = value.split("-").map(Number);

      if (parts.length !== 3 || parts.some(Number.isNaN)) {
        return value;
      }

      const [year, month, day] = parts;

      return new Intl.DateTimeFormat("en-CA", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(year, month - 1, day));
    };

    const getFriendlyLabel = (
      field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    ) => {
      let label = "";

      if (field.id) {
        label =
          clean(
            root.querySelector(`label[for="${field.id}"]`)?.textContent
          ) || "";
      }

      if (!label) {
        label =
          clean(field.getAttribute("aria-label")) ||
          clean(field.getAttribute("name")) ||
          clean(field.getAttribute("placeholder")) ||
          "Field";
      }

      const value =
        field instanceof HTMLInputElement && field.type === "date"
          ? humanDate(field.value)
          : clean(field.value);

      if (value) {
        label = clean(label.replace(value, ""));
      }

      label = clean(
        label
          .replace(/\bOPTIONAL\b/gi, "")
          .replace(/\bFACULTATIF\b/gi, "")
          .replace(/[·•]+$/g, "")
      );

      return label || "Field";
    };

    const lines: string[] = [];

    let projectType = "";
    let clientName = "";
    let budget = "";

    root
      .querySelectorAll<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >("input, textarea, select")
      .forEach((field) => {
        if (field instanceof HTMLInputElement) {
          const type = field.type.toLowerCase();

          if (
            type === "hidden" ||
            type === "button" ||
            type === "submit"
          ) {
            return;
          }

          if (
            (type === "radio" || type === "checkbox") &&
            !field.checked
          ) {
            return;
          }

          if (type === "file") {
            const files = Array.from(field.files ?? []);

            if (!files.length) return;

            const label = getFriendlyLabel(field);

            lines.push(
              `${label}: ${files.map((file) => file.name).join(", ")}`
            );

            return;
          }

          if (type === "radio" || type === "checkbox") {
            const label = getFriendlyLabel(field);
            const name = clean(field.name).toLowerCase();

            if (name.includes("project")) {
              projectType = label;
              lines.push(`Project type: ${label}`);
              return;
            }

            if (name.includes("budget")) {
              budget = label;
              lines.push(`Budget: ${label}`);
              return;
            }

            lines.push(label);
            return;
          }

          if (type === "date") {
            if (!field.value) return;

            lines.push(
              `Preferred shoot date: ${humanDate(field.value)}`
            );

            return;
          }
        }

        const value = clean(field.value);

        if (!value) return;

        const label = getFriendlyLabel(field);
        const fieldName = clean(field.getAttribute("name")).toLowerCase();

        if (
          fieldName === "name" ||
          fieldName.includes("yourname") ||
          label.toLowerCase() === "your name"
        ) {
          clientName = value;
        }

        lines.push(`${label}: ${value}`);
      });

    // Custom pressed buttons, used by project / budget controls
    root
      .querySelectorAll<HTMLButtonElement>('button[aria-pressed="true"]')
      .forEach((button) => {
        if (button.classList.contains("bookingStepButton")) return;

        const text = clean(button.textContent);

        if (!text) return;

        const sectionText = clean(
          button.closest("fieldset, section")?.textContent
        ).toLowerCase();

        if (
          sectionText.includes("what are we creating") ||
          sectionText.includes("project type")
        ) {
          if (!projectType) {
            projectType = text;
            lines.unshift(`Project type: ${text}`);
          }

          return;
        }

        if (sectionText.includes("budget")) {
          if (!budget) {
            budget = text;
            lines.push(`Budget: ${text}`);
          }
        }
      });

    // Remove duplicates while preserving order.
    const cleanLines = Array.from(new Set(lines));

    const subjectParts = [
      projectType || "Project",
      "inquiry",
    ];

    if (clientName) {
      subjectParts.push(clientName);
    }

    subjectParts.push("KSP Vision");

    const subject = subjectParts.join(" | ");

    const body = [
      "Hello KSP Vision,",
      "",
      "I would like to request availability for a project.",
      "",
      ...cleanLines,
      "",
      "Thank you.",
    ].join("\n");

    window.location.href =
      `mailto:${BOOKING_EMAIL}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;
  }


  const [activeStep, setActiveStep] =
    useState<StepNumber>(1);

  const [projectType, setProjectType] =
    useState<ProjectType>("");

  // KSP_CONTEXTUAL_PROJECT_PREFILL
  useEffect(() => {
    const source = new URLSearchParams(window.location.search).get("project");

    const projectLabels: Record<string, string[]> = {
      "wedding": ["WEDDING"],
      "music-video": ["MUSIC VIDEO"],
      "brand-commercial": ["BRAND / COMMERCIAL", "BRAND/COMMERCIAL"],
      "documentary": ["DOCUMENTARY"],
      "post-production-vfx": ["POST-PRODUCTION & VFX", "POSTPRODUCTION ET EFFETS VISUELS"],
    };

    const wanted = source ? projectLabels[source] : undefined;

    if (!wanted) return;

    const normalize = (value: string) =>
      value.replace(/\s+/g, " ").trim().toUpperCase();

    const selectExistingProjectCard = () => {
      /*
       * Important:
       * Do NOT guess the form's internal project values.
       * Trigger the existing project control so contextual entry behaves
       * exactly like a visitor manually selecting the project.
       */
      const controls = Array.from(
        document.querySelectorAll<HTMLElement>(
          'button, label, [role="button"]'
        )
      );

      const target = controls.find((control) => {
        const text = normalize(control.textContent || "");
        return wanted.some((label) => text === normalize(label));
      });

      if (target) {
        target.click();
      }
    };

    const frame = window.requestAnimationFrame(selectExistingProjectCard);

    return () => window.cancelAnimationFrame(frame);
  }, []);


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [location, setLocation] = useState("");
  const [shootDate, setShootDate] = useState("");

  const [budget, setBudget] = useState("");
  const [brief, setBrief] = useState("");

  const [projectOne, setProjectOne] = useState("");
  const [projectTwo, setProjectTwo] = useState("");
  const [songFile, setSongFile] = useState<File | null>(null);
  const [moodboardFile, setMoodboardFile] = useState<File | null>(null);

  const projectRef =
    useRef<HTMLFieldSetElement>(null);

  const detailsRef =
    useRef<HTMLFieldSetElement>(null);

  const budgetRef =
    useRef<HTMLFieldSetElement>(null);

  const briefRef =
    useRef<HTMLFieldSetElement>(null);


  const emailValid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);


  const conditionalComplete =
    projectType === "wedding"
      ? Boolean(projectOne.trim() && projectTwo.trim())
      : projectType === "music-video"
      ? Boolean(projectOne.trim() && projectTwo.trim())
      : projectType === "brand-commercial"
      ? Boolean(projectOne.trim() && projectTwo.trim())
      : projectType === "documentary"
      ? Boolean(projectOne.trim() && projectTwo.trim())
      : projectType === "post-production-vfx"
      ? Boolean(projectOne.trim() && projectTwo.trim())
      : projectType === "other"
      ? Boolean(projectOne.trim())
      : false;


  const stepComplete = {
    1: Boolean(projectType),

    2: Boolean(
      name.trim() &&
      emailValid &&
      location.trim() &&
      shootDate &&
      conditionalComplete
    ),

    3: Boolean(budget),

    4: Boolean(brief.trim()),
  };

  const allStepsComplete =
    stepComplete[1] &&
    stepComplete[2] &&
    stepComplete[3] &&
    stepComplete[4];

  const selectedBudget = budgetOptions.find(
    (option) => option.value === budget
  );


  function chooseProject(type: ProjectType) {
    if (type !== projectType) {
      setProjectOne("");
      setProjectTwo("");
      setSongFile(null);
      setMoodboardFile(null);
    }

    setProjectType(type);
  }


  function scrollToStep(
    step: StepNumber,
    ref: React.RefObject<HTMLFieldSetElement | null>
  ) {
    setActiveStep(step);

    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }


  useEffect(() => {
    const sections = [
      projectRef.current,
      detailsRef.current,
      budgetRef.current,
      briefRef.current,
    ].filter(Boolean) as HTMLFieldSetElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio -
              a.intersectionRatio
          )[0];

        if (!visible) return;

        const step = Number(
          visible.target.getAttribute("data-step")
        ) as StepNumber;

        if (step >= 1 && step <= 4) {
          setActiveStep(step);
        }
      },
      {
        rootMargin: "-18% 0px -56% 0px",
        threshold: [0, 0.15, 0.35, 0.55],
      }
    );

    sections.forEach((section) =>
      observer.observe(section)
    );

    return () => observer.disconnect();
  }, []);


  const projectSpecificFields = (() => {
    switch (projectType) {
      case "wedding":
        return (
          <>
            <label className="bookingField">
              <span>
                <Localized
                  en="Couple’s names"
                  fr="Noms du couple"
                />
              </span>

              <input
                type="text"
                value={projectOne}
                onChange={(e) =>
                  setProjectOne(e.target.value)
                }
              />
            </label>

            <label className="bookingField">
              <span>
                <Localized
                  en="Venue / city"
                  fr="Lieu / ville"
                />
              </span>

              <input
                type="text"
                value={projectTwo}
                onChange={(e) =>
                  setProjectTwo(e.target.value)
                }
              />
            </label>
          </>
        );


      case "music-video":
        return (
          <>
            <label className="bookingField">
              <span>
                <Localized
                  en="Artist name"
                  fr="Nom de l’artiste"
                />
              </span>

              <input
                type="text"
                value={projectOne}
                onChange={(e) =>
                  setProjectOne(e.target.value)
                }
              />
            </label>

            <label className="bookingField">
              <span>
                <Localized
                  en="Song title"
                  fr="Titre de la chanson"
                />
              </span>

              <input
                type="text"
                value={projectTwo}
                onChange={(e) =>
                  setProjectTwo(e.target.value)
                }
              />
            </label>


            <div className="bookingAssetGrid bookingFieldWide">

              <label className="bookingUpload">
                <span className="bookingUploadHeading">
                  <Localized
                    en="Song file"
                    fr="Fichier audio"
                  />

                  <small>
                    <Localized
                      en="Optional · MP3, WAV, M4A"
                      fr="Optionnel · MP3, WAV, M4A"
                    />
                  </small>
                </span>

                <div className={`bookingUploadControl ${
                  songFile ? "hasFile" : ""
                }`}>
                  <input
                    type="file"
                    accept="audio/*,.mp3,.wav,.m4a,.aac"
                    aria-label="Upload song file"
                    onChange={(e) =>
                      setSongFile(
                        e.target.files?.[0] || null
                      )
                    }
                  />

                  <span className="bookingUploadAction">
                    {songFile ? (
                      <Localized
                        en="Replace audio"
                        fr="Remplacer l’audio"
                      />
                    ) : (
                      <Localized
                        en="Upload song"
                        fr="Téléverser la chanson"
                      />
                    )}
                  </span>

                  <span className="bookingUploadName">
                    {songFile ? (
                      songFile.name
                    ) : (
                      <Localized
                        en="No file selected"
                        fr="Aucun fichier sélectionné"
                      />
                    )}
                  </span>

                  <b aria-hidden="true">＋</b>
                </div>
              </label>


              <label className="bookingUpload">
                <span className="bookingUploadHeading">
                  <Localized
                    en="Moodboard / references"
                    fr="Moodboard / références"
                  />

                  <small>
                    <Localized
                      en="Optional · PDF or image"
                      fr="Optionnel · PDF ou image"
                    />
                  </small>
                </span>

                <div className={`bookingUploadControl ${
                  moodboardFile ? "hasFile" : ""
                }`}>
                  <input
                    type="file"
                    accept="application/pdf,image/*,.pdf,.jpg,.jpeg,.png,.webp,.heic"
                    aria-label="Upload moodboard or reference file"
                    onChange={(e) =>
                      setMoodboardFile(
                        e.target.files?.[0] || null
                      )
                    }
                  />

                  <span className="bookingUploadAction">
                    {moodboardFile ? (
                      <Localized
                        en="Replace file"
                        fr="Remplacer le fichier"
                      />
                    ) : (
                      <Localized
                        en="Upload moodboard"
                        fr="Téléverser le moodboard"
                      />
                    )}
                  </span>

                  <span className="bookingUploadName">
                    {moodboardFile ? (
                      moodboardFile.name
                    ) : (
                      <Localized
                        en="No file selected"
                        fr="Aucun fichier sélectionné"
                      />
                    )}
                  </span>

                  <b aria-hidden="true">＋</b>
                </div>
              </label>

            </div>
          </>
        );


      case "brand-commercial":
        return (
          <>
            <label className="bookingField">
              <span>
                <Localized
                  en="Company / brand"
                  fr="Entreprise / marque"
                />
              </span>

              <input
                type="text"
                value={projectOne}
                onChange={(e) =>
                  setProjectOne(e.target.value)
                }
              />
            </label>

            <label className="bookingField">
              <span>
                <Localized
                  en="Campaign / project"
                  fr="Campagne / projet"
                />
              </span>

              <input
                type="text"
                value={projectTwo}
                onChange={(e) =>
                  setProjectTwo(e.target.value)
                }
              />
            </label>
          </>
        );


      case "documentary":
        return (
          <>
            <label className="bookingField">
              <span>
                <Localized
                  en="Subject / organization"
                  fr="Sujet / organisation"
                />
              </span>

              <input
                type="text"
                value={projectOne}
                onChange={(e) =>
                  setProjectOne(e.target.value)
                }
              />
            </label>

            <label className="bookingField">
              <span>
                <Localized
                  en="Expected scope"
                  fr="Portée prévue"
                />
              </span>

              <input
                type="text"
                value={projectTwo}
                onChange={(e) =>
                  setProjectTwo(e.target.value)
                }
              />
            </label>
          </>
        );


      case "post-production-vfx":
        return (
          <>
            <label className="bookingField">
              <span>
                <Localized
                  en="Project / film"
                  fr="Projet / film"
                />
              </span>

              <input
                type="text"
                value={projectOne}
                onChange={(e) =>
                  setProjectOne(e.target.value)
                }
              />
            </label>

            <label className="bookingField">
              <span>
                <Localized
                  en="Post-production needs"
                  fr="Besoins en postproduction"
                />
              </span>

              <input
                type="text"
                value={projectTwo}
                onChange={(e) =>
                  setProjectTwo(e.target.value)
                }
              />
            </label>
          </>
        );


      case "other":
        return (
          <label className="bookingField bookingFieldWide">
            <span>
              <Localized
                en="Project / organization"
                fr="Projet / organisation"
              />
            </span>

            <input
              type="text"
              value={projectOne}
              onChange={(e) =>
                setProjectOne(e.target.value)
              }
            />
          </label>
        );


      default:
        return (
          <div className="bookingConditionalPrompt bookingFieldWide">
            <Localized
              en="Choose a project type above and we’ll tailor the questions to your project."
              fr="Choisissez un type de projet ci-dessus et nous adapterons les questions à votre projet."
            />
          </div>
        );
    }
  })();


  return (
    <>
      <section className="bookingIntro">
        <div className="bookingIntroCopy">
          <p className="kicker">
            <Localized
              en="Start a project"
              fr="Démarrer un projet"
            />
          </p>

          <h1>
            <Localized
              en="Let’s make it"
              fr="Donnons vie"
            />

            <br />

            <em>
              <Localized
                en="happen."
                fr="à votre projet."
              />
            </em>
          </h1>

          <p className="bookingLead">
            <Localized
              en="Tell us a little about what you’re creating. We’ll use this to understand the project before we talk."
              fr="Parlez-nous un peu de ce que vous souhaitez créer. Ces informations nous aideront à comprendre le projet avant notre échange."
            />
          </p>
        </div>
      </section>


      <div className="bookingProgressShell">
        <nav
          className="bookingProcess"
          aria-label="Inquiry sections"
        >
          <button
            type="button"
            className={`bookingStepButton ${
              activeStep === 1 ? "isActive" : ""
            } ${
              stepComplete[1] ? "isComplete" : ""
            }`}
            onClick={() =>
              scrollToStep(1, projectRef)
            }
          >
            <span className="bookingStepIdentity">
              <b>01</b>
              <Localized
                en="The project"
                fr="Le projet"
              />
            </span>

            <small className="bookingStepStatus">
              {stepComplete[1] ? "✓ COMPLETE" : ""}
            </small>
          </button>


          <button
            type="button"
            className={`bookingStepButton ${
              activeStep === 2 ? "isActive" : ""
            } ${
              stepComplete[2] ? "isComplete" : ""
            }`}
            onClick={() =>
              scrollToStep(2, detailsRef)
            }
          >
            <span className="bookingStepIdentity">
              <b>02</b>
              <Localized
                en="Details"
                fr="Détails"
              />
            </span>

            <small className="bookingStepStatus">
              {stepComplete[2] ? "✓ COMPLETE" : ""}
            </small>
          </button>


          <button
            type="button"
            className={`bookingStepButton ${
              activeStep === 3 ? "isActive" : ""
            } ${
              stepComplete[3] ? "isComplete" : ""
            }`}
            onClick={() =>
              scrollToStep(3, budgetRef)
            }
          >
            <span className="bookingStepIdentity">
              <b>03</b>
              <Localized
                en="Budget"
                fr="Budget"
              />
            </span>

            <small className="bookingStepStatus">
              {stepComplete[3] ? "✓ COMPLETE" : ""}
            </small>
          </button>


          <button
            type="button"
            className={`bookingStepButton ${
              activeStep === 4 ? "isActive" : ""
            } ${
              stepComplete[4] ? "isComplete" : ""
            }`}
            onClick={() =>
              scrollToStep(4, briefRef)
            }
          >
            <span className="bookingStepIdentity">
              <b>04</b>
              <Localized
                en="Project brief"
                fr="Le brief"
              />
            </span>

            <small className="bookingStepStatus">
              {stepComplete[4] ? "✓ COMPLETE" : ""}
            </small>
          </button>
        </nav>
      </div>


      <section className="bookingFormSection">
        <form
          className="bookingForm"
          onSubmit={(e) => e.preventDefault()}
        >

          <fieldset
            ref={projectRef}
            data-step="1"
            className="bookingFieldset bookingProjectType bookingStepSection"
          >
            <legend>
              <span>01</span>

              <Localized
                en="What are we creating?"
                fr="Que créons-nous ?"
              />
            </legend>


            <div className="bookingChoices bookingChoicesProject">

              <label>
                <input
                  type="radio"
                  name="projectType"
                  value="wedding"
                  checked={projectType === "wedding"}
                  onChange={() =>
                    chooseProject("wedding")
                  }
                />

                <span>
                  <Localized
                    en="Wedding"
                    fr="Mariage"
                  />
                </span>
              </label>


              <label>
                <input
                  type="radio"
                  name="projectType"
                  value="music-video"
                  checked={projectType === "music-video"}
                  onChange={() =>
                    chooseProject("music-video")
                  }
                />

                <span>
                  <Localized
                    en="Music video"
                    fr="Clip musical"
                  />
                </span>
              </label>


              <label>
                <input
                  type="radio"
                  name="projectType"
                  value="brand-commercial"
                  checked={
                    projectType === "brand-commercial"
                  }
                  onChange={() =>
                    chooseProject("brand-commercial")
                  }
                />

                <span>
                  <Localized
                    en="Brand / Commercial"
                    fr="Marque / Commercial"
                  />
                </span>
              </label>


              <label>
                <input
                  type="radio"
                  name="projectType"
                  value="documentary"
                  checked={
                    projectType === "documentary"
                  }
                  onChange={() =>
                    chooseProject("documentary")
                  }
                />

                <span>
                  <Localized
                    en="Documentary"
                    fr="Documentaire"
                  />
                </span>
              </label>


              <label>
                <input
                  type="radio"
                  name="projectType"
                  value="post-production-vfx"
                  checked={
                    projectType === "post-production-vfx"
                  }
                  onChange={() =>
                    chooseProject("post-production-vfx")
                  }
                />

                <span>
                  <Localized
                    en="Post-Production & VFX"
                    fr="Postproduction et effets visuels"
                  />
                </span>
              </label>


              <label>
                <input
                  type="radio"
                  name="projectType"
                  value="other"
                  checked={projectType === "other"}
                  onChange={() =>
                    chooseProject("other")
                  }
                />

                <span>
                  <Localized
                    en="Other"
                    fr="Autre"
                  />
                </span>
              </label>

            </div>
          </fieldset>


          <fieldset
            ref={detailsRef}
            data-step="2"
            className="bookingFieldset bookingStepSection"
          >
            <legend>
              <span>02</span>

              <Localized
                en="Tell us the details"
                fr="Parlez-nous des détails"
              />
            </legend>


            <div className="bookingFieldsGrid">

              <label className="bookingField">
                <span>
                  <Localized
                    en="Your name"
                    fr="Votre nom"
                  />
                </span>

                <input
                  type="text"
                  value={name}
                  autoComplete="name"
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                />
              </label>


              <label className="bookingField">
                <span>
                  <Localized
                    en="Email"
                    fr="Courriel"
                  />
                </span>

                <input
                  type="email"
                  value={email}
                  autoComplete="email"
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />
              </label>


              {projectSpecificFields}


              <label className="bookingField">
                <span>
                  <Localized
                    en="Location"
                    fr="Lieu"
                  />
                </span>

                <input
                  type="text"
                  value={location}
                  onChange={(e) =>
                    setLocation(e.target.value)
                  }
                />
              </label>


              <label className="bookingField">
                <span>
                  <Localized
                    en="Preferred shoot date"
                    fr="Date de tournage souhaitée"
                  />
                </span>

                <div
                  className={`bookingDateControl ${
                    shootDate ? "hasDate" : ""
                  }`}
                >
                  <span className="bookingDateText">
                    {shootDate ? (
                      formatCalendarDate(shootDate)
                    ) : (
                      <Localized
                        en="Choose a date"
                        fr="Choisir une date"
                      />
                    )}
                  </span>

                  <span
                    className="bookingCalendarIcon"
                    aria-hidden="true"
                  />

                  <input
                    className="bookingDateNative"
                    type="date"
                    value={shootDate}
                    aria-label="Preferred shoot date"
                    onChange={(e) =>
                      setShootDate(e.target.value)
                    }
                    onClick={(e) => {
                      const picker =
                        e.currentTarget as HTMLInputElement & {
                          showPicker?: () => void;
                        };

                      picker.showPicker?.();
                    }}
                  />
                </div>
              </label>

            </div>
          </fieldset>


          <fieldset
            ref={budgetRef}
            data-step="3"
            className="bookingFieldset bookingStepSection"
          >
            <legend>
              <span>03</span>

              <Localized
                en="Approximate budget"
                fr="Budget approximatif"
              />
            </legend>


            <p className="bookingFieldHint">
              <Localized
                en="All budgets are in CAD. A range is enough to help us recommend the right production approach."
                fr="Tous les budgets sont en CAD. Une fourchette suffit pour nous aider à proposer l’approche de production la plus adaptée."
              />
            </p>


            <div className="bookingChoices bookingBudgetChoices">

              {budgetOptions.map(({ value, label, labelFr }) => (
                <label key={value}>
                  <input
                    type="radio"
                    name="budget"
                    value={value}
                    checked={budget === value}
                    onChange={() =>
                      setBudget(value)
                    }
                    aria-describedby={budget === value ? "selected-budget-guidance" : undefined}
                  />

                  <span className="bookingBudgetCard">
                    <strong><Localized en={label} fr={labelFr} /></strong>
                  </span>
                </label>
              ))}

            </div>

            {selectedBudget && (
              <section
                className="bookingBudgetDetail"
                id="selected-budget-guidance"
                aria-live="polite"
              >
                <header>
                  <span><Localized en={selectedBudget.label} fr={selectedBudget.labelFr} /></span>
                  <h3>
                    <Localized
                      en={selectedBudget.position.en}
                      fr={selectedBudget.position.fr}
                    />
                  </h3>
                </header>

                <dl>
                  {selectedBudget.details.map((detail) => (
                    <div key={detail.label.en}>
                      <dt>
                        <Localized en={detail.label.en} fr={detail.label.fr} />
                      </dt>
                      <dd>
                        <Localized en={detail.value.en} fr={detail.value.fr} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}
          </fieldset>


          <fieldset
            ref={briefRef}
            data-step="4"
            className="bookingFieldset bookingBrief bookingStepSection"
          >
            <legend>
              <span>04</span>

              <Localized
                en="Tell us about the project"
                fr="Parlez-nous du projet"
              />
            </legend>


            <label className="bookingField bookingFieldWide">
              <textarea
                rows={7}
                value={brief}
                aria-label="Project details"
                onChange={(e) =>
                  setBrief(e.target.value)
                }
              />
            </label>
          </fieldset>


          <section className="bookingNext">
            <div className="bookingNextHead">
              <p className="kicker">
                <Localized
                  en="What happens next"
                  fr="La suite"
                />
              </p>

              <h2>
                <Localized
                  en="A clear path from inquiry to production."
                  fr="Un processus clair, de la demande à la production."
                />
              </h2>
            </div>

            <div className="bookingNextGrid">
              <article>
                <span>01</span>

                <h3>
                  <Localized en="Review" fr="Analyse" />
                </h3>

                <p>
                  <Localized
                    en="We review your project, timeline and production needs."
                    fr="Nous examinons votre projet, votre échéancier et vos besoins de production."
                  />
                </p>
              </article>

              <article>
                <span>02</span>

                <h3>
                  <Localized en="Conversation" fr="Échange" />
                </h3>

                <p>
                  <Localized
                    en="If it feels like the right fit, we schedule a short conversation to discuss the project."
                    fr="Si le projet correspond, nous planifions un court échange pour en discuter."
                  />
                </p>
              </article>

              <article>
                <span>03</span>

                <h3>
                  <Localized en="Proposal" fr="Proposition" />
                </h3>

                <p>
                  <Localized
                    en="You receive a tailored production approach, scope and clear next steps."
                    fr="Vous recevez une approche de production adaptée, une portée claire et les prochaines étapes."
                  />
                </p>
              </article>
            </div>
          </section>


          <div className="bookingSubmitRow">
            <div>
              <p>
                <Localized
                  en="Montréal, Québec"
                  fr="Montréal, Québec"
                />
              </p>

              <span>
                <Localized
                  en="Available for select projects beyond the city"
                  fr="Disponible pour certains projets à l’extérieur de la ville"
                />
              </span>
            </div>


            <button
              type="button"
              className="bookingSubmit"
              disabled={!allStepsComplete}
              aria-disabled={!allStepsComplete}
              onClick={allStepsComplete ? openBookingEmail : undefined}
            >
              <Localized
                en="Request availability"
                fr="Demander les disponibilités"
              />

              <b>↗</b>
            </button>
          </div>


          <p className="bookingResponseNote">
            <Localized
              en="We typically reply within 1–2 business days."
              fr="Nous répondons généralement dans un délai de 1 à 2 jours ouvrables."
            />
          </p>

        </form>
      </section>
    </>
  );
}

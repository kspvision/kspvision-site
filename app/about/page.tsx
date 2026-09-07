import { pageMetadata } from "../page-metadata";

export const metadata = pageMetadata(
  "/about",
  "About KSP Vision | Montréal Production Studio",
  "The story behind KSP Vision and founder Kevin Shayne, from music and KSP Films to a Montréal production company working across artists, weddings, brands and documentary storytelling."
);

import { Localized, SiteFooter, SiteHeader } from "../site-language";
import "./about.css";

export default function Page() {
  return (
    <main className="aboutStudioPage">
      <SiteHeader />

      {/* =====================================================
          HERO
          ===================================================== */}
      <section className="studioHero">
        <div className="studioHeroInner">
          <p className="kicker">
            <Localized
              en="KSP Vision / The Story"
              fr="KSP Vision / L’histoire"
            />
          </p>

          <h1>
            <Localized en="Built from" fr="Né de" />
            <br />
            <em>
              <Localized en="the scene." fr="la scène." />
            </em>
          </h1>

          <p className="studioHeroThesis">
            <Localized
              en="Music came first. Cinema shaped the eye. The camera became the language."
              fr="La musique est venue en premier. Le cinéma a façonné le regard. La caméra est devenue le langage."
            />
          </p>

          <div className="studioCompanyStoryPreview">
            <p>
              <Localized
                en="Long before KSP Vision became a company, Kevin Shayne was already inside music: rapping, making beats, recording artists and learning the scene from the inside. Filmmaking came later, when he realized that artists around him needed more than songs. They needed to be seen."
                fr="Bien avant que KSP Vision devienne une entreprise, Kevin Shayne évoluait déjà dans la musique : rap, production de beats, enregistrement d’artistes et découverte de la scène de l’intérieur. La réalisation est venue plus tard, lorsqu’il a compris que les artistes autour de lui avaient besoin de plus que de musique. Ils avaient besoin d’être vus."
              />
            </p>

            <p>
              <Localized
                en="He picked up a camera, taught himself filmmaking and began building the visual platform he felt was missing. That became KSP Films. Today, KSP Vision carries that foundation into music, weddings, brand films and documentary storytelling."
                fr="Il a pris une caméra, appris la réalisation par lui-même et commencé à construire la vitrine visuelle qui, selon lui, manquait. C’est devenu KSP Films. Aujourd’hui, KSP Vision prolonge cette fondation à travers la musique, les mariages, les films de marque et le documentaire."
              />
            </p>
          </div>

          <div className="studioHeroProof">
            <div>
              <strong>10+</strong>
              <span>
                <Localized en="Years" fr="Années" />
              </span>
            </div>

            <div>
              <strong>300+</strong>
              <span>
                <Localized en="Projects" fr="Projets" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          EVOLUTION / STORY
          ===================================================== */}
      <section className="studioEvolution">
        <div className="studioSectionHead">
          <div>
            <p className="kicker">
              <Localized en="The evolution" fr="L’évolution" />
            </p>

            <h2>
              <Localized en="From music to" fr="De la musique à" />
              <br />
              <span>KSP VISION</span>
            </h2>
          </div>

          <p>
            <Localized
              en="More than a decade and hundreds of productions separate the first KSP shoots from the studio today. Each chapter expanded the craft, the scale and the kind of stories the company could take on."
              fr="Plus d’une décennie et des centaines de productions séparent les premiers tournages KSP du studio d’aujourd’hui. Chaque chapitre a élargi le savoir-faire, l’échelle et le type d’histoires que l’entreprise pouvait prendre en charge."
            />
          </p>
        </div>

        <div className="studioTimeline">

          <article>
            <span className="studioTimelineNo">01</span>

            <div>
              <p className="studioTimelineEra">
                <Localized en="Music before film" fr="La musique avant l’image" />
              </p>

              <h3>
                <Localized en="It started with sound." fr="Tout a commencé par le son." />
              </h3>

              <p>
                <Localized
                  en="Kevin grew up around music and began rapping, producing and recording young. Those years built an instinct for rhythm, performance and artist identity that would later become part of his filmmaking language."
                  fr="Kevin a grandi autour de la musique et a commencé très jeune à rapper, produire et enregistrer. Ces années ont développé un instinct pour le rythme, la performance et l’identité artistique qui allait plus tard faire partie de son langage de réalisateur."
                />
              </p>
            </div>

            <span className="studioTimelineDate">
              <Localized en="ROOTS" fr="ORIGINES" />
            </span>
          </article>


          <article>
            <span className="studioTimelineNo">02</span>

            <div>
              <p className="studioTimelineEra">
                <Localized en="The visual language" fr="Le langage visuel" />
              </p>

              <h3>
                <Localized en="Learning to think in images." fr="Apprendre à penser en images." />
              </h3>

              <p>
                <Localized
                  en="Movies had always been part of the fascination: lighting, framing, movement, performance and the way editing can change emotion. When Kevin saw the need for a stronger visual platform around Montréal artists, the camera became both a creative outlet and a way to build what was missing."
                  fr="Les films avaient toujours fait partie de la fascination : la lumière, le cadrage, le mouvement, la performance et la façon dont le montage peut transformer une émotion. Lorsque Kevin a vu le besoin d’une plateforme visuelle plus forte autour des artistes montréalais, la caméra est devenue à la fois un outil créatif et une façon de construire ce qui manquait."
                />
              </p>
            </div>

            <span className="studioTimelineDate">
              <Localized en="THE SHIFT" fr="LE DÉCLIC" />
            </span>
          </article>


          <article>
            <span className="studioTimelineNo">03</span>

            <div>
              <p className="studioTimelineEra">
                <Localized en="The first body of work" fr="Le premier grand chapitre" />
              </p>

              <h3>KSP FILMS</h3>

              <p>
                <Localized
                  en="Music videos became the first major body of work. Project after project, KSP Films developed a recognizable presence around Montréal artists while Kevin refined directing, cinematography, lighting, editing and visual storytelling through constant production."
                  fr="Les vidéoclips sont devenus le premier grand corpus de travail. Projet après projet, KSP Films a développé une présence reconnaissable autour des artistes montréalais pendant que Kevin affinait la réalisation, la cinématographie, l’éclairage, le montage et la narration visuelle à travers une production constante."
                />
              </p>
            </div>

            <span className="studioTimelineDate">KSP FILMS</span>
          </article>


          <article>
            <span className="studioTimelineNo">04</span>

            <div>
              <p className="studioTimelineEra">
                <Localized en="The expansion" fr="L’expansion" />
              </p>

              <h3>KSP TEAM</h3>

              <p>
                <Localized
                  en="Growing demand pushed KSP beyond a one-person operation. KSP Team brought together shooters, editors and visual collaborators to handle a larger volume of productions. It became Kevin’s first experience building beyond freelance production and understanding the structure required to sustain a creative company."
                  fr="La croissance de la demande a poussé KSP au-delà d’une opération individuelle. KSP Team a réuni cadreurs, monteurs et collaborateurs visuels afin de gérer un plus grand volume de productions. Cette période est devenue la première expérience de Kevin dans la construction d’une structure allant au-delà du travail autonome et dans la compréhension de ce qu’il faut pour maintenir une entreprise créative."
                />
              </p>
            </div>

            <span className="studioTimelineDate">
              <Localized en="EXPANSION" fr="EXPANSION" />
            </span>
          </article>


          <article>
            <span className="studioTimelineNo">05</span>

            <div>
              <p className="studioTimelineEra">
                <Localized en="A wider frame" fr="Un cadre plus large" />
              </p>

              <h3>
                <Localized en="Beyond music videos." fr="Au-delà du vidéoclip." />
              </h3>

              <p>
                <Localized
                  en="The work had already begun moving into weddings, documentary, organizations and commercial production. Cinema remained a constant reference point, while each new format expanded Kevin’s understanding of people, story, production and how different kinds of images need to feel."
                  fr="Le travail avait déjà commencé à s’étendre aux mariages, au documentaire, aux organisations et à la production commerciale. Le cinéma est demeuré une référence constante, tandis que chaque nouveau format élargissait la compréhension de Kevin des personnes, des histoires, de la production et de la sensation propre à chaque type d’image."
                />
              </p>
            </div>

            <span className="studioTimelineDate">
              <Localized en="EXPANSION OF CRAFT" fr="ÉVOLUTION DU MÉTIER" />
            </span>
          </article>


          <article className="studioTimelineFinal">
            <span className="studioTimelineNo">06</span>

            <div>
              <p className="studioTimelineEra">
                <Localized en="The studio today" fr="Le studio aujourd’hui" />
              </p>

              <h3>KSP VISION</h3>

              <p>
                <Localized
                  en="KSP Vision brings more than a decade of production experience together under one company. KSP Films remains its music foundation, joined by wedding films, brand work and documentary storytelling, with direction, cinematography, production and post-production connected through one creative vision."
                  fr="KSP Vision réunit plus d’une décennie d’expérience en production sous une seule entreprise. KSP Films demeure sa fondation musicale, rejoint par les films de mariage, le travail de marque et le documentaire, avec la réalisation, la cinématographie, la production et la postproduction réunies autour d’une même vision créative."
                />
              </p>
            </div>

            <span className="studioTimelineDate">
              <Localized en="TODAY" fr="AUJOURD’HUI" />
            </span>
          </article>

        </div>
      </section>

      {/* =====================================================
          FOUNDER
          ===================================================== */}
      <section className="studioFounder">
        <div className="studioFounderGallery">

          <figure className="studioFounderImage studioFounderPrimary">
            <img
              src="/about/kevin-primary.png"
              alt="Kevin Shayne, founder and creative director of KSP Vision"
            />

            <figcaption>
              <Localized
                en="FOUNDER / CREATIVE DIRECTOR"
                fr="FONDATEUR / DIRECTEUR CRÉATIF"
              />
            </figcaption>
          </figure>

          <div className="studioFounderSide">

            <figure className="studioFounderImage studioFounderBts">
              <img
                src="/about/kevin-bts.png"
                alt="Kevin Shayne behind the scenes"
              />

              <figcaption>
                <Localized en="BEHIND THE SCENES" fr="EN TOURNAGE" />
              </figcaption>
            </figure>

            <figure className="studioFounderImage studioFounderCinematic">
              <img
                src="/about/kevin-cinematic.png"
                alt="Kevin Shayne portrait"
              />

              <figcaption>
                <Localized en="PORTRAIT / ARCHIVE" fr="PORTRAIT / ARCHIVES" />
              </figcaption>
            </figure>

          </div>
        </div>

        <div className="studioFounderCopy">
          <p className="kicker">
            <Localized
              en="Founder / Creative Director"
              fr="Fondateur / Directeur créatif"
            />
          </p>

          <h2>KEVIN<br />SHAYNE</h2>

          <p className="studioFounderLead">
            <Localized
              en="Filmmaker, Creative Director and founder with more than a decade spent directing, shooting, producing and shaping stories in post."
              fr="Réalisateur, directeur créatif et fondateur avec plus d’une décennie consacrée à la réalisation, à la prise de vue, à la production et à la construction des histoires en postproduction."
            />
          </p>

          <div className="studioFounderStory">
            <p>
              <Localized
                en="Kevin’s visual instinct was shaped by both music and movies. Music taught rhythm, performance and energy. Cinema sharpened his attention to light, framing, movement, pacing and emotion. Music videos became the space where those influences could be tested repeatedly and turned into a professional filmmaking practice."
                fr="L’instinct visuel de Kevin a été façonné à la fois par la musique et par le cinéma. La musique lui a appris le rythme, la performance et l’énergie. Le cinéma a développé son attention à la lumière, au cadrage, au mouvement, au rythme narratif et à l’émotion. Le vidéoclip est devenu l’espace où ces influences pouvaient être testées constamment et transformées en une pratique professionnelle de la réalisation."
              />
            </p>

            <p>
              <Localized
                en="Across more than 300 projects, that practice expanded into creative direction, cinematography, production and post-production across different formats. KSP Vision is the studio built from that experience, carrying the energy of the early years into a more deliberate and long-term production company."
                fr="À travers plus de 300 projets, cette pratique s’est élargie à la direction créative, à la cinématographie, à la production et à la postproduction dans différents formats. KSP Vision est le studio construit à partir de cette expérience, transportant l’énergie des premières années vers une société de production plus réfléchie et pensée pour le long terme."
              />
            </p>
          </div>

          <div className="studioFounderStatement">
            <span>
              <Localized en="THE IDEA NOW" fr="L’IDÉE AUJOURD’HUI" />
            </span>

            <p>
              <Localized
                en="The first KSP was built on hustle. KSP Vision is being built to last."
                fr="Le premier KSP s’est construit sur le hustle. KSP Vision se construit pour durer."
              />
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          APPROACH
          ===================================================== */}
      <section className="studioApproach">
        <div className="studioSectionHead">
          <div>
            <p className="kicker">
              <Localized en="The approach" fr="L’approche" />
            </p>

            <h2>
              <Localized
                en="Hands-on by design."
                fr="Une approche volontairement directe."
              />
            </h2>
          </div>

          <p>
            <Localized
              en="Growth changed the scale, not the relationship to the work. KSP Vision stays close to the image from the first conversation through production, post-production and final delivery."
              fr="La croissance a changé l’échelle, pas la relation avec le travail. KSP Vision reste proche de l’image, de la première conversation jusqu’au tournage, à la postproduction et à la livraison finale."
            />
          </p>
        </div>

        <div className="studioApproachGrid">
          <article>
            <span>01</span>

            <h3>
              <Localized en="Creative Direction" fr="Direction créative" />
            </h3>

            <p>
              <Localized
                en="Finding the visual language, tone and production approach that genuinely belong to the project."
                fr="Trouver le langage visuel, le ton et l’approche de production qui appartiennent réellement au projet."
              />
            </p>
          </article>

          <article>
            <span>02</span>

            <h3>
              <Localized en="Production" fr="Production" />
            </h3>

            <p>
              <Localized
                en="Turning an idea into a practical production with the right scale, collaborators and decisions."
                fr="Transformer une idée en production concrète avec la bonne échelle, les bons collaborateurs et les bonnes décisions."
              />
            </p>
          </article>

          <article>
            <span>03</span>

            <h3>
              <Localized en="Cinematography" fr="Cinématographie" />
            </h3>

            <p>
              <Localized
                en="Building images through light, movement, framing and an understanding of how the finished film should feel."
                fr="Construire l’image à travers la lumière, le mouvement, le cadrage et la compréhension de la sensation que doit laisser le film final."
              />
            </p>
          </article>

          <article>
            <span>04</span>

            <h3>
              <Localized en="Post-production" fr="Postproduction" />
            </h3>

            <p>
              <Localized
                en="Editing, rhythm, sound and finishing shaped around the story instead of forcing every project into the same template."
                fr="Montage, rythme, son et finition construits autour de l’histoire plutôt que de forcer chaque projet dans le même modèle."
              />
            </p>
          </article>
        </div>
      </section>

      {/* =====================================================
          THREE BRANCHES
          ===================================================== */}
      <section className="studioBranches">
        <div className="studioBranchesHead">
          <p className="kicker">
            <Localized en="The work" fr="Le travail" />
          </p>

          <h2>
            <Localized
              en="Three branches. One vision."
              fr="Trois branches. Une vision."
            />
          </h2>
        </div>

        <div className="studioBranchGrid">
          <a href="/kspfilms">
            <span>01</span>

            <div>
              <p>
                <Localized en="Artists / Music" fr="Artistes / Musique" />
              </p>

              <h3>KSP FILMS</h3>
            </div>

            <b>↗</b>
          </a>

          <a href="/weddings">
            <span>02</span>

            <div>
              <p>
                <Localized
                  en="Couples / Celebrations"
                  fr="Couples / Célébrations"
                />
              </p>

              <h3>WEDDINGS</h3>
            </div>

            <b>↗</b>
          </a>

          <a href="/brand-documentary">
            <span>03</span>

            <div>
              <p>
                <Localized
                  en="Brands / Organizations"
                  fr="Marques / Organisations"
                />
              </p>

              <h3>BRAND / DOCUMENTARY</h3>
            </div>

            <b>↗</b>
          </a>
        </div>
      </section>

      {/* =====================================================
          CTA
          ===================================================== */}
      <section className="studioCta">
        <p className="kicker">
          <Localized
            en="Start a conversation"
            fr="Démarrer une conversation"
          />
        </p>

        <h2>
          <Localized en="Have a story worth" fr="Une histoire mérite" />
          <br />
          <em>
            <Localized
              en="putting on screen?"
              fr="d’être mise à l’écran ?"
            />
          </em>
        </h2>

        <a href="/booking">
          <Localized en="Start a project" fr="Démarrer un projet" />
          <span>↗</span>
        </a>
      </section>

      <SiteFooter />
    </main>
  );
}

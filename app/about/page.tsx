import { pageMetadata } from "../page-metadata";

export const metadata = pageMetadata("/about", "About KSP Vision | Montréal Production Studio", "Meet KSP Vision and founder Kevin Sanelus. Explore the studio’s work across music videos, weddings, commercial films and documentaries.");

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
            <Localized en="KSP Vision / The Studio" fr="KSP Vision / Le Studio" />
          </p>

          <h1>
            <Localized en="A decade behind" fr="Une décennie derrière" />
            <br />
            <em>
              <Localized en="the image." fr="l’image." />
            </em>
          </h1>

          <div className="studioCompanyStoryPreview">
            <p>
              KSP Vision was built through years of creating images before it ever became one company.
              What began around music videos gradually expanded into a broader production practice,
              shaped by hundreds of projects, different collaborators, new formats and a constantly
              evolving way of approaching visual storytelling.
            </p>

            <p>
              The company grew from an artist-focused foundation into work spanning weddings,
              commercial production and documentary storytelling. Each chapter added something new,
              while the same hands-on approach to production, cinematography and post-production
              remained at the center of the work.
            </p>

            <p>
              Today, KSP Vision brings those different branches together under one production company —
              connecting more than a decade of work, experience and creative development into the studio
              it has become.
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
          EVOLUTION
          ===================================================== */}
      <section className="studioEvolution">
        <div className="studioSectionHead">
          <div>
            <p className="kicker">
              <Localized en="The evolution" fr="L’évolution" />
            </p>

            <h2>KSP FILMS <span>→</span> KSP VISION</h2>
          </div>

          <p>
            <Localized
              en="What began with music videos grew into a wider production practice without losing the hands-on approach that built it."
              fr="Ce qui a commencé avec les clips musicaux est devenu une pratique de production plus large, sans perdre l’approche directe qui l’a construite."
            />
          </p>
        </div>


        <div className="studioTimeline">
          <article>
            <span className="studioTimelineNo">01</span>

            <div>
              <p className="studioTimelineEra">
                <Localized en="The beginning" fr="Le début" />
              </p>

              <h3>KSP FILMS</h3>

              <p>
                <Localized
                  en="The music-video foundation. Artists, sets, performance, experimentation and years spent developing a visual language."
                  fr="La fondation musicale. Artistes, plateaux, performance, expérimentation et des années à développer un langage visuel."
                />
              </p>
            </div>

            <span className="studioTimelineDate">
              <Localized en="DATE / STORY TO ADD" fr="DATE / HISTOIRE À AJOUTER" />
            </span>
          </article>


          <article>
            <span className="studioTimelineNo">02</span>

            <div>
              <p className="studioTimelineEra">
                <Localized en="Expansion" fr="Expansion" />
              </p>

              <h3>
                <Localized en="Beyond one format" fr="Au-delà d’un seul format" />
              </h3>

              <p>
                <Localized
                  en="The work expanded across weddings, commercial production and documentary storytelling."
                  fr="Le travail s’est élargi aux mariages, aux productions commerciales et au documentaire."
                />
              </p>
            </div>

            <span className="studioTimelineDate">
              <Localized en="DATE / STORY TO ADD" fr="DATE / HISTOIRE À AJOUTER" />
            </span>
          </article>


          <article>
            <span className="studioTimelineNo">03</span>

            <div>
              <p className="studioTimelineEra">
                <Localized en="Today" fr="Aujourd’hui" />
              </p>

              <h3>KSP VISION</h3>

              <p>
                <Localized
                  en="One production company connecting work for artists, couples, brands and organizations."
                  fr="Une seule société de production réunissant le travail destiné aux artistes, aux couples, aux marques et aux organisations."
                />
              </p>
            </div>

            <span className="studioTimelineDate">
              <Localized en="FULL STORY TOMORROW" fr="HISTOIRE COMPLÈTE DEMAIN" />
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
              alt="Founder portrait"
            />

            <figcaption>
              FOUNDER / CREATIVE DIRECTOR
            </figcaption>
          </figure>


          <div className="studioFounderSide">

            <figure className="studioFounderImage studioFounderBts">
              <img
                src="/about/kevin-bts.png"
                alt="Behind the scenes"
              />

              <figcaption>
                BEHIND THE SCENES
              </figcaption>
            </figure>


            <figure className="studioFounderImage studioFounderCinematic">
              <img
                src="/about/kevin-cinematic.png"
                alt="Cinematic portrait"
              />

              <figcaption>
                PORTRAIT / ARCHIVE
              </figcaption>
            </figure>

          </div>

        </div>


        <div className="studioFounderCopy">
          <p className="kicker">
            <Localized en="Founder / Creative Director" fr="Fondateur / Directeur créatif" />
          </p>

          <h2>KEVIN<br />SANELUS</h2>

          <p className="studioFounderLead">
            <Localized
              en="Founder and Creative Director of KSP Vision, working across production, cinematography, creative direction and post-production."
              fr="Fondateur et directeur créatif de KSP Vision, actif en production, cinématographie, direction créative et postproduction."
            />
          </p>

          <div className="studioStoryPlaceholder studioStoryPreview">
            <div className="studioStoryPreviewHead">
              <span>
                <Localized en="Founder story" fr="Histoire du fondateur" />
              </span>

              <small>
                <Localized
                  en="Full story tomorrow"
                  fr="Histoire complète demain"
                />
              </small>
            </div>

            <div className="studioBlurStory" aria-hidden="true">
              <p>
                KSP began long before it became a production company with
                distinct branches. The early years were built around music,
                cameras, edits, long nights, experimentation and learning how
                an image could carry identity.
              </p>

              <p>
                Over time, one body of work became many. Artists led to larger
                productions. Production led to new formats, new collaborators
                and a broader understanding of what the company could become.
                The name changed, but the instinct behind the work remained.
              </p>

              <p>
                Today, KSP Vision brings those years together under one studio:
                films for artists, weddings built around memory, and commercial
                or documentary work shaped around people, purpose and story.
              </p>
            </div>


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
              <Localized en="Hands-on by design." fr="Une approche volontairement directe." />
            </h2>
          </div>

          <p>
            <Localized
              en="The company has grown, but the work remains close to the image, from the first conversation through production and the final edit."
              fr="L’entreprise a grandi, mais le travail reste proche de l’image · de la première conversation jusqu’au tournage et au montage final."
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
                en="Finding the visual language, tone and production approach that belong to the project."
                fr="Trouver le langage visuel, le ton et l’approche de production propres au projet."
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
                en="Turning the idea into a practical shoot with the right scale, people and decisions."
                fr="Transformer l’idée en un tournage concret avec la bonne échelle, les bonnes personnes et les bonnes décisions."
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
                en="Image-making with attention to light, movement, framing and the feeling of the finished film."
                fr="Créer l’image avec une attention particulière à la lumière, au mouvement, au cadrage et à la sensation du film final."
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
                en="Editing, rhythm, sound and finishing shaped around the story rather than a template."
                fr="Montage, rythme, son et finition construits autour de l’histoire plutôt que d’un modèle."
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
                <Localized en="Couples / Celebrations" fr="Couples / Célébrations" />
              </p>

              <h3>WEDDINGS</h3>
            </div>

            <b>↗</b>
          </a>


          <a href="/brand-documentary">
            <span>03</span>

            <div>
              <p>
                <Localized en="Brands / Organizations" fr="Marques / Organisations" />
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
          <Localized en="Start a conversation" fr="Démarrer une conversation" />
        </p>

        <h2>
          <Localized en="Have a story worth" fr="Une histoire mérite" />
          <br />
          <em>
            <Localized en="putting on screen?" fr="d’être mise à l’écran ?" />
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

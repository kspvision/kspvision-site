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
              en="Music came first. The camera came because something was missing."
              fr="La musique est venue en premier. La caméra est arrivée parce qu’il manquait quelque chose."
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
              en="KSP Vision was not created in one moment. It is the result of different chapters , music, filmmaking, growth, mistakes, a pause, and a return with a clearer idea of what the company should become."
              fr="KSP Vision n’est pas né en un seul moment. L’entreprise est le résultat de plusieurs chapitres , la musique, la réalisation, la croissance, les erreurs, une pause et un retour avec une vision plus claire de ce que l’entreprise devait devenir."
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
                  en="Kevin grew up around music and began rapping, producing and recording young. Before he ever directed an artist, he understood what it meant to be the person trying to be heard."
                  fr="Kevin a grandi autour de la musique et a commencé très jeune à rapper, produire et enregistrer. Avant même de diriger un artiste, il comprenait ce que signifiait être la personne qui cherche à se faire entendre."
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
                <Localized en="Build what is missing" fr="Créer ce qui manque" />
              </p>

              <h3>
                <Localized en="The camera became the answer." fr="La caméra est devenue la réponse." />
              </h3>

              <p>
                <Localized
                  en="Montréal had artists with something to say, but not enough visual infrastructure to carry their work beyond their immediate circles. Kevin taught himself filmmaking and began building the kind of platform he felt was missing."
                  fr="Montréal avait des artistes avec quelque chose à dire, mais pas assez d’infrastructure visuelle pour porter leur travail au-delà de leur entourage immédiat. Kevin a appris la réalisation par lui-même et a commencé à bâtir le type de plateforme qui, selon lui, manquait."
                />
              </p>
            </div>

            <span className="studioTimelineDate">
              <Localized en="THE SHIFT" fr="LE DÉCLIC" />
            </span>
          </article>


          <div className="studioTimelineMedia">
            <figure className="studioTimelineMediaWide">
              <img
                src="/music-1539-exact.jpg"
                alt="KSP Films archive"
              />
              <figcaption>
                <Localized en="KSP FILMS / ARCHIVE" fr="KSP FILMS / ARCHIVES" />
              </figcaption>
            </figure>

            <figure>
              <img
                src="/music-1540.jpg"
                alt="Music video archive"
              />
              <figcaption>
                <Localized en="MUSIC VIDEO ERA" fr="ÈRE VIDÉOCLIP" />
              </figcaption>
            </figure>
          </div>


          <article>
            <span className="studioTimelineNo">03</span>

            <div>
              <p className="studioTimelineEra">
                <Localized en="The first KSP era" fr="La première ère KSP" />
              </p>

              <h3>KSP FILMS</h3>

              <p>
                <Localized
                  en="KSP Films grew through volume, experimentation and proximity to artists. The work helped document and amplify a generation of Montréal music while Kevin moved fully from artist to filmmaker."
                  fr="KSP Films a grandi grâce au volume, à l’expérimentation et à la proximité avec les artistes. Le travail a contribué à documenter et amplifier une génération de musique montréalaise pendant que Kevin passait définitivement d’artiste à réalisateur."
                />
              </p>
            </div>

            <span className="studioTimelineDate">KSP FILMS</span>
          </article>


          <article>
            <span className="studioTimelineNo">04</span>

            <div>
              <p className="studioTimelineEra">
                <Localized en="Growth without structure" fr="Grandir sans structure" />
              </p>

              <h3>
                <Localized en="When hustle stopped being enough." fr="Quand le hustle ne suffisait plus." />
              </h3>

              <p>
                <Localized
                  en="Demand outgrew one person, so KSP expanded into a team. The creative growth moved faster than the business structure, teaching Kevin the difference between being busy and building something sustainable."
                  fr="La demande a dépassé ce qu’une seule personne pouvait porter, alors KSP est devenu une équipe. La croissance créative a avancé plus vite que la structure d’entreprise, montrant à Kevin la différence entre être très occupé et bâtir quelque chose de durable."
                />
              </p>
            </div>

            <span className="studioTimelineDate">
              <Localized en="GROWTH" fr="CROISSANCE" />
            </span>
          </article>


          <div className="studioTimelineMedia studioTimelineMediaReverse">
            <figure>
              <img
                src="/music-1602.jpg"
                alt="KSP Films selected frame"
              />
              <figcaption>
                <Localized en="SELECTED FRAME" fr="IMAGE SÉLECTIONNÉE" />
              </figcaption>
            </figure>

            <figure className="studioTimelineMediaWide">
              <img
                src="/music-1605.jpg"
                alt="KSP Films production archive"
              />
              <figcaption>
                <Localized en="PRODUCTION / ARCHIVE" fr="PRODUCTION / ARCHIVES" />
              </figcaption>
            </figure>
          </div>


          <article>
            <span className="studioTimelineNo">05</span>

            <div>
              <p className="studioTimelineEra">
                <Localized en="The rebuild" fr="La reconstruction" />
              </p>

              <h3>
                <Localized en="Stepping away changed the vision." fr="S’éloigner a changé la vision." />
              </h3>

              <p>
                <Localized
                  en="After years at full speed, Kevin stepped away and rebuilt privately. Becoming a father changed the reason to return: not simply to be visible again, but to build something stronger and capable of lasting."
                  fr="Après des années à pleine vitesse, Kevin s’est éloigné et s’est reconstruit loin du regard public. Devenir père a changé la raison de revenir : il ne s’agissait plus simplement de redevenir visible, mais de construire quelque chose de plus solide et capable de durer."
                />
              </p>
            </div>

            <span className="studioTimelineDate">
              <Localized en="REBUILD" fr="RECONSTRUCTION" />
            </span>
          </article>


          <article className="studioTimelineFinal">
            <span className="studioTimelineNo">06</span>

            <div>
              <p className="studioTimelineEra">
                <Localized en="The company today" fr="L’entreprise aujourd’hui" />
              </p>

              <h3>KSP VISION</h3>

              <p>
                <Localized
                  en="KSP Vision is the next version of the idea. KSP Films remains its music foundation, joined by weddings, brand films and documentary work under one production company built for the long term."
                  fr="KSP Vision est la prochaine version de l’idée. KSP Films demeure sa fondation musicale, rejoint par les mariages, les films de marque et le documentaire au sein d’une seule société de production pensée pour le long terme."
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
              en="Artist first. Filmmaker by necessity. Founder by evolution."
              fr="Artiste d’abord. Réalisateur par nécessité. Fondateur par évolution."
            />
          </p>

          <div className="studioFounderStory">
            <p>
              <Localized
                en="Kevin’s eye comes from music. His approach to filmmaking is rooted in rhythm, performance, identity and an understanding of the person standing in front of the lens."
                fr="Le regard de Kevin vient de la musique. Son approche de la réalisation est ancrée dans le rythme, la performance, l’identité et la compréhension de la personne devant l’objectif."
              />
            </p>

            <p>
              <Localized
                en="He learned outside the traditional film path through self-teaching, repetition, difficult shoots and years of editing. KSP Vision carries the creative instinct of that first era with stronger structure, clearer intention and a longer horizon."
                fr="Il a appris en dehors du parcours traditionnel du cinéma, par lui-même, grâce à la répétition, aux tournages difficiles et à des années de montage. KSP Vision conserve l’instinct créatif de cette première époque avec une structure plus solide, une intention plus claire et une vision à plus long terme."
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

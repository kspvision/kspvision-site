import { pageMetadata } from "../page-metadata";

export const metadata = pageMetadata(
  "/about",
  "About KSP Vision | Montréal Production Studio",
  "The story behind KSP Vision and founder Kevin Shayne — from music and KSP Films to a Montréal production company working across artists, weddings, brands and documentary storytelling."
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
                en="Long before KSP Vision became a production company, Kevin Shayne was growing up inside music — writing, rapping, making beats, recording artists and learning the culture from the inside. The goal was never simply to stand beside the scene. He was part of it."
                fr="Bien avant que KSP Vision devienne une société de production, Kevin Shayne grandissait dans la musique — écriture, rap, production de beats, enregistrement d’artistes et apprentissage de la culture de l’intérieur. L’objectif n’a jamais été simplement d’observer la scène. Il en faisait partie."
              />
            </p>

            <p>
              <Localized
                en="When it became clear that many young Montréal artists had the music but not the visual platform, infrastructure or access needed to be seen beyond their immediate circles, Kevin turned toward filmmaking. What started with a camera, YouTube tutorials and a belief that the city needed its own visual window became KSP Films."
                fr="Lorsqu’il est devenu évident que plusieurs jeunes artistes montréalais avaient la musique, mais pas la plateforme visuelle, l’infrastructure ou l’accès nécessaires pour être vus au-delà de leur entourage immédiat, Kevin s’est tourné vers la réalisation. Ce qui a commencé avec une caméra, des tutoriels YouTube et la conviction que la ville avait besoin de sa propre vitrine visuelle est devenu KSP Films."
              />
            </p>

            <p>
              <Localized
                en="More than a decade later, KSP Vision brings that history forward into a broader studio built around artists, couples, brands and organizations — with the same instinct that started everything: find the story, build the image around it, and make it matter."
                fr="Plus d’une décennie plus tard, KSP Vision fait évoluer cette histoire vers un studio plus large au service des artistes, des couples, des marques et des organisations — avec le même instinct qu’au départ : trouver l’histoire, construire l’image autour d’elle et lui donner du poids."
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
              en="KSP Vision was not created in one moment. It is the result of different chapters — music, filmmaking, growth, mistakes, a pause, and a return with a clearer idea of what the company should become."
              fr="KSP Vision n’est pas né en un seul moment. L’entreprise est le résultat de plusieurs chapitres — la musique, la réalisation, la croissance, les erreurs, une pause et un retour avec une vision plus claire de ce que l’entreprise devait devenir."
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
                  en="Music was the first language. From a childhood choir to rap, mixtapes, beatmaking and recording sessions, Kevin spent his early years learning how songs were built and how artists shaped identity. Before directing anyone on camera, he understood what it felt like to be the artist trying to be heard."
                  fr="La musique a été le premier langage. D’une chorale durant l’enfance au rap, aux mixtapes, à la production de beats et aux sessions d’enregistrement, Kevin a passé ses premières années à comprendre comment une chanson se construit et comment un artiste développe son identité. Avant de diriger qui que ce soit devant une caméra, il savait ce que signifiait être l’artiste qui cherche à se faire entendre."
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
                  en="The turning point came from a simple question: what could help independent artists be taken seriously when nobody was coming to build the infrastructure for them? Inspired by the rise of street-level music-video platforms during YouTube’s early growth, Kevin decided to learn filmmaking himself and create a visual platform closer to home."
                  fr="Le déclic est venu d’une question simple : qu’est-ce qui pouvait aider les artistes indépendants à être pris au sérieux lorsque personne ne venait construire l’infrastructure pour eux? Inspiré par l’essor des plateformes de vidéoclips issues de la rue au début de YouTube, Kevin a décidé d’apprendre la réalisation lui-même et de créer une vitrine visuelle plus proche de chez lui."
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
                <Localized en="The first KSP era" fr="La première ère KSP" />
              </p>

              <h3>KSP FILMS</h3>

              <p>
                <Localized
                  en="One camera became hundreds of productions. KSP Films grew through volume, experimentation and proximity to the artists themselves. The channel became more than a portfolio: it helped introduce artists, document a generation of Montréal music and give emerging work a place to live visually. Kevin eventually stopped seeing himself as the rapper in front of the lens and committed fully to the work behind it."
                  fr="Une caméra est devenue des centaines de productions. KSP Films a grandi grâce au volume, à l’expérimentation et à la proximité avec les artistes eux-mêmes. La chaîne est devenue plus qu’un portfolio : elle a contribué à présenter des artistes, à documenter une génération de musique montréalaise et à donner une place visuelle aux projets émergents. Kevin a finalement cessé de se voir comme le rappeur devant l’objectif pour se consacrer pleinement au travail derrière celui-ci."
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
                  en="Demand eventually became bigger than one person could comfortably carry. Kevin expanded KSP into a team of shooters, editors and visual collaborators. The ambition made sense, but the business infrastructure had not caught up with the speed of the creative growth. Scaling exposed a hard lesson: being highly booked and building a sustainable company are not the same thing."
                  fr="La demande a fini par devenir trop importante pour une seule personne. Kevin a développé KSP en réunissant cadreurs, monteurs et collaborateurs visuels. L’ambition était logique, mais la structure d’entreprise n’avait pas encore rattrapé la vitesse de la croissance créative. Cette expansion a révélé une leçon essentielle : être très demandé et bâtir une entreprise durable ne sont pas la même chose."
                />
              </p>
            </div>

            <span className="studioTimelineDate">
              <Localized en="GROWTH" fr="CROISSANCE" />
            </span>
          </article>

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
                  en="After years of operating at full speed, Kevin stepped away from the industry and entered a period of personal and professional rebuilding. Projects slowed, the public presence disappeared and the name became quieter. Becoming a father changed the stakes. Returning was no longer about simply becoming visible again — it became about building something stronger, more deliberate and capable of lasting beyond one person."
                  fr="Après des années à fonctionner à pleine vitesse, Kevin s’est éloigné de l’industrie et est entré dans une période de reconstruction personnelle et professionnelle. Les projets ont ralenti, la présence publique a disparu et le nom est devenu plus silencieux. Devenir père a changé les enjeux. Revenir ne signifiait plus simplement redevenir visible — il s’agissait désormais de bâtir quelque chose de plus solide, plus réfléchi et capable d’exister au-delà d’une seule personne."
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
                  en="KSP Vision is the second version of the idea — broader than music videos and built with a longer horizon. KSP Films remains the artist-focused foundation, while weddings, brand films and documentary work extend the same storytelling instinct into new spaces. The goal is no longer simply to make the next project. It is to build a production company designed to keep evolving."
                  fr="KSP Vision est la deuxième version de l’idée — plus large que le vidéoclip et pensée sur le long terme. KSP Films demeure la fondation consacrée aux artistes, tandis que les mariages, les films de marque et le documentaire prolongent le même instinct narratif dans de nouveaux univers. L’objectif n’est plus simplement de réaliser le prochain projet. Il est de bâtir une société de production conçue pour continuer d’évoluer."
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
                en="Kevin’s relationship with image began through music. Raised around sound and introduced early to rap, beatmaking and recording, he spent years creating before filmmaking ever entered the picture. When he eventually picked up a camera, he brought that musical instinct with him — rhythm, performance, identity, energy and an understanding of what an artist needs from the person standing behind the lens."
                fr="La relation de Kevin avec l’image est née à travers la musique. Entouré de son dès son jeune âge et initié tôt au rap, à la production de beats et à l’enregistrement, il a passé des années à créer avant même que la réalisation entre dans sa vie. Lorsqu’il a finalement pris une caméra, il a apporté avec lui cet instinct musical — rythme, performance, identité, énergie et compréhension de ce dont un artiste a besoin de la personne derrière l’objectif."
              />
            </p>

            <p>
              <Localized
                en="He learned filmmaking outside the traditional route: through tutorials, repetition, difficult shoots, borrowed or hard-earned equipment, long edits and constant experimentation. The cameras changed. The scale changed. The instinct did not. Every project became another opportunity to understand how an image could make someone, something or some moment feel larger without losing what made it real."
                fr="Il a appris la réalisation en dehors du parcours traditionnel : tutoriels, répétition, tournages difficiles, équipement emprunté ou acquis à force de travail, longues nuits de montage et expérimentation constante. Les caméras ont changé. L’échelle a changé. L’instinct, lui, est resté. Chaque projet est devenu une nouvelle occasion de comprendre comment une image pouvait donner plus d’ampleur à une personne, une histoire ou un moment sans perdre ce qui le rendait vrai."
              />
            </p>

            <p>
              <Localized
                en="The first chapter proved what relentless work could build. The difficult years that followed proved what hustle alone could not sustain. That distinction now sits at the center of KSP Vision: creative ambition supported by stronger structure, clearer intention and a longer view of what the company can become."
                fr="Le premier chapitre a démontré ce qu’un travail acharné pouvait construire. Les années plus difficiles qui ont suivi ont démontré ce que le hustle, à lui seul, ne pouvait pas maintenir. Cette distinction se trouve aujourd’hui au cœur de KSP Vision : une ambition créative soutenue par une structure plus solide, une intention plus claire et une vision à plus long terme de ce que l’entreprise peut devenir."
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

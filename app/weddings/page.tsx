import { KSPPlayerLink } from "../ksp-player";
import { WeddingGallery } from "../wedding-gallery";
import { weddingPhotos } from "../../data/wedding-gallery";
import { Localized, SiteFooter, SiteHeader } from "../site-language";
import { WeddingReel } from "../wedding-reel";

const films = [
  { title: "Smith & Aureanne", youtubeId: "kCRAeRvvy4M" },
  { title: "Ralph & Evelyne", youtubeId: "uMIXszAhhdw" },
  { title: "Suffrard & Florence", youtubeId: "bpbGlC9mAX0" },
];

export default function WeddingsPage() {
  return <main className="detailPage weddingPage">
    <SiteHeader active="weddings" />
    <section className="weddingIntro"><div><p className="kicker">WEDDING FILMS</p><h1><Localized en="More than a day." fr="Plus qu’une journée." /><br/><em><Localized en="A feeling, preserved." fr="Une émotion, préservée." /></em></h1><p><Localized en="Honest, elegant films for the moments you will want to return to." fr="Des films élégants et sincères, pour les moments auxquels vous voudrez revenir." /></p><a className="button gold" href="/booking"><Localized en="Tell us about your day" fr="Parlez-nous de votre journée" /> <b>↗</b></a></div><img src="/weddings/wedding-garden-wide.jpg" alt="Smith and Aureanne with their wedding party" /></section>
    <section className="weddingFilms" id="weddingStoriesFinal"><div className="weddingSectionHead"><div><p className="kicker"><Localized en="Selected celebrations" fr="Célébrations sélectionnées" /></p><h2 id="weddingStoriesTitle"><Localized en="Wedding stories" fr="Histoires de mariage" /></h2></div><p><Localized en="Honest moments. Lasting images. Films made to bring you back." fr="Des moments vrais. Des images qui restent. Des films qui vous y ramènent." /></p></div>
      <article className="weddingReel"><WeddingReel /><div><p>WEDDING REEL</p><span><Localized en="KSP WEDDING FILMS" fr="Une sélection de moments" /></span></div></article>

<div id="weddingStoriesList" className="weddingStoryList">
  {films.map((film, index) => (
    <article
      className={`weddingStoryRow ${index === 1 ? "weddingStoryReverse" : ""}`}
      key={film.title}
    >
      <KSPPlayerLink className="weddingStoryFilm" video={{sourceType:"youtube", source:film.youtubeId, title:film.title}}>
        <div className="publishedFilmStill">
          <img
            src={`https://img.youtube.com/vi/${film.youtubeId}/hqdefault.jpg`}
            alt={film.title}
          />
          <span>
            <Localized en="Watch film" fr="Voir le film" /> ↗
          </span>
        </div>
      </KSPPlayerLink>

      <div className="weddingStoryCopy">
        <span className="weddingStoryNumber">
          {String(index + 1).padStart(2, "0")}
        </span>

        <h3><KSPPlayerLink video={{sourceType:"youtube", source:film.youtubeId, title:film.title}}>{film.title}</KSPPlayerLink></h3>

        <p>
          {film.title === "Smith & Aureanne"
            ? "A love story rooted in friendship and growing up together. What began long before the wedding day becomes an intimate celebration of trust, history, family and the life they continue building side by side."
            : film.title === "Ralph & Evelyne"
            ? "A childhood love story carried into a new chapter. Their wedding feels warm and deeply personal, shaped by shared memories, familiarity and a connection that has grown with them through the years."
            : "More than fifty years of marriage, celebrated all over again. Their renewal becomes a portrait of legacy, family and endurance, honoring a lifetime together while opening one more beautiful chapter."}
        </p>

        <KSPPlayerLink className="weddingStoryLink" video={{sourceType:"youtube", source:film.youtubeId, title:film.title}}>
          <Localized en="Watch their story" fr="Voir leur histoire" /> ↗
        </KSPPlayerLink>
      </div>
    </article>
  ))}
</div>

</section>


<section id="weddingGalleryFinal" className="weddingGallery">
  <div className="weddingSectionHead">
    <div>
      <p className="kicker">
        <Localized en="In the details" fr="Dans les détails" />
      </p>
      <h2>
        <Localized en="Moments, preserved" fr="Moments préservés" />
      </h2>
    </div>
  </div>

  <WeddingGallery photos={weddingPhotos} />
</section>

<section className="makeupArtists" aria-labelledby="makeup-heading"><div className="weddingSectionHead"><div><p className="kicker"><Localized en="Wedding beauty" fr="Beauté mariage" /></p><h2 id="makeup-heading">MAKEUP ARTISTS</h2></div><p><Localized en="Discover trusted beauty artists for weddings, celebrations and on-camera work." fr="Découvrez des artistes beauté de confiance pour les mariages, célébrations et projets caméra." /></p></div><a className="makeupArtistCard" href="/mira"><img src="/mira/final/mira-working.jpg" alt="Mira applying bridal makeup"/><div><p>BRIDAL + EVENT MAKEUP · MONTRÉAL</p><h3>MIRA</h3><span><Localized en="View artist, transformation and gallery" fr="Voir l’artiste, les transformations et la galerie" /> ↗</span></div></a></section>
    <section className="weddingCta"><p className="kicker"><Localized en="Now booking" fr="Réservations ouvertes" /></p><h2><Localized en="Your story deserves" fr="Votre histoire mérite" /><br/><em><Localized en="to feel like yours." fr="de vous ressembler." /></em></h2><a className="button gold" href="/booking"><Localized en="Check availability" fr="Vérifier les disponibilités" /> <b>↗</b></a></section>

<style>{`
/* ========================================================
   WEDDING — FINAL VISUAL POLISH
   ======================================================== */

/* Smaller, centered Wedding Stories presentation */
#weddingStoriesTitle{
  font-size:clamp(2.15rem,4vw,3rem) !important;
  line-height:.92 !important;
  letter-spacing:-.045em !important;
  max-width:520px !important;
  margin:.25rem auto .8rem !important;
  text-align:center !important;
}

#weddingStoriesTitle + p{
  max-width:430px !important;
  margin:0 auto !important;
  text-align:center !important;
  line-height:1.5 !important;
}

/* Slightly tighter project rhythm — preserve alternating layout */
#weddingStoriesList{
  gap:0 !important;
  row-gap:0 !important;
}

#weddingStoriesList .weddingStoryRow{
  min-height:0 !important;
  height:auto !important;
  margin:0 !important;
  padding:2.35rem 0 !important;
}

#weddingStoriesList .weddingStoryRow + .weddingStoryRow{
  margin-top:.75rem !important;
}

/* ========================================================
   LARGE EDITORIAL WEDDING GALLERY
   Mira-inspired scale — NOT tiny thumbnails
   ======================================================== */

#weddingGalleryFinal{
  padding-top:3.4rem !important;
  padding-bottom:4rem !important;
}

#weddingGalleryFinal .weddingSectionHead{
  margin-bottom:1.8rem !important;
}

#weddingGalleryFinal .galleryGrid{
  display:block !important;

  columns:4 !important;
  column-gap:12px !important;

  width:100% !important;
  max-width:none !important;

  margin:0 !important;
  padding:0 !important;
}

#weddingGalleryFinal .galleryItem{
  display:block !important;

  width:100% !important;
  height:auto !important;
  min-height:0 !important;
  max-height:none !important;

  aspect-ratio:auto !important;

  margin:0 0 12px !important;
  padding:0 !important;

  break-inside:avoid !important;
  page-break-inside:avoid !important;

  overflow:hidden !important;

  grid-column:auto !important;
  grid-row:auto !important;
}

#weddingGalleryFinal .galleryItem img{
  display:block !important;

  width:100% !important;
  height:auto !important;

  min-width:100% !important;
  max-width:100% !important;

  min-height:0 !important;
  max-height:none !important;

  aspect-ratio:auto !important;
  object-fit:cover !important;

  margin:0 !important;
  padding:0 !important;

  transform:none !important;
}

/* Give a few frames stronger editorial presence */
#weddingGalleryFinal .galleryItem:nth-child(1) img,
#weddingGalleryFinal .galleryItem:nth-child(5) img,
#weddingGalleryFinal .galleryItem:nth-child(9) img{
  min-height:310px !important;
  object-fit:cover !important;
}

@media(max-width:900px){
  #weddingGalleryFinal .galleryGrid{
    columns:3 !important;
  }
}

@media(max-width:650px){
  #weddingStoriesTitle{
    font-size:2.15rem !important;
  }

  #weddingStoriesList .weddingStoryRow{
    padding:1.8rem 0 !important;
  }

  #weddingGalleryFinal .galleryGrid{
    columns:2 !important;
    column-gap:8px !important;
  }

  #weddingGalleryFinal .galleryItem{
    margin-bottom:8px !important;
  }
}
`}</style>


<style>{`
/* =========================================================
   WEDDINGS — FINAL VISUAL CLEANUP
   ONLY Wedding page
   ========================================================= */

/* ---------- Wedding Stories centered + balanced ---------- */

#weddingStoriesTitle{
  font-size:clamp(2rem,3.4vw,2.8rem) !important;
  line-height:.92 !important;
  letter-spacing:-.045em !important;
  text-align:center !important;
  margin:.2rem auto .7rem !important;
  max-width:460px !important;
}

#weddingStoriesTitle + p{
  display:block !important;
  width:100% !important;
  max-width:430px !important;
  margin:0 auto 1.6rem !important;
  text-align:center !important;
  line-height:1.5 !important;
}

/* ---------- Slightly tighter story spacing ---------- */

#weddingStoriesList{
  display:flex !important;
  flex-direction:column !important;
  gap:0 !important;
}

#weddingStoriesList .weddingStoryRow{
  min-height:0 !important;
  height:auto !important;
  margin:0 !important;
  padding:1.9rem 0 !important;
}

#weddingStoriesList .weddingStoryRow + .weddingStoryRow{
  margin-top:.35rem !important;
}

/* =========================================================
   FIX THE BUGGED TINY GALLERY
   Completely neutralize the old skinny-thumbnail rules
   ========================================================= */

#weddingGalleryFinal{
  display:block !important;
  width:100% !important;
  max-width:1120px !important;
  margin:0 auto !important;
  padding:3.6rem 0 4rem !important;
}

#weddingGalleryFinal .weddingSectionHead{
  width:100% !important;
  max-width:none !important;
  margin:0 0 1.7rem !important;
}

/* Critical reset */
#weddingGalleryFinal .galleryGrid{
  display:grid !important;
  grid-template-columns:repeat(4,minmax(0,1fr)) !important;
  gap:12px !important;

  width:100% !important;
  max-width:none !important;

  height:auto !important;
  min-height:0 !important;

  margin:0 !important;
  padding:0 !important;

  overflow:visible !important;
}

/* Kill all inherited tiny/skinny sizing */
#weddingGalleryFinal .galleryItem{
  position:relative !important;

  display:block !important;

  width:100% !important;
  max-width:none !important;

  height:auto !important;
  min-height:260px !important;
  max-height:none !important;

  aspect-ratio:auto !important;

  margin:0 !important;
  padding:0 !important;

  grid-column:auto !important;
  grid-row:auto !important;

  overflow:hidden !important;
}

/* Large editorial rhythm, Mira-style */
#weddingGalleryFinal .galleryItem:nth-child(1),
#weddingGalleryFinal .galleryItem:nth-child(4),
#weddingGalleryFinal .galleryItem:nth-child(7),
#weddingGalleryFinal .galleryItem:nth-child(10){
  min-height:420px !important;
}

#weddingGalleryFinal .galleryItem:nth-child(2),
#weddingGalleryFinal .galleryItem:nth-child(5),
#weddingGalleryFinal .galleryItem:nth-child(8),
#weddingGalleryFinal .galleryItem:nth-child(11){
  min-height:320px !important;
}

#weddingGalleryFinal .galleryItem:nth-child(3),
#weddingGalleryFinal .galleryItem:nth-child(6),
#weddingGalleryFinal .galleryItem:nth-child(9),
#weddingGalleryFinal .galleryItem:nth-child(12){
  min-height:370px !important;
}

#weddingGalleryFinal .galleryItem img{
  position:absolute !important;
  inset:0 !important;

  display:block !important;

  width:100% !important;
  height:100% !important;

  min-width:100% !important;
  min-height:100% !important;
  max-width:none !important;
  max-height:none !important;

  object-fit:cover !important;
  object-position:center !important;

  margin:0 !important;
  padding:0 !important;

  transform:none !important;
}

/* =========================================================
   HERO IMAGE — keep top/bottom fade + add left/right fade
   slightly stronger on viewer's left
   ========================================================= */

.weddingIntro .weddingFilmStill,
.weddingIntro .weddingFilmStill img{
  -webkit-mask-image:
    linear-gradient(to right,
      transparent 0%,
      rgba(0,0,0,.52) 8%,
      #000 18%,
      #000 88%,
      rgba(0,0,0,.72) 95%,
      transparent 100%
    ),
    linear-gradient(to bottom,
      transparent 0%,
      #000 12%,
      #000 86%,
      transparent 100%
    ) !important;

  mask-image:
    linear-gradient(to right,
      transparent 0%,
      rgba(0,0,0,.52) 8%,
      #000 18%,
      #000 88%,
      rgba(0,0,0,.72) 95%,
      transparent 100%
    ),
    linear-gradient(to bottom,
      transparent 0%,
      #000 12%,
      #000 86%,
      transparent 100%
    ) !important;

  -webkit-mask-composite:source-in !important;
  mask-composite:intersect !important;
}

@media(max-width:900px){
  #weddingGalleryFinal .galleryGrid{
    grid-template-columns:repeat(3,minmax(0,1fr)) !important;
  }
}

@media(max-width:650px){
  #weddingGalleryFinal .galleryGrid{
    grid-template-columns:repeat(2,minmax(0,1fr)) !important;
    gap:8px !important;
  }

  #weddingGalleryFinal .galleryItem,
  #weddingGalleryFinal .galleryItem:nth-child(n){
    min-height:230px !important;
  }
}
`}</style>

<style>{`
/* KSP WEDDING FINAL FIX START */

/* ---------------------------------------------------------
   SELECTED CELEBRATIONS / WEDDING STORIES
   one centered symmetrical block
   --------------------------------------------------------- */

#weddingStoriesFinal{
  padding-top:3.2rem !important;
}

#weddingStoriesFinal > .weddingSectionHead{
  display:flex !important;
  flex-direction:column !important;
  justify-content:center !important;
  align-items:center !important;

  width:100% !important;
  max-width:720px !important;

  margin:0 auto 1.7rem !important;
  padding:0 !important;

  text-align:center !important;
}

#weddingStoriesFinal > .weddingSectionHead > div{
  display:flex !important;
  flex-direction:column !important;
  align-items:center !important;

  width:100% !important;
  max-width:720px !important;

  margin:0 auto !important;
  padding:0 !important;

  text-align:center !important;
}

#weddingStoriesFinal .kicker{
  width:100% !important;
  margin:0 0 .65rem !important;
  text-align:center !important;
}

#weddingStoriesFinal .weddingSectionHead h2{
  width:100% !important;
  max-width:520px !important;

  margin:0 auto .75rem !important;

  font-size:clamp(2rem,3.3vw,3rem) !important;
  line-height:.92 !important;
  letter-spacing:-.045em !important;

  text-align:center !important;
}

#weddingStoriesFinal .weddingSectionHead p:not(.kicker){
  width:100% !important;
  max-width:500px !important;

  margin:0 auto !important;

  text-align:center !important;
  line-height:1.55 !important;
}

/* Keep reel directly beneath centered heading */
#weddingStoriesFinal .weddingReel{
  margin-top:0 !important;
}


/* ---------------------------------------------------------
   WEDDING GALLERY
   big editorial layout — NO OVERLAP
   --------------------------------------------------------- */

#weddingGalleryFinal{
  position:relative !important;

  display:block !important;

  width:min(1120px,88vw) !important;
  max-width:1120px !important;

  height:auto !important;
  min-height:0 !important;

  margin:0 auto !important;
  padding:3.7rem 0 4.5rem !important;

  overflow:visible !important;
  clear:both !important;
}

#weddingGalleryFinal .weddingSectionHead{
  position:relative !important;

  display:block !important;

  width:100% !important;

  height:auto !important;

  margin:0 0 1.8rem !important;
  padding:0 !important;

  transform:none !important;
}

#weddingGalleryFinal .weddingGalleryGrid{
  position:relative !important;

  display:grid !important;

  grid-template-columns:repeat(4,minmax(0,1fr)) !important;
  grid-auto-flow:row !important;
  grid-auto-rows:auto !important;

  column-count:initial !important;
  columns:initial !important;

  gap:12px !important;

  width:100% !important;
  max-width:none !important;

  height:auto !important;
  min-height:0 !important;

  margin:0 !important;
  padding:0 !important;

  overflow:visible !important;
}

/* CRITICAL:
   neutralize old positioning that caused overlapping */
#weddingGalleryFinal .weddingGalleryLink,
#weddingGalleryFinal .weddingGalleryItem{
  position:relative !important;

  top:auto !important;
  right:auto !important;
  bottom:auto !important;
  left:auto !important;

  display:block !important;

  float:none !important;
  clear:none !important;

  grid-column:auto !important;
  grid-row:auto !important;

  width:100% !important;
  max-width:none !important;

  height:auto !important;
  max-height:none !important;

  min-height:300px !important;

  margin:0 !important;
  padding:0 !important;

  transform:none !important;

  overflow:hidden !important;

  text-decoration:none !important;
  cursor:pointer !important;
}

/* Editorial variation */
#weddingGalleryFinal .item1,
#weddingGalleryFinal .item4,
#weddingGalleryFinal .item7,
#weddingGalleryFinal .item10{
  min-height:430px !important;
}

#weddingGalleryFinal .item2,
#weddingGalleryFinal .item5,
#weddingGalleryFinal .item8,
#weddingGalleryFinal .item11{
  min-height:340px !important;
}

#weddingGalleryFinal .item3,
#weddingGalleryFinal .item6,
#weddingGalleryFinal .item9,
#weddingGalleryFinal .item12{
  min-height:385px !important;
}

#weddingGalleryFinal .weddingGalleryLink img{
  position:absolute !important;

  inset:0 !important;

  display:block !important;

  width:100% !important;
  height:100% !important;

  min-width:0 !important;
  min-height:0 !important;
  max-width:none !important;
  max-height:none !important;

  margin:0 !important;
  padding:0 !important;

  object-fit:cover !important;
  object-position:center !important;

  transform:none !important;

  transition:transform .35s ease, opacity .35s ease !important;
}

#weddingGalleryFinal .weddingGalleryLink:hover img{
  transform:scale(1.025) !important;
}


/* ---------------------------------------------------------
   HERO PHOTO — keep vertical fade and feather sides
   stronger on viewer's left
   --------------------------------------------------------- */

.weddingIntro img{
  -webkit-mask-image:
    linear-gradient(
      to right,
      transparent 0%,
      rgba(0,0,0,.35) 5%,
      rgba(0,0,0,.78) 12%,
      #000 21%,
      #000 90%,
      rgba(0,0,0,.72) 96%,
      transparent 100%
    ),
    linear-gradient(
      to bottom,
      transparent 0%,
      #000 10%,
      #000 88%,
      transparent 100%
    ) !important;

  mask-image:
    linear-gradient(
      to right,
      transparent 0%,
      rgba(0,0,0,.35) 5%,
      rgba(0,0,0,.78) 12%,
      #000 21%,
      #000 90%,
      rgba(0,0,0,.72) 96%,
      transparent 100%
    ),
    linear-gradient(
      to bottom,
      transparent 0%,
      #000 10%,
      #000 88%,
      transparent 100%
    ) !important;

  -webkit-mask-composite:source-in !important;
  mask-composite:intersect !important;
}


/* ---------------------------------------------------------
   responsive gallery
   --------------------------------------------------------- */

@media(max-width:900px){
  #weddingGalleryFinal .weddingGalleryGrid{
    grid-template-columns:repeat(3,minmax(0,1fr)) !important;
  }
}

@media(max-width:650px){
  #weddingGalleryFinal{
    width:90vw !important;
  }

  #weddingGalleryFinal .weddingGalleryGrid{
    grid-template-columns:repeat(2,minmax(0,1fr)) !important;
    gap:8px !important;
  }

  #weddingGalleryFinal .weddingGalleryLink{
    min-height:240px !important;
  }

  #weddingGalleryFinal .item1,
  #weddingGalleryFinal .item2,
  #weddingGalleryFinal .item3,
  #weddingGalleryFinal .item4,
  #weddingGalleryFinal .item5,
  #weddingGalleryFinal .item6,
  #weddingGalleryFinal .item7,
  #weddingGalleryFinal .item8,
  #weddingGalleryFinal .item9,
  #weddingGalleryFinal .item10,
  #weddingGalleryFinal .item11,
  #weddingGalleryFinal .item12{
    min-height:240px !important;
  }
}

/* KSP WEDDING FINAL FIX END */
`}</style>

<SiteFooter />

<style>{`
/* KSP final wedding composition */
.weddingVideoGrid{
  display:grid !important;
  grid-template-columns:repeat(2,minmax(0,1fr)) !important;
  gap:2.4rem 1.4rem !important;
  align-items:start;
}

/* Smith top-left / Suffrard top-right / Ralph bottom-center */
.weddingVideoGrid > :nth-child(1){
  grid-column:1 !important;
  grid-row:1 !important;
}
.weddingVideoGrid > :nth-child(3){
  grid-column:2 !important;
  grid-row:1 !important;
}
.weddingVideoGrid > :nth-child(2){
  grid-column:1 / -1 !important;
  grid-row:2 !important;
  width:58% !important;
  justify-self:center !important;
}

/* Integrate the large wedding hero visual into the black page */
.detailHero img,
.detailHero video{
  border:0 !important;
}

.weddingIntro img,
.weddingIntro video{
  display:block;
  width:100%;
  -webkit-mask-image:linear-gradient(
    to bottom,
    transparent 0%,
    #000 5%,
    #000 91%,
    transparent 100%
  );
  mask-image:linear-gradient(
    to bottom,
    transparent 0%,
    #000 5%,
    #000 91%,
    transparent 100%
  );
}

@media(max-width:800px){
  .weddingVideoGrid{
    grid-template-columns:1fr !important;
  }
  .weddingVideoGrid > :nth-child(1),
  .weddingVideoGrid > :nth-child(2),
  .weddingVideoGrid > :nth-child(3){
    grid-column:1 !important;
    grid-row:auto !important;
    width:100% !important;
  }
}
`}</style>

<style>{`
/* FINAL WEDDING GALLERY POLISH */
.weddingVideoGrid{
  margin-bottom:70px !important;
}

.weddingGallery,
.galleryGrid{
  gap:10px !important;
}

.weddingGallery img,
.galleryGrid img{
  width:100% !important;
  height:100% !important;
  object-fit:cover !important;
  display:block !important;
}
`}</style>

<style>{`
/* FINAL WEDDING STORY PRESENTATION */

/* ========================================================
   WEDDING STORIES. editorial, not pyramid
   ======================================================== */

.weddingFilms{
    padding-bottom:clamp(5rem,9vw,8rem) !important;
}

.weddingFilms .weddingSectionHead{
    margin-bottom:clamp(2.5rem,5vw,4.5rem) !important;
}

.weddingFilms .weddingSectionHead h2{
    font-size:clamp(3.4rem,7vw,7.2rem) !important;
    line-height:.84 !important;
    letter-spacing:-.06em !important;
}

.weddingStoryList{
    display:flex;
    flex-direction:column;
    gap:clamp(4.5rem,9vw,8rem);
}

.weddingStoryRow{
    display:grid;
    grid-template-columns:minmax(0,1.45fr) minmax(260px,.7fr);
    gap:clamp(2.2rem,6vw,6rem);
    align-items:center;
}

.weddingStoryReverse{
    grid-template-columns:minmax(260px,.7fr) minmax(0,1.45fr);
}

.weddingStoryReverse .weddingStoryFilm{
    grid-column:2;
    grid-row:1;
}

.weddingStoryReverse .weddingStoryCopy{
    grid-column:1;
    grid-row:1;
}

.weddingStoryFilm{
    display:block;
    min-width:0;
}

.weddingStoryFilm .publishedFilmStill{
    width:100%;
    background:#050505;
    overflow:hidden;
    border:1px solid rgba(255,255,255,.13);
}

.weddingStoryFilm img{
    width:100%;
    display:block;
    aspect-ratio:16/9;
    object-fit:cover;
}

.weddingStoryCopy{
    position:relative;
    max-width:31rem;
}

.weddingStoryNumber{
    display:block;
    margin-bottom:1rem;
    color:#b89a55;
    font-size:.61rem;
    font-weight:700;
    letter-spacing:.22em;
}

.weddingStoryCopy h3{
    margin:0 0 1.25rem !important;
    color:#fff;
    font-size:clamp(2.1rem,4vw,4rem) !important;
    line-height:.91 !important;
    letter-spacing:-.052em !important;
    text-transform:uppercase;
}

.weddingStoryCopy p{
    margin:0 0 1.6rem;
    max-width:29rem;
    color:rgba(255,255,255,.62);
    font-size:clamp(.92rem,1.2vw,1.04rem);
    line-height:1.75;
}

.weddingStoryLink{
    display:inline-block;
    color:#fff;
    font-size:.67rem;
    font-weight:700;
    letter-spacing:.15em;
    text-transform:uppercase;
    border-bottom:1px solid rgba(184,154,85,.65);
    padding-bottom:.35rem;
}

/*
 IMPORTANT:
 No gallery layout rules here.

 We deliberately removed our last FINAL WEDDING EDITORIAL
 gallery experiment so the PREVIOUS clean gallery returns.
*/

@media(max-width:800px){
    .weddingFilms .weddingSectionHead h2{
        font-size:clamp(3rem,14vw,5rem) !important;
    }

    .weddingStoryList{
        gap:4.5rem;
    }

    .weddingStoryRow,
    .weddingStoryReverse{
        grid-template-columns:1fr !important;
        gap:1.8rem !important;
    }

    .weddingStoryReverse .weddingStoryFilm,
    .weddingStoryReverse .weddingStoryCopy{
        grid-column:1 !important;
        grid-row:auto !important;
    }

    .weddingStoryCopy{
        max-width:none;
    }
}

`}</style>


<style>{`
/* FINAL WEDDING MICRO POLISH */

/* Main reel -> stories transition */
.weddingStoryList{
    position:relative !important;
    margin-top:clamp(5rem,8vw,7rem) !important;
    padding-top:clamp(4rem,6vw,5rem) !important;
    border-top:1px solid rgba(255,255,255,.16) !important;
}

.weddingStoryList::before{
    content:"FEATURED FILMS";
    position:absolute;
    left:0;
    top:-.45rem;
    padding-right:1.25rem;
    background:#050505;
    color:#b89a55;
    font-size:.58rem;
    font-weight:700;
    letter-spacing:.24em;
}

.weddingStoryRow{
    gap:clamp(2rem,4vw,4rem) !important;
    margin-bottom:clamp(5rem,8vw,7rem) !important;
}

.weddingStoryCopy h2,
.weddingStoryCopy h3{
    font-size:clamp(2.6rem,5vw,5.2rem) !important;
    line-height:.90 !important;
    letter-spacing:-.045em !important;
}

.weddingStoryCopy p{
    max-width:32rem !important;
    line-height:1.70 !important;
    font-size:clamp(.95rem,1.15vw,1.08rem) !important;
}

/* Restore a normal editorial gallery */
.weddingGallery{
    margin-top:clamp(4rem,7vw,6rem) !important;
}

.galleryGrid{
    display:grid !important;
    grid-template-columns:repeat(3,minmax(0,1fr)) !important;
    gap:12px !important;
    align-items:start !important;
}

.galleryItem{
    width:100% !important;
    height:auto !important;
    margin:0 !important;
    transform:none !important;
}

.galleryItem img{
    display:block !important;
    width:100% !important;
    height:auto !important;
    object-fit:cover !important;
}

@media(max-width:800px){
    .galleryGrid{
        grid-template-columns:repeat(2,minmax(0,1fr)) !important;
    }

    .weddingStoryList{
        margin-top:4rem !important;
        padding-top:3.5rem !important;
    }
}

`}</style>


<style>{`
/* FINAL CONDENSED WEDDING RHYTHM */

.weddingStoryList{
    margin-top:3.6rem !important;
    padding-top:3rem !important;
}

.weddingStoryRow{
    min-height:0 !important;
    margin:0 !important;
    padding:2.7rem 0 !important;
    gap:clamp(2rem,4vw,3.5rem) !important;
}

.weddingStoryRow + .weddingStoryRow{
    margin-top:0 !important;
}

.weddingStoryMedia,
.weddingStoryCopy{
    align-self:center !important;
}

.weddingStoryCopy{
    padding:0 !important;
}

.weddingStoryCopy p{
    margin-top:1rem !important;
    margin-bottom:1.15rem !important;
    line-height:1.62 !important;
}

.weddingStoryCopy h2,
.weddingStoryCopy h3{
    margin-bottom:.9rem !important;
}

.weddingGallery{
    margin-top:3.8rem !important;
    padding-top:3rem !important;
}

.galleryGrid{
    gap:12px !important;
}

.galleryItem{
    height:260px !important;
    overflow:hidden !important;
}

.galleryItem img{
    width:100% !important;
    height:100% !important;
    object-fit:cover !important;
}

@media(max-width:800px){
    .weddingStoryRow{
        padding:2rem 0 !important;
    }

    .galleryItem{
        height:190px !important;
    }
}

`}</style>


<style>{`
/* FINAL CONDENSED WEDDING LOCK */

/* Reel to stories transition */
.weddingStoryList{
    margin-top:3.2rem !important;
    padding-top:2.8rem !important;
}

/* Condense the three stories HARD */
.weddingStoryRow{
    min-height:0 !important;
    margin:0 !important;
    padding:2.4rem 0 !important;
    gap:clamp(1.8rem,4vw,3.8rem) !important;
    align-items:center !important;
}

.weddingStoryRow + .weddingStoryRow{
    margin-top:0 !important;
}

/* Keep media compact */
.weddingStoryRow .brandFilm,
.weddingStoryRow video,
.weddingStoryRow img{
    max-height:330px !important;
}

/* Copy tighter without looking cramped */
.weddingStoryCopy{
    padding:0 !important;
}

.weddingStoryCopy h2,
.weddingStoryCopy h3{
    margin-bottom:.85rem !important;
}

.weddingStoryCopy p{
    margin-bottom:1rem !important;
    line-height:1.62 !important;
}

/* Gallery begins closer to stories */
.weddingGallery{
    margin-top:3rem !important;
    padding-top:2.4rem !important;
}

/* Uniform gallery */
.galleryGrid{
    display:grid !important;
    grid-template-columns:repeat(3,minmax(0,1fr)) !important;
    gap:10px !important;
    align-items:stretch !important;
}

.galleryItem{
    position:relative !important;
    width:100% !important;
    height:auto !important;
    aspect-ratio:4/3 !important;
    margin:0 !important;
    padding:0 !important;
    transform:none !important;
    overflow:hidden !important;
}

.galleryItem img{
    display:block !important;
    width:100% !important;
    height:100% !important;
    min-width:100% !important;
    min-height:100% !important;
    max-width:none !important;
    max-height:none !important;
    object-fit:cover !important;
    margin:0 !important;
}

/* Destroy leftover experimental skinny-column sizing */
.galleryGrid > *,
.galleryItem:nth-child(n){
    grid-column:auto !important;
    grid-row:auto !important;
}

@media(max-width:800px){
    .weddingStoryRow{
        padding:2rem 0 !important;
    }

    .galleryGrid{
        grid-template-columns:repeat(2,minmax(0,1fr)) !important;
    }
}

`}</style>


<style>{`
/* ABSOLUTE FINAL CONDENSED WEDDINGS */

/*
 Story rows should feel like one editorial sequence,
 not three separate full-screen pages.
*/
.weddingStoryList{
    margin-top:3rem !important;
    padding-top:3.5rem !important;
}

.weddingStoryRow{
    min-height:0 !important;
    height:auto !important;

    margin:0 !important;
    padding:2.8rem 0 !important;

    gap:clamp(2rem,4vw,4rem) !important;
    align-items:center !important;
}

/* specifically kill inherited giant vertical margins */
.weddingStoryRow + .weddingStoryRow{
    margin-top:0 !important;
}

.weddingStoryRow > *{
    margin-top:0 !important;
    margin-bottom:0 !important;
}

.weddingStoryRow .brandFilm,
.weddingStoryRow video,
.weddingStoryRow img{
    margin:0 !important;
}

.weddingStoryCopy{
    margin:0 !important;
    padding:0 !important;
}

.weddingStoryCopy p{
    margin-top:1rem !important;
    margin-bottom:1.15rem !important;
}

/* Gallery = consistent editorial tiles */
.galleryGrid,
.weddingGallery .galleryGrid{
    display:grid !important;
    grid-template-columns:repeat(3,minmax(0,1fr)) !important;
    gap:10px !important;
    align-items:stretch !important;
}

.galleryItem,
.galleryGrid > *{
    width:100% !important;
    min-width:0 !important;
    height:auto !important;

    margin:0 !important;
    padding:0 !important;
    transform:none !important;

    grid-column:auto !important;
    grid-row:auto !important;

    overflow:hidden !important;
}

.galleryItem img,
.galleryGrid > * img{
    display:block !important;
    width:100% !important;
    height:240px !important;

    min-width:100% !important;
    min-height:240px !important;
    max-width:none !important;
    max-height:none !important;

    object-fit:cover !important;
    margin:0 !important;
}

/*
 Current first gallery image is the large hero-like tile.
 Keep it elegant but stop it from forcing the rest tiny.
*/
.galleryGrid > *:first-child{
    grid-column:span 2 !important;
}

.galleryGrid > *:first-child img{
    height:340px !important;
}

/* Immediately following two balance it */
.galleryGrid > *:nth-child(2),
.galleryGrid > *:nth-child(3){
    align-self:stretch !important;
}

@media(max-width:800px){
    .weddingStoryRow{
        padding:2rem 0 !important;
    }

    .galleryGrid,
    .weddingGallery .galleryGrid{
        grid-template-columns:repeat(2,minmax(0,1fr)) !important;
    }

    .galleryGrid > *:first-child{
        grid-column:span 2 !important;
    }

    .galleryItem img,
    .galleryGrid > * img{
        height:190px !important;
        min-height:190px !important;
    }

    .galleryGrid > *:first-child img{
        height:260px !important;
    }
}

`}</style>


<style>{`
/* TRUE FINAL WEDDING RHYTHM 2026 */

/*
 Kill the accumulated 100vh/min-height experiments.
 The row itself should only be as tall as its content.
*/
.weddingStoryList{
    display:flex !important;
    flex-direction:column !important;
    gap:clamp(3.25rem,5vw,4.75rem) !important;

    margin-top:clamp(4rem,6vw,5.5rem) !important;
    padding-top:clamp(3rem,4.5vw,4rem) !important;
}

.weddingStoryRow{
    display:grid !important;
    grid-template-columns:minmax(0,1fr) minmax(0,.78fr) !important;
    align-items:center !important;

    min-height:0 !important;
    height:auto !important;
    max-height:none !important;

    margin:0 !important;
    padding:0 !important;

    gap:clamp(2.2rem,4vw,4rem) !important;
}

.weddingStoryRow + .weddingStoryRow{
    margin-top:0 !important;
    padding-top:0 !important;
}

.weddingStoryRow:nth-child(even){
    grid-template-columns:minmax(0,.78fr) minmax(0,1fr) !important;
}

.weddingStoryRow .brandFilm,
.weddingStoryRow video,
.weddingStoryRow img{
    margin:0 !important;
}

.weddingStoryCopy{
    margin:0 !important;
    padding:0 !important;
}

.weddingStoryCopy p{
    margin-top:1.1rem !important;
    margin-bottom:1.25rem !important;
    line-height:1.67 !important;
}

.weddingGallery{
    margin-top:clamp(4rem,6vw,5.5rem) !important;
    padding-top:0 !important;
}

.weddingGallery .galleryGrid,
.galleryGrid{
    display:grid !important;
    grid-template-columns:repeat(3,minmax(0,1fr)) !important;
    gap:12px !important;

    margin:0 !important;
    padding:0 !important;
    align-items:stretch !important;
}

.galleryItem{
    position:relative !important;
    width:100% !important;
    height:auto !important;
    aspect-ratio:4/3 !important;

    min-width:0 !important;
    min-height:0 !important;

    margin:0 !important;
    padding:0 !important;

    transform:none !important;
    overflow:hidden !important;
}

.galleryItem img{
    display:block !important;
    width:100% !important;
    height:100% !important;

    min-width:100% !important;
    min-height:100% !important;
    max-width:none !important;
    max-height:none !important;

    object-fit:cover !important;
    margin:0 !important;
    padding:0 !important;
}

/* destroy all old skinny-column placement */
.galleryGrid > *,
.galleryItem:nth-child(n){
    grid-column:auto !important;
    grid-row:auto !important;
}

@media(max-width:800px){
    .weddingStoryList{
        gap:3.5rem !important;
    }

    .weddingStoryRow,
    .weddingStoryRow:nth-child(even){
        grid-template-columns:1fr !important;
        gap:1.6rem !important;
    }

    .galleryGrid,
    .weddingGallery .galleryGrid{
        grid-template-columns:repeat(2,minmax(0,1fr)) !important;
    }
}

`}</style>


      <style>{`
        /* WEDDINGS ESTABLISHED EDITORIAL PASS */

        /*
          Direction:
          - cinematic black foundation
          - photographs carry the page
          - quieter typography
          - substantially larger story images
          - less dead vertical space
          - tighter image/text relationship
          - restrained champagne details
          - NO white/cream sections
        */

        .weddingPage {
          background:#080808 !important;
        }

        /* -----------------------------------
           GLOBAL WEDDING TONE
        ----------------------------------- */

        .weddingPage h1,
        .weddingPage h2,
        .weddingPage h3 {
          color:#f7f4ee !important;
        }

        .weddingPage .weddingSectionHead p,
        .weddingPage .weddingStoryCopy p {
          color:rgba(247,244,238,.70) !important;
        }

        .weddingPage .kicker,
        .weddingPage .weddingStoryNumber {
          color:#c4a065 !important;
        }


        /* -----------------------------------
           PHOTOGRAPHY — LIGHTER, NOT FILTERED
        ----------------------------------- */

        .weddingIntro img,
        .publishedFilmStill img,
        .weddingStoryMedia img,
        #weddingGalleryFinal img,
        #makeupArtists img {
          filter:
            brightness(1.065)
            contrast(.985)
            saturate(1.025) !important;
        }

        .weddingIntro img,
        .publishedFilmStill,
        .weddingStoryMedia {
          box-shadow:
            0 22px 54px rgba(0,0,0,.30),
            0 0 28px rgba(196,160,101,.025) !important;
        }


        /* -----------------------------------
           WEDDING STORIES — MAIN CHANGE
        ----------------------------------- */

        #weddingStoriesFinal {
          background:#080808 !important;
          padding-top:clamp(3.75rem,6vw,6rem) !important;
          padding-bottom:clamp(3.75rem,6vw,6rem) !important;
        }

        #weddingStoriesFinal .weddingStoryList {
          gap:clamp(3.25rem,5vw,4.75rem) !important;
        }

        /* Image gets the visual authority */
        #weddingStoriesFinal .weddingStoryRow {
          grid-template-columns:
            minmax(0,1.18fr)
            minmax(250px,.82fr) !important;

          gap:clamp(2rem,3.7vw,3.75rem) !important;
          align-items:center !important;

          margin:0 !important;
          padding-block:clamp(.6rem,1.5vw,1.25rem) !important;
        }

        /* Alternating story: large image remains large */
        #weddingStoriesFinal .weddingStoryReverse {
          grid-template-columns:
            minmax(250px,.82fr)
            minmax(0,1.18fr) !important;
        }

        #weddingStoriesFinal .weddingStoryMedia {
          width:100% !important;
          max-width:none !important;
          min-width:0 !important;
        }

        #weddingStoriesFinal .weddingStoryMedia img {
          width:100% !important;
          height:auto !important;
          display:block !important;
        }


        /* -----------------------------------
           STORY TYPOGRAPHY — QUIETER
        ----------------------------------- */

        #weddingStoriesFinal .weddingStoryCopy {
          background:transparent !important;
          border:0 !important;
          box-shadow:none !important;

          max-width:30rem !important;
          padding:0 !important;
        }

        #weddingStoriesFinal .weddingStoryCopy h2,
        #weddingStoriesFinal .weddingStoryCopy h3 {
          font-size:clamp(2.25rem,3.4vw,3.4rem) !important;
          line-height:.96 !important;
          letter-spacing:-.035em !important;
          font-weight:500 !important;
          margin-bottom:clamp(1rem,1.7vw,1.4rem) !important;
        }

        #weddingStoriesFinal .weddingStoryCopy p {
          font-size:clamp(.95rem,1.12vw,1.08rem) !important;
          line-height:1.58 !important;
          max-width:28rem !important;
        }

        #weddingStoriesFinal .weddingStoryNumber {
          font-size:.68rem !important;
          letter-spacing:.20em !important;
          margin-bottom:.75rem !important;
        }

        #weddingStoriesFinal .weddingStoryLink {
          margin-top:1.35rem !important;
          border-color:rgba(196,160,101,.52) !important;
        }


        /* -----------------------------------
           FEATURE / WEDDING REEL
        ----------------------------------- */

        #weddingStoriesFinal .publishedFilmStill {
          max-width:none !important;
        }

        #weddingStoriesFinal .publishedFilmStill img {
          width:100% !important;
          display:block !important;
        }


        /* -----------------------------------
           MOMENTS, PRESERVED
        ----------------------------------- */

        #weddingGalleryFinal {
          background:#080808 !important;

          padding-top:clamp(3.75rem,5.5vw,5.5rem) !important;
          padding-bottom:clamp(4rem,6vw,6rem) !important;
        }

        #weddingGalleryFinal .weddingGalleryGrid {
          gap:clamp(.55rem,1vw,1rem) !important;
        }

        #weddingGalleryFinal .weddingGalleryItem {
          box-shadow:0 16px 44px rgba(0,0,0,.24) !important;
        }

        #weddingGalleryFinal .weddingSectionHead {
          margin-bottom:clamp(2rem,3vw,3rem) !important;
        }


        /* -----------------------------------
           MAKEUP ARTISTS
        ----------------------------------- */

        #makeupArtists {
          background:#080808 !important;
          padding-top:clamp(4rem,6vw,6rem) !important;
          padding-bottom:clamp(4rem,6vw,6rem) !important;
        }

        #makeupArtists .makeupArtistCard {
          background:rgba(255,255,255,.015) !important;
          border-color:rgba(255,255,255,.07) !important;
        }


        /* -----------------------------------
           FINAL CTA
        ----------------------------------- */

        .weddingCta {
          background:#050505 !important;
          border-top:1px solid rgba(196,160,101,.13) !important;
        }

        .weddingPage .button.gold {
          border-color:rgba(196,160,101,.55) !important;
        }


        /* -----------------------------------
           MOBILE
        ----------------------------------- */

        @media (max-width:800px) {

          #weddingStoriesFinal {
            padding-top:3.25rem !important;
            padding-bottom:3.5rem !important;
          }

          #weddingStoriesFinal .weddingStoryList {
            gap:3.5rem !important;
          }

          #weddingStoriesFinal .weddingStoryRow,
          #weddingStoriesFinal .weddingStoryReverse {
            grid-template-columns:1fr !important;
            gap:1.4rem !important;
            padding-block:.35rem !important;
          }

          #weddingStoriesFinal .weddingStoryCopy {
            max-width:none !important;
          }

          #weddingStoriesFinal .weddingStoryCopy h2,
          #weddingStoriesFinal .weddingStoryCopy h3 {
            font-size:clamp(2.2rem,10vw,3rem) !important;
          }

          .weddingIntro img,
          .publishedFilmStill img,
          .weddingStoryMedia img,
          #weddingGalleryFinal img,
          #makeupArtists img {
            filter:
              brightness(1.055)
              contrast(.985)
              saturate(1.02) !important;
          }
        }
      `}</style>


      <style>{`
        /* WEDDINGS HERO-STORIES TIGHTENING */

        /* Pull Wedding Stories closer to the hero */
        .weddingIntro {
          margin-bottom: 0 !important;
          padding-bottom: clamp(1rem, 2vw, 1.75rem) !important;
        }

        .weddingIntro + #weddingStoriesFinal,
        #weddingStoriesFinal {
          margin-top: 0 !important;
          padding-top: clamp(1.75rem, 3vw, 2.75rem) !important;
        }

        #weddingStoriesFinal .weddingSectionHead {
          margin-top: 0 !important;
          margin-bottom: clamp(1.75rem, 2.8vw, 2.75rem) !important;
        }

        /* Reel → actual featured weddings:
           remove the old oversized empty transition */
        #weddingStoriesList {
          margin-top: clamp(2.25rem, 3.5vw, 3.5rem) !important;
          padding-top: clamp(1.75rem, 2.8vw, 2.75rem) !important;
        }

        @media (max-width: 800px) {
          .weddingIntro {
            padding-bottom: 1rem !important;
          }

          #weddingStoriesFinal {
            padding-top: 1.75rem !important;
          }

          #weddingStoriesList {
            margin-top: 2.25rem !important;
            padding-top: 1.75rem !important;
          }
        }
      `}</style>

</main>;
}

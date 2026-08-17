import { Localized, SiteFooter, SiteHeader } from "../site-language";
import { WeddingReel } from "../wedding-reel";

const films = [
  { title: "Smith & Aureanne", youtubeId: "kCRAeRvvy4M" },
  { title: "Ralph & Evelyne", youtubeId: "uMIXszAhhdw" },
  { title: "Suffrard & Florence", youtubeId: "bpbGlC9mAX0" },
];
const gallery = [
  ["/weddings/wedding-garden-wide.jpg", "Smith and Aureanne with their wedding party"],
  ["/weddings/smith-rings.jpg", "Smith and Aureanne exchanging rings"],
  ["/weddings/ralph-prep.jpg", "Wedding-day preparation"],
  ["/weddings/ralph-bride.jpg", "Bride portrait in the forest"],
  ["/weddings/suffrard-dress.jpg", "Wedding dress detail"],
  ["/weddings/ralph-dance.jpg", "Ralph and Evelyne celebration"],
  ["/weddings/suffrard-couple.jpg", "Suffrard and Florence together"],
  ["/weddings/ralph-veil.jpg", "Ralph & Evelyne wedding veil"],
  ["/weddings/smith-group.jpg", "Smith & Aureanne wedding group"],
  ["/weddings/smith-kiss.jpg", "Smith & Aureanne wedding kiss"],
  ["/weddings/smith-party.jpg", "Smith & Aureanne wedding celebration"],
  ["/weddings/wedding-garden-portrait.jpg", "Bride portrait in the garden"],
  ["/weddings/suffrard-ceremony.jpg", "Suffrard & Florence ceremony"],
];

export default function WeddingsPage() {
  return <main className="detailPage weddingPage">
    <SiteHeader active="weddings" />
    <section className="weddingIntro"><div><p className="kicker">WEDDING FILMS</p><h1><Localized en="More than a day." fr="Plus qu’une journée." /><br/><em><Localized en="A feeling, preserved." fr="Une émotion, préservée." /></em></h1><p><Localized en="Honest, elegant films for the moments you will want to return to." fr="Des films élégants et sincères, pour les moments auxquels vous voudrez revenir." /></p><a className="button gold" href="/booking"><Localized en="Tell us about your day" fr="Parlez-nous de votre journée" /> <b>↗</b></a></div><img src="/weddings/wedding-garden-wide.jpg" alt="Smith and Aureanne with their wedding party" /></section>
    <section className="weddingFilms"><div className="weddingSectionHead"><div><p className="kicker"><Localized en="Selected celebrations" fr="Célébrations sélectionnées" /></p><h2><Localized en="Wedding stories" fr="Histoires de mariage" /></h2></div><p><Localized en="A wedding reel, then three films to explore." fr="Un reel de mariage, puis trois films à découvrir." /></p></div>
      <article className="weddingReel"><WeddingReel /><div><p>WEDDING REEL</p><span><Localized en="A selection of moments" fr="Une sélection de moments" /></span></div></article>
      <div className="weddingVideoGrid">{films.map((film) => <a className="weddingFilmCard" href={`https://www.youtube.com/watch?v=${film.youtubeId}`} target="_blank" rel="noreferrer" key={film.title}><div className="publishedFilmStill"><img src={`https://img.youtube.com/vi/${film.youtubeId}/hqdefault.jpg`} alt="" /><span><Localized en="Watch film" fr="Voir le film" /> ↗</span></div><div className="weddingMeta"><h3>{film.title}</h3></div></a>)}</div>
    </section>
    <section className="weddingGallery"><div className="weddingSectionHead"><div><p className="kicker"><Localized en="In the details" fr="Dans les détails" /></p><h2><Localized en="Moments, preserved" fr="Moments préservés" /></h2></div></div><div>{gallery.map(([src, alt], index) => <figure className={`galleryItem galleryItem${index + 1}`} key={src}><img src={src} alt={alt} /></figure>)}</div></section>
    <section className="makeupArtists" aria-labelledby="makeup-heading"><div className="weddingSectionHead"><div><p className="kicker"><Localized en="Wedding beauty" fr="Beauté mariage" /></p><h2 id="makeup-heading">MAKEUP ARTISTS</h2></div><p><Localized en="Discover trusted beauty artists for weddings, celebrations and on-camera work." fr="Découvrez des artistes beauté de confiance pour les mariages, célébrations et projets caméra." /></p></div><a className="makeupArtistCard" href="/mira"><img src="/mira/final/mira-working.jpg" alt="Mira applying bridal makeup"/><div><p>BRIDAL + EVENT MAKEUP · MONTRÉAL</p><h3>MIRA</h3><span><Localized en="View artist, transformation and gallery" fr="Voir l’artiste, les transformations et la galerie" /> ↗</span></div></a></section>
    <section className="weddingCta"><p className="kicker"><Localized en="Now booking" fr="Réservations ouvertes" /></p><h2><Localized en="Your story deserves" fr="Votre histoire mérite" /><br/><em><Localized en="to feel like yours." fr="de vous ressembler." /></em></h2><a className="button gold" href="/booking"><Localized en="Check availability" fr="Vérifier les disponibilités" /> <b>↗</b></a></section>
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
/* FINAL WEDDING EDITORIAL PRESENTATION 2026 */

.weddingPage .detailHero{
  padding-top:clamp(5rem,9vw,8rem) !important;
  padding-bottom:clamp(5.5rem,10vw,9rem) !important;
  gap:clamp(2.5rem,6vw,6rem) !important;
}

.weddingPage .detailHero h1{
  font-size:clamp(3.5rem,7vw,7rem) !important;
  line-height:.82 !important;
  letter-spacing:-.06em !important;
}

.weddingPage .detailHero .kicker,
.weddingSectionHead .kicker{
  letter-spacing:.24em !important;
  font-size:.64rem !important;
}

/* Major wedding section headings */
.weddingSectionHead{
  align-items:flex-end !important;
  margin-bottom:2.7rem !important;
}

.weddingSectionHead h2{
  font-size:clamp(2.6rem,5.5vw,5.6rem) !important;
  line-height:.86 !important;
  letter-spacing:-.055em !important;
  max-width:9ch;
}

.weddingSectionHead > p{
  max-width:28rem;
  line-height:1.6;
  color:rgba(255,255,255,.5) !important;
}

/* Reel is the anchor visual */
.weddingReel{
  margin-bottom:clamp(3rem,6vw,5.5rem) !important;
}

.weddingReel video{
  display:block;
  width:100%;
  aspect-ratio:16/9;
  object-fit:cover;
}

/*
   3 FILMS:
   Smith top-left
   Suffrard top-right
   Ralph centered underneath and wider
*/
.weddingVideoGrid{
  display:grid !important;
  grid-template-columns:repeat(2,minmax(0,1fr)) !important;
  gap:clamp(1.4rem,3vw,2.7rem) !important;
  align-items:start !important;
}

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
  width:min(74%,760px) !important;
  margin:1rem auto 0 !important;
}

.weddingFilmCard img{
  width:100% !important;
  display:block;
  object-fit:cover;
}

.weddingFilmCard h3{
  margin-top:.9rem !important;
  font-size:clamp(1rem,1.5vw,1.25rem) !important;
  letter-spacing:-.02em !important;
}

/* MOMENTS, PRESERVED — editorial photo story */
.weddingGallery{
  display:grid !important;
  grid-template-columns:repeat(12,minmax(0,1fr)) !important;
  gap:clamp(.7rem,1.4vw,1.25rem) !important;
  align-items:start;
}

.galleryItem{
  grid-column:span 4;
  overflow:hidden;
}

.galleryItem img{
  width:100%;
  height:100%;
  min-height:260px;
  object-fit:cover;
  display:block;
}

/* deliberate rhythm across 13 real images */
.galleryItem:nth-child(1),
.galleryItem:nth-child(6),
.galleryItem:nth-child(11){
  grid-column:span 7;
}

.galleryItem:nth-child(2),
.galleryItem:nth-child(7),
.galleryItem:nth-child(12){
  grid-column:span 5;
}

.galleryItem:nth-child(3),
.galleryItem:nth-child(4),
.galleryItem:nth-child(5),
.galleryItem:nth-child(8),
.galleryItem:nth-child(9),
.galleryItem:nth-child(10){
  grid-column:span 4;
}

.galleryItem:nth-child(13){
  grid-column:3 / span 8;
}

.galleryItem:nth-child(1) img,
.galleryItem:nth-child(6) img,
.galleryItem:nth-child(11) img{
  aspect-ratio:16/9;
}

.galleryItem:nth-child(2) img,
.galleryItem:nth-child(7) img,
.galleryItem:nth-child(12) img{
  aspect-ratio:4/5;
}

.galleryItem:nth-child(13) img{
  aspect-ratio:16/9;
}

@media(max-width:800px){
  .weddingPage .detailHero{
    padding-top:3.8rem !important;
    padding-bottom:4.5rem !important;
  }

  .weddingSectionHead{
    display:block !important;
  }

  .weddingSectionHead h2{
    font-size:clamp(2.6rem,13vw,4.4rem) !important;
  }

  .weddingSectionHead > p{
    margin-top:1.2rem;
  }

  .weddingVideoGrid{
    grid-template-columns:1fr !important;
  }

  .weddingVideoGrid > :nth-child(1),
  .weddingVideoGrid > :nth-child(2),
  .weddingVideoGrid > :nth-child(3){
    grid-column:1 !important;
    grid-row:auto !important;
    width:100% !important;
    margin:0 !important;
  }

  .weddingGallery{
    grid-template-columns:repeat(2,minmax(0,1fr)) !important;
  }

  .galleryItem,
  .galleryItem:nth-child(n){
    grid-column:span 1 !important;
  }

  .galleryItem:nth-child(1),
  .galleryItem:nth-child(6),
  .galleryItem:nth-child(13){
    grid-column:1 / -1 !important;
  }
}

`}</style>

</main>;
}

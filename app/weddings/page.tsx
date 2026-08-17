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
  ["/weddings/smith-party.jpg", "Smith & Aureanne wedding celebration"],
  ["/weddings/wedding-garden-portrait.jpg", "Bride portrait in the garden"],
  ["/weddings/suffrard-ceremony.jpg", "Suffrard & Florence ceremony"],
];

export default function WeddingsPage() {
  return <main className="detailPage weddingPage">
    <SiteHeader active="weddings" />
    <section className="weddingIntro"><div><p className="kicker">WEDDING FILMS</p><h1><Localized en="More than a day." fr="Plus qu’une journée." /><br/><em><Localized en="A feeling, preserved." fr="Une émotion, préservée." /></em></h1><p><Localized en="Honest, elegant films for the moments you will want to return to." fr="Des films élégants et sincères, pour les moments auxquels vous voudrez revenir." /></p><a className="button gold" href="/booking"><Localized en="Tell us about your day" fr="Parlez-nous de votre journée" /> <b>↗</b></a></div><img src="/weddings/wedding-garden-wide.jpg" alt="Smith and Aureanne with their wedding party" /></section>
    <section className="weddingFilms"><div className="weddingSectionHead"><div><p className="kicker"><Localized en="Selected celebrations" fr="Célébrations sélectionnées" /></p><h2><Localized en="Wedding stories" fr="Histoires de mariage" /></h2></div><p><Localized en="Honest moments. Lasting images. Films made to bring you back." fr="Des moments vrais. Des images qui restent. Des films qui vous y ramènent." /></p></div>
      <article className="weddingReel"><WeddingReel /><div><p>WEDDING REEL</p><span><Localized en="A selection of moments" fr="Une sélection de moments" /></span></div></article>

<div className="weddingStoryList">
  {films.map((film, index) => (
    <article
      className={`weddingStoryRow ${index === 1 ? "weddingStoryReverse" : ""}`}
      key={film.title}
    >
      <a
        className="weddingStoryFilm"
        href={`https://www.youtube.com/watch?v=${film.youtubeId}`}
        target="_blank"
        rel="noreferrer"
      >
        <div className="publishedFilmStill">
          <img
            src={`https://img.youtube.com/vi/${film.youtubeId}/hqdefault.jpg`}
            alt={film.title}
          />
          <span>
            <Localized en="Watch film" fr="Voir le film" /> ↗
          </span>
        </div>
      </a>

      <div className="weddingStoryCopy">
        <span className="weddingStoryNumber">
          {String(index + 1).padStart(2, "0")}
        </span>

        <h3>{film.title}</h3>

        <p>
          {film.title === "Smith & Aureanne"
            ? "A love story rooted in friendship and growing up together. What began long before the wedding day becomes an intimate celebration of trust, history, family and the life they continue building side by side."
            : film.title === "Ralph & Evelyne"
            ? "A childhood love story carried into a new chapter. Their wedding feels warm and deeply personal, shaped by shared memories, familiarity and a connection that has grown with them through the years."
            : "More than fifty years of marriage, celebrated all over again. Their renewal becomes a portrait of legacy, family and endurance, honoring a lifetime together while opening one more beautiful chapter."}
        </p>

        <a
          className="weddingStoryLink"
          href={`https://www.youtube.com/watch?v=${film.youtubeId}`}
          target="_blank"
          rel="noreferrer"
        >
          <Localized en="Watch their story" fr="Voir leur histoire" /> ↗
        </a>
      </div>
    </article>
  ))}
</div>

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
    content:"THREE STORIES";
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

</main>;
}

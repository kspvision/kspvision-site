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
  ["/weddings/suffrard-ceremony.jpg", "Suffrard and Florence ceremony"],
  ["/weddings/ralph-dance.jpg", "Ralph and Evelyne celebration"],
  ["/weddings/suffrard-couple.jpg", "Suffrard and Florence together"],
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
  </main>;
}

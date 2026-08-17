import { Localized, SiteFooter, SiteHeader } from "../site-language";

const commercial = [{ title: "Barbancourt", type: "Commercial film", youtubeId: "hNRG8NT3sRs" }, { title: "Fragrance", type: "Product campaign", youtubeId: "FYL9RmYlZ6U" }];
const documentaries = [
  { title: "Corneille présente ADVANCE Québec", src: "https://github.com/kspvision/kspvision-site/releases/download/hero-reel-2026-08-15/Corneille.presente.ADVANCE.Quebec.mp4" },
  {
  title: "Finance Montréal",
  src: "https://github.com/kspvision/kspvision-site/releases/download/hero-reel-2026-08-15/Finance.Montreal.-.Victoria.Ali.Stephanie.Quentin.mp4"
},
  { title: "Kevin Shayne Story", src: "https://github.com/kspvision/kspvision-site/releases/download/hero-reel-2026-08-15/KEVIN.SHAYNE.STORY.PART.1_1.mp4", preview: true },
];

export default function Page() { return <main className="detailPage brandPage"><SiteHeader active="brand" />
  <section className="detailHero toneBrand"><div><p className="kicker">BRAND & DOCUMENTARY</p><h1><Localized en="Stories with purpose." fr="Des histoires qui comptent." /></h1><p><Localized en="Commercial films and documentary work with clarity, character and a human point of view." fr="Des films commerciaux et documentaires avec clarté, caractère et un regard humain." /></p><a className="button gold" href="/booking"><Localized en="Start a project" fr="Lancer un projet" /> <b>↗</b></a></div></section>
  <section className="brandCollection"><div className="weddingSectionHead"><div><p className="kicker"><Localized en="Selected work" fr="Travaux sélectionnés" /></p><h2><Localized en="Commercial stories" fr="Histoires de marque" /></h2></div></div><div className="brandGrid">{commercial.map((project) => <a className="brandFilm" href={`https://www.youtube.com/watch?v=${project.youtubeId}`} target="_blank" rel="noreferrer" key={project.title}><div className="publishedFilmStill"><img src={`https://img.youtube.com/vi/${project.youtubeId}/hqdefault.jpg`} alt="" /><span><Localized en="Watch film" fr="Voir le film" /> ↗</span></div><div><p>{project.type}</p><h3>{project.title}</h3></div></a>)}</div></section>
  <section className="brandCollection documentaryCollection"><div className="weddingSectionHead"><div><p className="kicker">DOCUMENTARY</p><h2><Localized en="Real stories" fr="Histoires réelles" /></h2></div><p><Localized en="Portraits and conversations made with attention and care." fr="Des portraits et conversations réalisés avec attention et sensibilité." /></p></div><div className="brandGrid documentaryPyramid">{documentaries.map((project, index) => <article className={`brandFilm documentaryCard documentaryCard${index + 1}`} key={project.title}>{project.poster ? <video autoPlay muted loop playsInline preload="metadata"><source src={project.src} type="video/mp4" /></video> : <video autoPlay muted loop playsInline preload="metadata"><source src={project.src} type="video/mp4" /></video>}<div className="documentaryInfo"><p>{index === 0 ? "ADVANCE MUSIC GROUP CANADA · TOURNAGE · MONTAGE" : index === 1 ? "COMITÉ JEUNE DE FINANCE MONTRÉAL · TOURNAGE · MONTAGE" : "RÉALISATION · TOURNAGE · MONTAGE"}</p></div></article>)}</div></section>
<style>{`
.documentaryPyramid{
  display:grid !important;
  grid-template-columns:repeat(2,minmax(0,1fr)) !important;
  gap:2.4rem 1.4rem !important;
  align-items:start;
}
.documentaryPyramid .documentaryCard{
  width:100%;
  margin:0;
}
.documentaryPyramid .documentaryCard video{
  display:block;
  width:100%;
  aspect-ratio:16/9;
  object-fit:cover;
  background:#050505;
}
.documentaryPyramid .documentaryCard3{
  grid-column:1 / -1;
  width:min(72%,760px);
  justify-self:center;
  margin-top:1rem;
}
.documentaryInfo{
  padding-top:.7rem;
}
.documentaryInfo p{
  margin:0;
  color:#aaa;
  font-size:.68rem;
  line-height:1.45;
  letter-spacing:.11em;
  text-transform:uppercase;
}
@media(max-width:800px){
  .documentaryPyramid{
    grid-template-columns:1fr !important;
    gap:1.8rem !important;
  }
  .documentaryPyramid .documentaryCard3{
    grid-column:auto;
    width:100%;
    margin-top:0;
  }
}
`}</style>
<SiteFooter />
<style>{`
/* Compact Brand / Documentary introduction */
.brandPage .detailHero{
  min-height:0 !important;
  padding-top:4.5rem !important;
  padding-bottom:4.5rem !important;
}

.brandPage .detailHero h1{
  margin-bottom:.8rem !important;
}

.brandPage .detailHero p{
  margin-bottom:1.35rem !important;
}

@media(max-width:800px){
  .brandPage .detailHero{
    padding-top:3rem !important;
    padding-bottom:3rem !important;
  }
}
`}</style>

<section className="brandClosing">
  <p className="kicker">
    <Localized en="STORIES BUILT WITH PURPOSE" fr="DES HISTOIRES PENSÉES AVEC INTENTION" />
  </p>
  <h2>
    <Localized en="FROM IDEA TO LAST FRAME." fr="DE L’IDÉE JUSQU’AU DERNIER PLAN." />
  </h2>
  <p>
    <Localized
      en="From branded campaigns to documentary portraits, KSP Vision approaches every project with the same focus: understand the subject, find the visual language, and build a film that feels intentional from first frame to last."
      fr="Des campagnes de marque aux portraits documentaires, KSP Vision aborde chaque projet avec la même intention : comprendre le sujet, trouver son langage visuel et construire un film cohérent du premier au dernier plan."
    />
  </p>
  <a href="/booking">
    <Localized en="START A PROJECT ↗" fr="LANCER UN PROJET ↗" />
  </a>
</section>

<style>{`
/* Documentary project identity */
.documentaryCard{
  display:flex !important;
  flex-direction:column !important;
  align-items:stretch;
}

.documentaryCard .documentaryInfo{
  order:-1;
  text-align:center;
  margin:0 auto 1rem !important;
  width:100%;
}

.documentaryCard .documentaryInfo p{
  margin:0 !important;
  letter-spacing:.09em;
  line-height:1.5;
}

.documentaryCard video{
  width:100%;
  display:block;
}

/* Complete Brand / Documentary page ending */
.brandClosing{
  max-width:60rem;
  margin:7rem auto 3rem;
  padding:4.5rem 2rem 2rem;
  text-align:center;
  border-top:1px solid rgba(255,255,255,.16);
}

.brandClosing .kicker{
  margin-bottom:1rem;
}

.brandClosing h2{
  font-size:clamp(2rem,5vw,4.5rem);
  line-height:.95;
  margin:0 0 1.6rem;
}

.brandClosing p{
  max-width:46rem;
  margin:0 auto 2rem;
  line-height:1.8;
  color:rgba(255,255,255,.68);
}

.brandClosing a{
  display:inline-flex;
  padding:1rem 1.4rem;
  border:1px solid rgba(255,255,255,.35);
  text-transform:uppercase;
  letter-spacing:.1em;
}

@media(max-width:800px){
  .brandClosing{
    margin-top:4rem;
    padding-top:3rem;
  }
}
`}</style>
</main>; }

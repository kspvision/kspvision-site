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
  <section className="brandCollection documentaryCollection"><div className="weddingSectionHead"><div><p className="kicker">DOCUMENTARY</p><h2><Localized en="Real stories" fr="Histoires réelles" /></h2></div><p><Localized en="Portraits and conversations made with attention and care." fr="Des portraits et conversations réalisés avec attention et sensibilité." /></p></div><div className="brandGrid documentaryPyramid">{documentaries.map((project, index) => <article className={`brandFilm documentaryCard documentaryCard${index + 1}`} key={project.title}>{project.poster ? <video autoPlay muted loop playsInline preload="metadata"><source src={project.src} type="video/mp4" /></video> : <video autoPlay muted loop playsInline preload="metadata"><source src={project.src} type="video/mp4" /></video>}<div className="documentaryInfo"><p>{index === 0 ? (
  <>
    <strong className="docProjectTitle">ADVANCE MUSIC GROUP CANADA</strong>
    <span className="docProjectRole">TOURNAGE · MONTAGE</span>
  </>
) : index === 1 ? (
  <>
    <strong className="docProjectTitle">COMITÉ JEUNE DE FINANCE MONTRÉAL</strong>
    <span className="docProjectRole">TOURNAGE · MONTAGE</span>
  </>
) : (
  <>
    <span className="docEyebrow">DOCUMENTAIRE</span>
    <strong className="docProjectTitle laVilleTitle">LA VILLE</strong>
    <span className="docProjectRole">RÉALISATION · TOURNAGE · MONTAGE</span>
    <span className="comingSoonDoc">DEDICATED FEATURE — COMING SOON</span>
  </>
)}</p></div></article>)}</div></section>
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


<section className="brandCollaborations">
  <div className="brandCollabHeading">
    <span>SELECTED COLLABORATIONS</span>
    <p>Selected organizations and creative partners featured across KSP Vision productions.</p>
  </div>

  <div className="brandCollabStrip">
    <img
      src="/collaborations-selected.png"
      alt="Selected KSP Vision collaborations"
    />
  </div>
</section>

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

<style>{`
/* FINAL DOCUMENTARY PRESENTATION */
.documentaryPyramid{
  row-gap:62px !important;
}

.documentaryCard{
  display:flex !important;
  flex-direction:column !important;
  align-items:center !important;
}

.documentaryInfo{
  order:-1 !important;
  width:100% !important;
  text-align:center !important;
  margin:0 0 20px !important;
  display:flex !important;
  flex-direction:column !important;
  align-items:center !important;
  gap:7px !important;
}

.docProjectTitle{
  display:block !important;
  font-size:clamp(18px,1.7vw,27px) !important;
  line-height:1.05 !important;
  letter-spacing:-.02em !important;
  color:#fff !important;
  font-weight:700 !important;
}

.docProjectRole{
  display:block !important;
  font-size:10px !important;
  letter-spacing:.18em !important;
  color:rgba(255,255,255,.58) !important;
}

.docEyebrow{
  font-size:9px !important;
  letter-spacing:.28em !important;
  color:#c9a84c !important;
  margin-bottom:2px !important;
}

.laVilleTitle{
  font-size:clamp(30px,3.4vw,52px) !important;
  letter-spacing:-.035em !important;
}

.comingSoonDoc{
  margin-top:9px !important;
  padding:8px 13px !important;
  border:1px solid rgba(201,168,76,.48) !important;
  color:#c9a84c !important;
  font-size:9px !important;
  letter-spacing:.17em !important;
}

.documentaryCard3{
  margin-top:4px !important;
}

.documentaryCard3 video{
  box-shadow:0 24px 80px rgba(0,0,0,.35) !important;
}

/* Complete the page rather than ending immediately after the films */
.brandClosing{
  max-width:900px !important;
  margin:110px auto 55px !important;
  padding:70px 40px !important;
  text-align:center !important;
  border-top:1px solid rgba(255,255,255,.13) !important;
  border-bottom:1px solid rgba(255,255,255,.08) !important;
}

.brandClosing h2{
  font-size:clamp(30px,4vw,56px) !important;
  margin:10px 0 22px !important;
}

.brandClosing p{
  max-width:690px !important;
  margin:0 auto 30px !important;
  line-height:1.75 !important;
  color:rgba(255,255,255,.68) !important;
}

@media(max-width:700px){
  .documentaryPyramid{
    row-gap:48px !important;
  }

  .documentaryInfo{
    margin-bottom:15px !important;
  }

  .brandClosing{
    margin-top:75px !important;
    padding:55px 20px !important;
  }
}
`}</style>


<style>{`
/* FINAL BRAND / DOC REFINEMENT */

.brandPage{
  overflow:hidden;
}

/* Documentary titles */
.docProjectTitle{
  display:block;
  font-size:clamp(22px,2.5vw,34px) !important;
  font-weight:800 !important;
  line-height:1 !important;
  letter-spacing:-.035em !important;
  color:#fff !important;
  text-transform:uppercase;
  margin-bottom:.65rem !important;
}

.documentaryInfo{
  text-align:center !important;
  margin-bottom:1.3rem !important;
}

.documentaryInfo p{
  margin:0 !important;
  color:rgba(255,255,255,.52) !important;
  font-size:.68rem !important;
  letter-spacing:.14em !important;
  text-transform:uppercase;
}

/* Keep pyramid intentional */
.documentaryPyramid{
  gap:3.4rem 1.4rem !important;
}

.documentaryCard{
  position:relative;
}

.documentaryCard video{
  display:block;
  width:100%;
  background:#050505;
}

/* LA VILLE special treatment */
.documentaryCard3{
  padding-top:2.2rem;
}

.documentaryCard3::before{
  content:"UPCOMING DOCUMENTARY";
  display:block;
  width:max-content;
  margin:0 auto 1.1rem;
  color:#b89a55;
  font-size:.58rem;
  font-weight:700;
  letter-spacing:.22em;
}

.laVilleTitle{
  font-size:clamp(34px,5vw,58px) !important;
  letter-spacing:-.045em !important;
}

.comingSoonDoc{
  display:block;
  width:max-content;
  margin:.75rem auto 1.6rem;
  color:rgba(255,255,255,.58);
  font-size:.62rem;
  letter-spacing:.17em;
}

/* Collaboration section */
.brandCollaborations{
  width:min(100%,980px);
  margin:6.5rem auto 2rem;
  padding:3.7rem 0;
  border-top:1px solid rgba(255,255,255,.13);
  border-bottom:1px solid rgba(255,255,255,.13);
}

.brandCollabHeading{
  display:flex;
  justify-content:space-between;
  align-items:flex-end;
  gap:3rem;
  margin-bottom:2.2rem;
}

.brandCollabHeading span{
  color:#fff;
  font-size:.7rem;
  font-weight:700;
  letter-spacing:.2em;
}

.brandCollabHeading span::before{
  content:"";
  display:inline-block;
  width:26px;
  height:1px;
  margin-right:10px;
  vertical-align:middle;
  background:#b89a55;
}

.brandCollabHeading p{
  margin:0;
  max-width:430px;
  text-align:right;
  color:rgba(255,255,255,.48);
  line-height:1.6;
  font-size:.76rem;
}

.brandCollabStrip{
  padding:1.25rem 1.4rem;
  background:#020202;
  border:1px solid rgba(255,255,255,.09);
}

.brandCollabStrip img{
  display:block;
  width:100%;
  height:auto;
  object-fit:contain;
}

/* Closing section */
.brandClosing{
  margin:0 auto 5rem !important;
  padding:4.8rem 1.5rem !important;
  text-align:center;
}

.brandClosing::before{
  content:"KSP VISION";
  display:block;
  margin-bottom:1rem;
  color:#b89a55;
  font-size:.58rem;
  font-weight:700;
  letter-spacing:.24em;
}

.brandClosing h2{
  max-width:760px;
  margin-left:auto !important;
  margin-right:auto !important;
}

.brandClosing p{
  max-width:620px !important;
  margin-left:auto !important;
  margin-right:auto !important;
  color:rgba(255,255,255,.55) !important;
}

@media(max-width:800px){
  .brandCollaborations{
    margin-top:4rem;
    padding:2.8rem 0;
  }

  .brandCollabHeading{
    display:block;
  }

  .brandCollabHeading p{
    text-align:left;
    margin-top:1rem;
  }

  .brandCollabStrip{
    padding:.8rem;
  }

  .documentaryPyramid{
    gap:2.5rem !important;
  }
}
`}</style>

</main>; }

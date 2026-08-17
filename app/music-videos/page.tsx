import { Localized, SiteFooter, SiteHeader } from "../site-language";

const videos=[
  ["foENa43ZOvc","Tizzo x Shreez — KreydayEveryday","Recent · 75K views"],
  ["lpm-NBRsNGM","Ti Juice — Appel / Get Busy","Selected work"],
  ["_pGbFSSgh_o","AK Green — Focus sur mes plans","Recent · KSP Films"],
  ["9iQLjcR6stY","Ti Juice — Écriture Sale 2","26K views"],
  ["oxMC068NZTs","Enima ft. Russkov — Cette Nuit","Selected archive"],
  ["zn6t267flQs","Enima — Intro","Selected archive"],
  ["6PgAanYdKg8","Enima — MMS (Power Remix)","Selected archive"],
  ["1QHbt4cGNkc","Tizzo x Shreez x Soft — On Fouette","1.6M views"],
  ["4PiqS4zQTLI","Tizzo x Shreez x Soft — Dragon","KSP Films"],
  ["F1VzsoBr03Y","YLS — Lifestyle","94K views"],
  ["Xigfun9PNh4","Soft — Dopeman Go","85K views"],
  ["hgA5A3PgPUE","Mighty P ft. LK — Believe It","59K views"],
  ["paEIFYsnBIk","Young A Stunnin' & A1 — Murk","52K views"],
  ["lAu2Q4mBddM","Busy Bros — Life A Movie","14K views"],
  ["sNPWXgvifMU","Õr Pür — Get Right Witcha","KSP Films"],
  ["Zc6beDmPFHM","Lordt — 9 Nights","10K views"],
  ["kHWK9pK2Qc0","Bilo Da Kid — Never","KSP Films"],
  ["GUbCpGGs8Qw","Faxxts — Affiliated","KSP Films"],
  ["lhT8luz5X3Y","Kay Bandz — Winning","KSP Films"],
  ["bLHcxEtVMao","Vulture ft. Hooks — Tout Ma Vie","KSP Films"],
  ["XY-_FdHYspA","Zoe Kot X — By Myself","KSP Films"],
  ["COp_9KadXgg","Lost ft. Cliff — Ennemis","KSP Films"],
  ["Q0ejc1FRaro","Freeman — If I Die","KSP Films"],
  ["tpGCNT5tKG4","Sabz — Intoxicated","KSP Films"],
];
export default function Page(){return <main className="detailPage musicPage">
  <SiteHeader active="music" />
  <section className="detailHero toneMusic"><div><p className="kicker"><Localized en="Music videos" fr="Clips musicaux" /></p><h1>SOUND, TRANSLATED<br/>INTO IMAGES.</h1><p><Localized en="Creative direction and complete production for artists who want a visual identity with character." fr="Direction créative et production complète pour les artistes qui veulent une identité visuelle forte." /></p><a className="button gold" href="/booking"><Localized en="Create your visual" fr="Créer votre visuel" /> <b>↗</b></a></div><a className="featuredMusicHero" href="https://www.youtube.com/watch?v=foENa43ZOvc" target="_blank" rel="noreferrer" style={{backgroundImage:"url(https://img.youtube.com/vi/foENa43ZOvc/hqdefault.jpg)"}}><span>FEATURED PROJECT</span><strong>TIZZO X SHREEZ<br/>KREYDAYEVERYDAY</strong><small><Localized en="Watch film" fr="Voir le film" /> ↗</small></a></section>
  <section className="videoCollection"><div className="weddingSectionHead"><div><p className="kicker"><Localized en="Selected work" fr="Travaux sélectionnés" /></p><h2><Localized en="Watch the films" fr="Voir les films" /></h2></div><p><Localized en="Direction, cinematography, editing and visual production by Kevin Shayne / KSP Vision." fr="Direction, cinématographie, montage et production visuelle par Kevin Shayne / KSP Vision." /></p></div><div className="musicGrid">{videos.map((v,i)=><a className="musicCard" aria-label={`Watch ${v[1]} on YouTube`} href={`https://www.youtube.com/watch?v=${v[0]}`} target="_blank" rel="noreferrer" key={v[0]}><div className="musicThumb" style={{backgroundImage:`linear-gradient(0deg,rgba(0,0,0,.7),transparent 65%),url(https://img.youtube.com/vi/${v[0]}/hqdefault.jpg)`}}><span>{String(i+1).padStart(2,"0")}</span><b aria-hidden="true">↗</b></div><div><h3>{v[1]}</h3><p>{v[2]}</p></div></a>)}</div></section>
  <SiteFooter />

<style>{`
/* KSP integrated music-video hero */
.detailHero.toneMusic{
  align-items:center !important;
  column-gap:3rem !important;
}

.toneMusic .detailHeroCopy{
  align-self:center !important;
  padding-bottom:0 !important;
}

.toneMusic .detailHeroCopy p{
  position:relative !important;
  z-index:2;
  margin-bottom:1.6rem !important;
  line-height:1.55 !important;
}

.featuredMusicHero{
  overflow:hidden;
  background:#050505 !important;
  border:0 !important;
  box-shadow:none !important;
  -webkit-mask-image:radial-gradient(
    ellipse 94% 92% at center,
    #000 68%,
    transparent 100%
  );
  mask-image:radial-gradient(
    ellipse 94% 92% at center,
    #000 68%,
    transparent 100%
  );
}

.featuredMusicHero img{
  width:100% !important;
  height:auto !important;
  display:block;
  object-fit:cover;
}

@media(min-width:801px){
  .toneMusic{
    grid-template-columns:minmax(270px,.8fr) minmax(480px,1.35fr) !important;
  }
}

@media(max-width:800px){
  .toneMusic{
    grid-template-columns:1fr !important;
  }
  .featuredMusicHero{
    width:100% !important;
  }
}
`}</style>

<style>{`
/* Premium Music Videos hero */
.musicHero{
  display:grid !important;
  grid-template-columns:minmax(0,.78fr) minmax(0,1.35fr) !important;
  gap:3.5rem !important;
  align-items:center !important;
  min-height:36rem;
}

.musicHero > div:first-child{
  position:relative;
  z-index:2;
}

.musicHero p{
  max-width:31rem;
  margin-bottom:1.8rem !important;
}

.musicHero .button{
  position:relative !important;
  display:inline-flex !important;
  margin-top:.35rem !important;
}

.featuredMusicHero{
  position:relative !important;
  display:flex !important;
  min-height:30rem !important;
  width:100% !important;
  padding:0 !important;
  overflow:hidden;
  border:1px solid rgba(255,255,255,.13);
  background-size:cover !important;
  background-position:center !important;
  isolation:isolate;
}

.featuredMusicHero::before{
  content:"";
  position:absolute;
  inset:0;
  background:
    linear-gradient(90deg,rgba(0,0,0,.18),rgba(0,0,0,.04)),
    linear-gradient(0deg,rgba(0,0,0,.82),rgba(0,0,0,.02) 60%);
  z-index:0;
}

.featuredMusicHero > *{
  position:relative;
  z-index:1;
}

.featuredMusicHero > div{
  align-self:flex-end;
  padding:2rem !important;
}

@media(max-width:900px){
  .musicHero{
    grid-template-columns:1fr !important;
    gap:2rem !important;
    min-height:0;
  }

  .featuredMusicHero{
    min-height:22rem !important;
    aspect-ratio:16/9;
  }
}
`}</style>

<style>{`
/* FINAL MUSIC HERO */
.musicHero{
  display:grid !important;
  grid-template-columns:minmax(280px,.82fr) minmax(440px,1.45fr) !important;
  align-items:center !important;
  gap:54px !important;
  max-width:1240px !important;
  margin:0 auto !important;
  padding:110px 48px 100px !important;
}

.musicHero > div:first-child{
  position:relative !important;
  z-index:3 !important;
  padding:0 !important;
}

.musicHero p{
  margin:18px 0 26px !important;
  max-width:390px !important;
  line-height:1.55 !important;
}

.musicHero .button{
  position:relative !important;
  display:inline-flex !important;
  margin-top:4px !important;
}

.featuredMusicHero{
  position:relative !important;
  display:block !important;
  width:100% !important;
  min-height:390px !important;
  aspect-ratio:16/9 !important;
  overflow:hidden !important;
  background:#090909 !important;
  text-decoration:none !important;
  border:1px solid rgba(255,255,255,.09) !important;
}

.featuredMusicHero::before{
  content:"" !important;
  position:absolute !important;
  inset:0 !important;
  background-image:url("https://img.youtube.com/vi/foENa43ZOvc/maxresdefault.jpg") !important;
  background-size:cover !important;
  background-position:center !important;
  background-repeat:no-repeat !important;
  transform:scale(1.01);
  z-index:0 !important;
}

.featuredMusicHero::after{
  content:"" !important;
  position:absolute !important;
  inset:0 !important;
  background:linear-gradient(180deg,rgba(0,0,0,.02),rgba(0,0,0,.58)) !important;
  z-index:1 !important;
}

.featuredMusicHero > *{
  position:relative !important;
  z-index:2 !important;
}

.featuredMusicHero > div{
  position:absolute !important;
  left:30px !important;
  right:30px !important;
  bottom:27px !important;
}

@media(max-width:800px){
  .musicHero{
    grid-template-columns:1fr !important;
    gap:42px !important;
    padding:78px 24px 72px !important;
  }

  .featuredMusicHero{
    min-height:0 !important;
  }
}
`}</style>

</main>}

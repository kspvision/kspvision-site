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
  <section className="detailHero toneMusic"><div><p className="kicker"><Localized en="Music videos" fr="Clips musicaux" /></p><h1>SOUND, TRANSLATED<br/>INTO IMAGES.</h1><p><Localized en="Creative direction and complete production for artists who want a visual identity with character." fr="Direction créative et production complète pour les artistes qui veulent une identité visuelle forte." /></p><a className="button gold" href="/booking"><Localized en="Create your visual" fr="Créer votre visuel" /> <b>↗</b></a></div><div className="musicPhotoStack" aria-label="KSP Vision behind the scenes">
  <img className="musicStackPhoto musicStackBack1" src="/music-1539.jpg" alt="" />
  <img className="musicStackPhoto musicStackBack2" src="/music-1540.jpg" alt="" />
  <img className="musicStackPhoto musicStackBack3" src="/music-1602.jpg" alt="" />
  <img className="musicStackPhoto musicStackBack4" src="/music-1605.jpg" alt="" />
  <img className="musicStackPhoto musicStackHero" src="/music-1603.jpg" alt="KSP Vision behind the scenes" />
  <span className="musicStackCaption">BEHIND THE FRAME / KSP VISION</span>
</div></section>
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


<style>{`
/* FINAL MUSIC EDITORIAL PRESENTATION 2026 */

.detailHero.toneMusic,
.musicHero{
  display:grid !important;
  grid-template-columns:minmax(260px,.8fr) minmax(420px,1.35fr) !important;
  align-items:center !important;
  gap:clamp(2.5rem,6vw,6rem) !important;
  padding-top:clamp(4.5rem,8vw,7rem) !important;
  padding-bottom:clamp(5rem,9vw,8rem) !important;
}

.musicHero > div:first-child,
.detailHero.toneMusic > div:first-child{
  position:relative;
  z-index:2;
  padding-bottom:1rem;
}

.musicHero h1,
.detailHero.toneMusic h1{
  font-size:clamp(3rem,6.2vw,6.2rem) !important;
  line-height:.86 !important;
  letter-spacing:-.055em !important;
  max-width:7.8ch;
  margin-bottom:1.6rem !important;
}

.musicHero p,
.detailHero.toneMusic p{
  max-width:31rem !important;
  line-height:1.65 !important;
  margin-bottom:1.8rem !important;
}

.musicHero .button,
.detailHero.toneMusic .button{
  position:relative !important;
  margin-top:.35rem !important;
  z-index:4;
}

/* Main KreydayEveryday feature = actual cinematic frame */
.featuredMusicHero{
  position:relative !important;
  display:flex !important;
  flex-direction:column !important;
  justify-content:flex-end !important;
  width:100% !important;
  min-height:0 !important;
  aspect-ratio:16/9 !important;
  padding:clamp(1.3rem,2.5vw,2.2rem) !important;
  overflow:hidden !important;
  background-size:cover !important;
  background-position:center !important;
  border:0 !important;
  box-shadow:none !important;
}

.featuredMusicHero::before{
  content:"";
  position:absolute;
  inset:0;
  background:
    linear-gradient(180deg,rgba(0,0,0,.02) 35%,rgba(0,0,0,.82) 100%);
  pointer-events:none;
}

.featuredMusicHero > *{
  position:relative;
  z-index:2;
}

.featuredMusicHero strong{
  font-size:clamp(1.55rem,3vw,3rem) !important;
  line-height:.92 !important;
  letter-spacing:-.04em !important;
  max-width:12ch;
}

.featuredMusicHero span,
.featuredMusicHero small{
  letter-spacing:.14em !important;
}

/* Selected work gets clearer editorial separation */
.musicGrid{
  margin-top:2.5rem !important;
  gap:2.4rem 1rem !important;
}

@media(max-width:800px){
  .detailHero.toneMusic,
  .musicHero{
    grid-template-columns:1fr !important;
    gap:2.4rem !important;
    padding-top:3.5rem !important;
    padding-bottom:4.5rem !important;
  }

  .musicHero h1,
  .detailHero.toneMusic h1{
    font-size:clamp(2.7rem,13vw,4.5rem) !important;
  }

  .featuredMusicHero{
    aspect-ratio:16/9 !important;
  }
}

`}</style>


<style>{`
/* FINAL MUSIC POSTER FIX */

/* Physical thumbnail — don't depend on CSS background loading */
.featuredMusicHero{
    isolation:isolate !important;
    background:#090909 !important;
}

.featuredMusicPoster{
    position:absolute !important;
    inset:0 !important;
    width:100% !important;
    height:100% !important;
    object-fit:cover !important;
    z-index:-2 !important;
    display:block !important;
}

.featuredMusicHero::before{
    z-index:-1 !important;
}

.featuredMusicHero > *:not(.featuredMusicPoster){
    position:relative !important;
    z-index:2 !important;
}

`}</style>


<style>{`
/* FINAL REAL MUSIC BTS HERO */

.featuredMusicHero{
    position:relative !important;
    min-height:390px !important;
    overflow:hidden !important;
    isolation:isolate !important;
    border:1px solid rgba(255,255,255,.12) !important;
    background:#050505 !important;
}

.musicEditorialImage{
    position:absolute !important;
    inset:0 !important;
    z-index:0 !important;
    overflow:hidden !important;
}

.musicEditorialImage img{
    width:100% !important;
    height:100% !important;
    object-fit:cover !important;
    object-position:center !important;
    display:block !important;
    filter:grayscale(100%) contrast(1.10) brightness(.66);
    transform:scale(1.025);
}

.musicEditorialImage::after{
    content:"";
    position:absolute;
    inset:0;
    background:
      linear-gradient(90deg,rgba(0,0,0,.10),rgba(0,0,0,.20) 42%,rgba(0,0,0,.82)),
      linear-gradient(0deg,rgba(0,0,0,.58),transparent 58%);
}

.musicImageIndex{
    position:absolute;
    top:1rem;
    right:1rem;
    z-index:2;
    color:rgba(255,255,255,.60);
    font-size:.55rem;
    letter-spacing:.18em;
}

.featuredMusicHero > *:not(.musicEditorialImage){
    position:relative !important;
    z-index:3 !important;
}

.musicHero{
    padding-top:clamp(4rem,7vw,6rem) !important;
    padding-bottom:clamp(4rem,7vw,6rem) !important;
}

@media(max-width:800px){
    .featuredMusicHero{
        min-height:310px !important;
    }
}

`}</style>


<style>{`
/* FINAL COMPACT POLAROID MUSIC STACK */

.musicHero,
.detailHero.toneMusic{
    grid-template-columns:minmax(280px,.9fr) minmax(380px,1.1fr) !important;
    align-items:center !important;
    column-gap:clamp(2.5rem,5vw,5rem) !important;
    padding-top:clamp(3.5rem,6vw,5rem) !important;
    padding-bottom:clamp(3.5rem,6vw,5rem) !important;
}

.musicPhotoStack{
    position:relative !important;
    width:min(100%,520px) !important;
    height:360px !important;
    min-height:0 !important;
    margin-left:auto !important;
    overflow:visible !important;
}

.musicStackPhoto{
    position:absolute !important;
    object-fit:cover !important;
    border:8px solid #f3f0e8 !important;
    border-bottom-width:24px !important;
    box-shadow:0 18px 40px rgba(0,0,0,.48) !important;
}

.musicStackBack1{
    width:180px !important;
    height:220px !important;
    left:16px !important;
    top:58px !important;
    transform:rotate(-8deg) !important;
    z-index:1 !important;
}

.musicStackBack2{
    width:170px !important;
    height:205px !important;
    left:115px !important;
    top:8px !important;
    transform:rotate(5deg) !important;
    z-index:2 !important;
}

.musicStackBack3{
    width:165px !important;
    height:200px !important;
    right:18px !important;
    top:38px !important;
    transform:rotate(8deg) !important;
    z-index:3 !important;
}

.musicStackBack4{
    width:175px !important;
    height:205px !important;
    left:78px !important;
    bottom:2px !important;
    transform:rotate(4deg) !important;
    z-index:4 !important;
}

.musicStackHero{
    width:215px !important;
    height:275px !important;
    right:72px !important;
    top:45px !important;
    transform:rotate(-3deg) !important;
    z-index:8 !important;
    filter:grayscale(100%) contrast(1.08) !important;
}

.musicStackCaption{
    right:10px !important;
    bottom:-1rem !important;
    font-size:.5rem !important;
}

@media(max-width:800px){
    .musicHero,
    .detailHero.toneMusic{
        grid-template-columns:1fr !important;
        row-gap:2rem !important;
    }

    .musicPhotoStack{
        width:100% !important;
        max-width:420px !important;
        height:320px !important;
        margin:0 auto !important;
    }

    .musicStackHero{
        right:45px !important;
    }
}

`}</style>


<style>{`
/* FINAL COMPACT POLAROID LOCK */

/* Keep hero as a normal compact two-column editorial composition */
.musicHero,
.detailHero.toneMusic{
    min-height:0 !important;
    padding-top:clamp(3.4rem,6vw,5.5rem) !important;
    padding-bottom:clamp(3.4rem,6vw,5rem) !important;
}

.detailHero.toneMusic{
    display:grid !important;
    grid-template-columns:minmax(260px,.86fr) minmax(380px,1.14fr) !important;
    align-items:center !important;
    gap:clamp(2rem,4vw,4rem) !important;
}

/* Actual image stack occupies ONE bounded area */
.musicPhotoStack{
    position:relative !important;
    width:min(100%,520px) !important;
    height:430px !important;
    min-height:0 !important;
    margin:0 auto !important;
    overflow:visible !important;
}

/* Every image becomes an overlapping print rather than page content */
.musicPhotoStack img{
    position:absolute !important;
    display:block !important;
    object-fit:cover !important;
    border:8px solid #e9e5dc !important;
    border-bottom-width:25px !important;
    box-shadow:0 16px 40px rgba(0,0,0,.38) !important;
}

/* rear photos */
.musicPhotoStack img:nth-child(1){
    width:39% !important;
    height:42% !important;
    left:4% !important;
    top:10% !important;
    transform:rotate(-7deg) !important;
    z-index:1 !important;
}

.musicPhotoStack img:nth-child(2){
    width:35% !important;
    height:38% !important;
    right:2% !important;
    top:6% !important;
    transform:rotate(6deg) !important;
    z-index:2 !important;
}

.musicPhotoStack img:nth-child(3){
    width:34% !important;
    height:36% !important;
    left:2% !important;
    bottom:5% !important;
    transform:rotate(5deg) !important;
    z-index:3 !important;
}

.musicPhotoStack img:nth-child(4){
    width:32% !important;
    height:34% !important;
    right:4% !important;
    bottom:4% !important;
    transform:rotate(-6deg) !important;
    z-index:4 !important;
}

/* IMG_1603 / front tripod photograph */
.musicPhotoStack img:nth-child(5),
.musicStackHero{
    width:58% !important;
    height:72% !important;
    left:21% !important;
    top:13% !important;
    right:auto !important;
    bottom:auto !important;
    transform:rotate(-2deg) !important;
    z-index:10 !important;
    filter:grayscale(100%) contrast(1.08) !important;
}

.musicStackCaption{
    position:absolute !important;
    right:1rem !important;
    bottom:.2rem !important;
    z-index:20 !important;
}

@media(max-width:800px){
    .detailHero.toneMusic{
        grid-template-columns:1fr !important;
    }

    .musicPhotoStack{
        width:min(92vw,430px) !important;
        height:350px !important;
        margin-top:1.5rem !important;
    }
}

`}</style>


<style>{`
/* ABSOLUTE FINAL FRAMELESS MUSIC STACK */

.musicHero,
.detailHero.toneMusic{
    align-items:center !important;
    min-height:auto !important;
    padding-top:clamp(4.5rem,7vw,6.5rem) !important;
    padding-bottom:clamp(4.5rem,7vw,6.5rem) !important;
}

/* The entire stack occupies ONE compact hero column */
.musicPhotoStack{
    position:relative !important;
    width:min(39vw,430px) !important;
    height:430px !important;
    min-height:0 !important;
    margin:0 auto !important;
    overflow:visible !important;
}

/* REMOVE POLAROID LOOK COMPLETELY */
.musicPhotoStack img{
    position:absolute !important;
    display:block !important;

    border:0 !important;
    outline:0 !important;
    padding:0 !important;
    background:transparent !important;
    box-shadow:none !important;
    border-radius:0 !important;

    object-fit:cover !important;
}

/* smaller supporting photos */
.musicPhotoStack img:nth-child(1){
    width:43% !important;
    height:39% !important;
    left:4% !important;
    top:8% !important;
    transform:rotate(-6deg) !important;
    z-index:1 !important;
}

.musicPhotoStack img:nth-child(2){
    width:40% !important;
    height:35% !important;
    right:5% !important;
    top:2% !important;
    transform:rotate(5deg) !important;
    z-index:2 !important;
}

.musicPhotoStack img:nth-child(3){
    width:42% !important;
    height:36% !important;
    left:0 !important;
    bottom:5% !important;
    transform:rotate(4deg) !important;
    z-index:3 !important;
}

/*
 IMG_1603 is image #4 from the converted sequence:
 1539 / 1540 / 1602 / 1603 / 1605
 THIS is the main tripod/stage frame.
*/
.musicPhotoStack img:nth-child(4),
.musicStackHero{
    width:68% !important;
    height:76% !important;
    right:5% !important;
    top:12% !important;

    transform:rotate(-2deg) !important;
    z-index:10 !important;

    filter:grayscale(100%) contrast(1.06) !important;
}

/* last supporting image */
.musicPhotoStack img:nth-child(5){
    width:39% !important;
    height:33% !important;
    right:0 !important;
    bottom:0 !important;
    transform:rotate(5deg) !important;
    z-index:4 !important;
}

/* No old Featured Project styling gets to affect layout */
.featuredMusicHero{
    display:none !important;
}

@media(max-width:800px){
    .musicHero,
    .detailHero.toneMusic{
        grid-template-columns:1fr !important;
    }

    .musicPhotoStack{
        width:min(88vw,390px) !important;
        height:360px !important;
        margin-top:2rem !important;
    }
}

`}</style>


<style>{`
/* TRUE FINAL MUSIC STACK 2026 */

.detailHero.toneMusic{
    position:relative !important;
    display:block !important;
    min-height:600px !important;
    overflow:hidden !important;
    padding-top:clamp(4.5rem,8vw,7rem) !important;
    padding-bottom:clamp(4rem,7vw,6rem) !important;
}

.toneMusic .detailHeroCopy{
    position:relative !important;
    z-index:20 !important;
    width:min(54%,520px) !important;
    max-width:520px !important;
}

.toneMusic .detailHeroCopy h1{
    position:relative !important;
    z-index:30 !important;
}

/*
 Loose BTS editorial cluster.
 NO white Polaroid borders.
 The photos intentionally sit partly BEHIND the title.
*/
.musicPhotoStack{
    position:absolute !important;
    z-index:4 !important;

    width:min(50vw,500px) !important;
    height:440px !important;

    left:42% !important;
    top:50% !important;
    transform:translateY(-50%) !important;

    margin:0 !important;
    padding:0 !important;
    overflow:visible !important;
    pointer-events:none;
}

.musicPhotoStack img{
    position:absolute !important;
    display:block !important;
    object-fit:cover !important;

    padding:0 !important;
    margin:0 !important;

    border:0 !important;
    outline:0 !important;
    box-shadow:none !important;
    background:none !important;
}

/*
 IMG_1603:
 YOU behind the tripod filming two people,
 studio ceiling visible.
 This is the dominant/front image.
*/
.musicStackHero{
    width:62% !important;
    height:82% !important;
    right:2% !important;
    top:7% !important;
    z-index:9 !important;

    transform:rotate(-1.5deg) !important;
    filter:grayscale(100%) contrast(1.07) !important;
}

/* second bright studio image */
.musicStackBack1{
    width:42% !important;
    height:53% !important;
    right:35% !important;
    top:1% !important;
    z-index:7 !important;

    transform:rotate(5deg) !important;
    filter:grayscale(100%) contrast(1.05) !important;
}

/* blue shots sit farther behind */
.musicStackBack2{
    width:34% !important;
    height:43% !important;
    left:2% !important;
    top:18% !important;
    z-index:4 !important;
    transform:rotate(-7deg) !important;
}

.musicStackBack3{
    width:31% !important;
    height:39% !important;
    left:9% !important;
    bottom:4% !important;
    z-index:3 !important;
    transform:rotate(4deg) !important;
}

.musicStackBack4{
    width:30% !important;
    height:38% !important;
    right:21% !important;
    bottom:-1% !important;
    z-index:2 !important;
    transform:rotate(-5deg) !important;
}

.musicStackCaption{
    position:absolute !important;
    right:0 !important;
    bottom:-1rem !important;
    z-index:12 !important;

    font-size:.53rem !important;
    letter-spacing:.12em !important;
    color:rgba(255,255,255,.52) !important;
}

.videoCollection{
    padding-top:clamp(3.5rem,6vw,5rem) !important;
}

@media(max-width:800px){
    .detailHero.toneMusic{
        min-height:auto !important;
        padding-bottom:3.5rem !important;
    }

    .toneMusic .detailHeroCopy{
        width:100% !important;
        max-width:none !important;
    }

    .musicPhotoStack{
        position:relative !important;
        left:auto !important;
        top:auto !important;
        transform:none !important;

        width:100% !important;
        max-width:420px !important;
        height:360px !important;

        margin:2rem auto 0 !important;
    }
}

`}</style>

</main>}

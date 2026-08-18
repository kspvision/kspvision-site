import { Localized, SiteFooter, SiteHeader } from "../site-language";

const videos = [
  ["_pGbFSSgh_o", "AK Green — Focus sur mes plans", "Recent · KSP Films"],
  ["npDVn0MSbQk", "NICKEALDAGREAT - CAN YOU FEEL IT", "441 VIEWS"],
  ["DXV6uLPcWUQ", "FUCCO - TIP H-MIX", "970 VIEWS"],
  ["foENa43ZOvc", "Tizzo x Shreez — KreydayEveryday", "Recent · 75K views"],
  ["lpm-NBRsNGM", "Ti Juice — Appel / Get Busy", "Selected work"],
  ["9iQLjcR6stY", "Ti Juice — Écriture Sale 2", "26K views"],
  ["N1GdG2wxqKE", "LE ICE FT. MIKEZUP - 6 PIASSES", "118K VIEWS"],
  ["RRw4QrZY5X4", "LE ICE - LE SCOUT", "80K VIEWS"],
  ["gFhVhJHWgKA", "LK THA GOON FT. THA JUICE X LIL DREW X TREEZY - RISQUES", "33K VIEWS"],
  ["_hr9inD0dqA", "LE ICE - MR RICHARD", "54K VIEWS"],
  ["CqslhWMO-nM", "ZACHA FT. SHREEZ - MONEY MAN", "128K VIEWS"],
  ["qfe5gSj4NjE", "LE ICE - 5 DANS LA WHIP", "592K VIEWS"],
  ["vnDASE5p4eQ", "SHREEZ - PLANKTON", "838K VIEWS"],
  ["KAig8vIrgOg", "LK THA GOON X MIGHTY P X PRECISE - CHANGES", "116K VIEWS"],
  ["VEWpAYwugVU", "SHREEZ X TIZZO X SOFT - HERCULES", "212K VIEWS"],
  ["u_AkO15Nz1w", "TAMMY TUESDAYZ - FETE", "11K VIEWS"],
  ["Bk9yk7d7eVE", "TAMMY TUESDAYZ - NO MORE", "15K VIEWS"],
  ["7rvXITEmYnM", "MIKEZUP FT. SHREEZ - FAST LIFE", "388K VIEWS"],
  ["QBRh_yyr1kE", "TAMMY TUESDAYZ - PEACE", "5K VIEWS"],
  ["Q0ejc1FRaro", "Freeman — If I Die", "KSP Films"],
  ["XY-_FdHYspA", "Zoe Kot X — By Myself", "KSP Films"],
  ["4PiqS4zQTLI", "Tizzo x Shreez x Soft — Dragon", "KSP Films"],
  ["kHWK9pK2Qc0", "Bilo Da Kid — Never", "KSP Films"],
  ["tpGCNT5tKG4", "Sabz — Intoxicated", "KSP Films"],
  ["GUbCpGGs8Qw", "Faxxts — Affiliated", "KSP Films"],
  ["F1VzsoBr03Y", "YLS — Lifestyle", "94K views"],
  ["Mhb4RP1sTmQ", "SARAHMÉE - T’AS PAS CRU", "23K VIEWS"],
  ["1QHbt4cGNkc", "Tizzo x Shreez x Soft — On Fouette", "1.6M views"],
  ["paEIFYsnBIk", "Young A Stunnin' & A1 — Murk", "52K views"],
  ["Xigfun9PNh4", "Soft — Dopeman Go", "85K views"],
  ["hgA5A3PgPUE", "Mighty P ft. LK — Believe It", "59K views"],
  ["lAu2Q4mBddM", "Busy Bros — Life A Movie", "14K views"],
  ["lhT8luz5X3Y", "Kay Bandz — Winning", "KSP Films"],
  ["sNPWXgvifMU", "Õr Pür — Get Right Witcha", "KSP Films"],
  ["Zc6beDmPFHM", "Lordt — 9 Nights", "10K views"],
  ["Tm5jIdEmbp4", "Enima — For the Low", "6.8M views"],
  ["9rEhnIFJSJo", "RUSSKOV - ARGENT ET DIAMANDS", "188K VIEWS"],
  ["bLHcxEtVMao", "Vulture ft. Hooks — Tout Ma Vie", "KSP Films"],
  ["eQFct9W8OBc", "RUSSKOV - MOI ET MES LOUPS", "343K VIEWS"],
  ["zn6t267flQs", "Enima — Intro", "Archive"],
  ["oxMC068NZTs", "Enima ft. Russkov — Cette Nuit", "Archive"],
  ["6PgAanYdKg8", "Enima — MMS / Power Remix", "5.4M views"],
];

const featured = [
  videos[7],
  videos[0],
  videos[3],
  videos[4],
  videos[9],
  videos[10],
];

const byId = (id: string) => videos.find((video) => video[0] === id)!;

const standout = [
  byId("Tm5jIdEmbp4"),
  byId("6PgAanYdKg8"),
  byId("1QHbt4cGNkc"),
];

const latest = [
  byId("foENa43ZOvc"),
  byId("lpm-NBRsNGM"),
  byId("_pGbFSSgh_o"),
  byId("9iQLjcR6stY"),
  byId("oxMC068NZTs"),
  byId("zn6t267flQs"),
];


function Card({ video, big = false }: { video: string[]; big?: boolean }) {
  return (
    <a
      className={`mv-card ${big ? "mv-card-big" : ""}`}
      href={`https://www.youtube.com/watch?v=${video[0]}`}
      target="_blank"
      rel="noreferrer"
    >
      <div className="mv-thumb">
        <img
          src={`https://img.youtube.com/vi/${video[0]}/hqdefault.jpg`}
          alt=""
          loading="lazy"
        />
        <div className="mv-shade" />
        <span className="mv-play">↗</span>
      </div>

      <h3>{video[1]}</h3>
      <p>{video[2]}</p>
    </a>
  );
}

function Row({
  eyebrow,
  title,
  items,
  big = false,
}: {
  eyebrow: string;
  title: string;
  items: string[][];
  big?: boolean;
}) {
  return (
    <section className="mv-row">
      <div className="mv-row-head">
        <div>
          <p>{eyebrow}</p>
          <h2>{title}</h2>
        </div>
        <span>SCROLL →</span>
      </div>

      <div className="mv-track">
        {items.map((video) => (
          <Card key={`${title}-${video[0]}`} video={video} big={big} />
        ))}
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <main className="mv-page">
      <SiteHeader active="music" />
      <video
        className="mv-mobile-background-reel"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/music-hero-mobile.mp4" type="video/mp4" />
      </video>


      <section className="mv-hero">
        <video
          className="mv-hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src="https://github.com/kspvision/kspvision-site/releases/download/hero-reel-2026-08-15/KSPVision.ca.REEL.Sequuence.mp4" />
        </video>

        <div className="mv-hero-overlay" />

        <div className="mv-hero-content">
          <p className="mv-gold">
            <Localized en="MUSIC VIDEOS · KSP ARCHIVE" fr="CLIPS · ARCHIVES KSP" />
          </p>

          <h1>
            A DECADE
            <br />
            IN MUSIC.
          </h1>

          <p className="mv-intro">
            <Localized
              en="More than ten years of artists, crews, sets and images. From KSP Films to KSP Vision."
              fr="Plus de dix ans d'artistes, d'équipes, de plateaux et d'images. De KSP Films à KSP Vision."
            />
          </p>

          <a href="#archive" className="mv-enter">
            <Localized en="EXPLORE THE WORK" fr="EXPLORER LE TRAVAIL" /> ↓
          </a>
        </div>
      </section>
      <div id="archive" />

      <Row
        eyebrow=""
        title="RECENT + LATEST WORK"
        items={latest}
        big
      />


      

      <section className="mv-million">
        <div className="mv-million-head">
          <p>MILLION-VIEW FILMS</p>
          <h2>MOST WATCHED</h2>
        </div>

        <div className="mv-million-grid">
          {standout.map((video) => (
            <a
              key={`million-${video[0]}`}
              href={`https://www.youtube.com/watch?v=${video[0]}`}
              target="_blank"
              rel="noreferrer"
              className="mv-million-card"
            >
              <div className="mv-million-thumb">
                <img
                  src={`https://img.youtube.com/vi/${video[0]}/hqdefault.jpg`}
                  alt=""
                  loading="lazy"
                />

                <div className="mv-million-shade" />

                <strong className="mv-million-count">
                  {video[2]}
                </strong>

                <span className="mv-million-play">↗</span>
              </div>

              <h3>{video[1]}</h3>
            </a>
          ))}
        </div>
      </section>

      <Row
        eyebrow="FROM THE VAULT"
        title="KSP FILMS ERA"
        items={videos.slice(8, 16)}
      />

      <Row
        eyebrow="DEEP CUTS"
        title="EARLIER WORK"
        items={videos.slice(16, 24)}
      />


      <section className="mv-collabs">
        <p>ARTISTS / COLLABORATORS</p>

        <div className="mv-collabs-window">
          <div className="mv-collabs-track">
          TIZZO <b>×</b>
          SHREEZ <b>×</b>
          ENIMA <b>×</b>
          SOFT <b>×</b>
          TI JUICE <b>×</b>
          KAY BANDZ <b>×</b>
          YLS <b>×</b>
          BUSY BROS <b>×</b>
          AK GREEN <b>×</b>
          MIGHTY P <b>×</b>
          LE ICE <b>×</b>
          MIKEZUP <b>×</b>
          SARAHMÉE <b>×</b>
          TAMMY TUESDAYZ <b>×</b>
          LK THA GOON <b>×</b>
          THA JUICE <b>×</b>
          LIL DREW <b>×</b>
          TREEZY <b>×</b>
          RUSSKOV <b>×</b>
          PRECISE <b>×</b>
          ZACHA <b>×</b>
          FUCCO <b>×</b>
          NICKEALDAGREAT
        </div>
        </div>
      </section>

      <section className="mv-library">
        <div className="mv-library-head">
          <p className="mv-gold">THE LIBRARY</p>

          <h2>ARCHIVE.</h2>

          <p>
            Temporary catalogue for the layout preview.
            <br />
            The full music video library comes next.
          </p>
        </div>

        <div className="mv-grid">
          {videos.map((video) => (
            <Card key={`grid-${video[0]}`} video={video} />
          ))}
        </div>
      </section>


      <section className="mv-bottom-bts">
        <div className="mv-bottom-bts-head">
          <p>BEHIND THE WORK</p>
          <h2>10+ YEARS BEHIND THE CAMERA.</h2>
        </div>

        <div className="mv-bottom-bts-grid">
          <figure>
            <img src="/music-1539-exact.jpg" alt="KSP Vision behind the scenes" loading="lazy" />
          </figure>
          <figure>
            <img src="/music-1540.jpg" alt="KSP Vision behind the scenes" loading="lazy" />
          </figure>
          <figure>
            <img src="/music-1602.jpg" alt="KSP Vision behind the scenes" loading="lazy" />
          </figure>
        </div>
      </section>

      <section className="mv-stats">
        <div>
          <strong>10+</strong>
          <span>YEARS</span>
        </div>

        <div>
          <strong>24</strong>
          <span>FILMS IN THIS PREVIEW</span>
        </div>

        <div>
          <strong>2010s</strong>
          <span>TO NOW</span>
        </div>

        <div>
          <strong>KSP</strong>
          <span>FILMS → VISION</span>
        </div>
      </section>

      <section className="mv-end">
        <p className="mv-gold">THE NEXT FILM</p>

        <h2>
          YOUR TRACK.
          <br />
          NEXT.
        </h2>

        <a href="/booking">START A PROJECT ↗</a>
      </section>

      <SiteFooter />

      <style>{`
        .mv-page {
          background:#050505;
          color:#fff;
          overflow:hidden;
        }

        .mv-page * {
          box-sizing:border-box;
        }

        .mv-gold {
          color:#d3ad3b;
          font-size:10px;
          line-height:1;
          letter-spacing:.28em;
          font-weight:700;
          text-transform:uppercase;
        }

        /* HERO */

        .mv-hero {
          position:relative;
          min-height:58svh;
          display:flex;
          align-items:flex-start;
          isolation:isolate;
          overflow:hidden;
        }

        .mv-hero-video {
          position:absolute;
          inset:-5%;
          width:110%;
          height:110%;
          z-index:-3;
          object-fit:cover;
          object-position:center;
          pointer-events:none;
          opacity:.62;
          filter:
            blur(3px)
            brightness(.42)
            saturate(.68)
            contrast(1.05);
          transform:scale(1.025);
        }

        .mv-hero-overlay {
          position:absolute;
          inset:0;
          z-index:-2;
          background:
            linear-gradient(
              90deg,
              rgba(0,0,0,.96) 0%,
              rgba(0,0,0,.84) 37%,
              rgba(0,0,0,.56) 74%,
              rgba(0,0,0,.66) 100%
            ),
            linear-gradient(
              0deg,
              #050505 0%,
              rgba(5,5,5,.23) 38%,
              rgba(5,5,5,.08) 100%
            );
        }

        .mv-hero-content {
          width:min(1500px,calc(100% - 80px));
          margin:0 auto;
          padding-bottom:clamp(45px,6vw,80px);
        }

        .mv-hero h1 {
          margin:20px 0 0;
          font-size:clamp(70px,11vw,175px);
          line-height:.78;
          letter-spacing:-.072em;
          font-weight:800;
          text-transform:uppercase;
        }

        .mv-intro {
          max-width:630px;
          margin:30px 0 26px;
          color:rgba(255,255,255,.72);
          font-size:clamp(14px,1.2vw,18px);
          line-height:1.65;
        }

        .mv-enter {
          display:inline-block;
          padding:14px 0 10px;
          color:#fff;
          text-decoration:none;
          font-size:10px;
          letter-spacing:.18em;
          font-weight:700;
          border-bottom:1px solid rgba(255,255,255,.45);
        }

        /* STATS */

        .mv-stats {
          width:min(1600px,100%);
          margin:auto;
          display:grid;
          grid-template-columns:repeat(4,1fr);
          border-top:1px solid rgba(255,255,255,.1);
          border-bottom:1px solid rgba(255,255,255,.1);
        }

        .mv-stats > div {
          min-height:105px;
          padding:24px clamp(20px,3vw,38px);
          display:flex;
          flex-direction:column;
          justify-content:center;
          border-right:1px solid rgba(255,255,255,.1);
        }

        .mv-stats > div:last-child {
          border-right:0;
        }

        .mv-stats strong {
          font-size:clamp(24px,2.8vw,42px);
          line-height:1;
          letter-spacing:-.05em;
        }

        .mv-stats span {
          margin-top:10px;
          color:rgba(255,255,255,.42);
          font-size:8px;
          letter-spacing:.17em;
        }

        /* PEOPLE */

        .mv-people {
          padding:clamp(55px,6vw,85px) 0 clamp(35px,4vw,60px);
        }

        .mv-people > p,
        .mv-people > h2 {
          width:min(1450px,calc(100% - 80px));
          margin-left:auto;
          margin-right:auto;
        }

        .mv-people h2 {
          margin-top:16px;
          margin-bottom:28px;
          font-size:clamp(36px,5.5vw,78px);
          line-height:.86;
          letter-spacing:-.06em;
        }

        .mv-marquee {
          padding:15px 0;
          overflow:hidden;
          border-top:1px solid rgba(255,255,255,.1);
          border-bottom:1px solid rgba(255,255,255,.1);
        }

        .mv-marquee > div {
          width:max-content;
          white-space:nowrap;
          font-size:clamp(20px,2.6vw,38px);
          font-weight:700;
          letter-spacing:-.035em;
          animation:mvMove 42s linear infinite;
        }

        .mv-marquee b {
          margin:0 24px;
          color:#d3ad3b;
          font-weight:400;
        }

        @keyframes mvMove {
          from { transform:translateX(0); }
          to { transform:translateX(-50%); }
        }

        /* NETFLIX ROWS */

        .mv-row {
          width:min(1600px,100%);
          margin:0 auto;
          padding:clamp(34px,4vw,58px) 0 10px;
        }

        .mv-row-head {
          padding:0 clamp(25px,4vw,65px) 16px;
          display:flex;
          align-items:flex-end;
          justify-content:space-between;
        }

        .mv-row-head p {
          margin:0 0 8px;
          color:#d3ad3b;
          font-size:9px;
          letter-spacing:.25em;
        }

        .mv-row-head h2 {
          margin:0;
          font-size:clamp(30px,4vw,60px);
          line-height:1;
          letter-spacing:-.048em;
        }

        .mv-row-head > span {
          color:rgba(255,255,255,.35);
          font-size:8px;
          letter-spacing:.16em;
        }

        .mv-track {
          display:flex;
          gap:12px;
          overflow-x:auto;
          padding:0 clamp(25px,4vw,65px) 20px;
          scrollbar-width:none;
          scroll-snap-type:x proximity;
        }

        .mv-track::-webkit-scrollbar {
          display:none;
        }

        .mv-card {
          flex:0 0 clamp(245px,23vw,350px);
          color:#fff;
          text-decoration:none;
          scroll-snap-align:start;
        }

        .mv-card-big {
          flex-basis:clamp(300px,31vw,470px);
        }

        .mv-thumb {
          position:relative;
          aspect-ratio:16/9;
          overflow:hidden;
          background:#111;
        }

        .mv-thumb img {
          width:100%;
          height:100%;
          display:block;
          object-fit:cover;
          transform:scale(1.01);
          filter:saturate(.88) contrast(1.04);
          transition:transform .5s ease, filter .5s ease;
        }

        .mv-shade {
          position:absolute;
          inset:0;
          background:linear-gradient(
            0deg,
            rgba(0,0,0,.5),
            transparent 55%
          );
        }

        .mv-play {
          position:absolute;
          right:14px;
          bottom:14px;
          width:38px;
          height:38px;
          display:grid;
          place-items:center;
          border-radius:50%;
          background:white;
          color:#050505;
          opacity:0;
          transform:translateY(7px);
          transition:.3s ease;
        }

        .mv-card:hover .mv-thumb img {
          transform:scale(1.055);
          filter:saturate(1.08);
        }

        .mv-card:hover .mv-play {
          opacity:1;
          transform:translateY(0);
        }

        .mv-card h3 {
          margin:12px 0 0;
          font-size:11px;
          line-height:1.4;
          letter-spacing:.015em;
          text-transform:uppercase;
        }

        .mv-card > p {
          margin:5px 0 0;
          color:rgba(255,255,255,.37);
          font-size:8px;
          letter-spacing:.13em;
          text-transform:uppercase;
        }

        /* LANDMARK */

        .mv-landmark {
          width:min(1180px,calc(100% - 80px));
          margin:clamp(55px,6vw,85px) auto 10px;
        }

        .mv-landmark > a {
          position:relative;
          min-height:clamp(330px,40vw,500px);
          display:flex;
          align-items:flex-end;
          overflow:hidden;
          color:#fff;
          text-decoration:none;
          isolation:isolate;
        }

        .mv-landmark-bg {
          position:absolute;
          inset:0;
          z-index:-3;
          background-size:cover;
          background-position:center;
          transition:transform .8s ease;
        }

        .mv-landmark:hover .mv-landmark-bg {
          transform:scale(1.025);
        }

        .mv-landmark-overlay {
          position:absolute;
          inset:0;
          z-index:-2;
          background:
            linear-gradient(90deg,rgba(0,0,0,.83),rgba(0,0,0,.08) 70%),
            linear-gradient(0deg,rgba(0,0,0,.73),transparent 55%);
        }

        .mv-landmark-copy {
          padding:clamp(30px,5vw,70px);
        }

        .mv-landmark-copy p {
          color:#d3ad3b;
          font-size:9px;
          letter-spacing:.23em;
        }

        .mv-landmark-copy h2 {
          margin:12px 0 0;
          font-size:clamp(20px,2.8vw,38px);
          line-height:.9;
          letter-spacing:-.04em;
        }

        .mv-landmark-copy h3 {
          margin:3px 0 14px;
          font-size:clamp(44px,6vw,82px);
          line-height:.82;
          letter-spacing:-.07em;
        }

        .mv-landmark-copy strong {
          display:block;
          margin-bottom:25px;
          color:#d3ad3b;
          font-size:clamp(19px,2.5vw,34px);
        }

        .mv-landmark-copy span {
          font-size:9px;
          letter-spacing:.17em;
          border-bottom:1px solid rgba(255,255,255,.5);
          padding-bottom:7px;
        }

        /* BREAK */

        .mv-break {
          width:min(1450px,calc(100% - 80px));
          margin:clamp(120px,15vw,220px) auto 20px;
          padding:clamp(75px,9vw,130px) 0;
          border-top:1px solid rgba(255,255,255,.12);
          border-bottom:1px solid rgba(255,255,255,.12);
        }

        .mv-break h2 {
          margin:17px 0 28px;
          font-size:clamp(60px,9vw,135px);
          line-height:.8;
          letter-spacing:-.072em;
        }

        .mv-break > p:last-child {
          margin:0;
          max-width:660px;
          color:rgba(255,255,255,.48);
          font-size:14px;
          line-height:1.7;
        }


        /* SMALL COLLABORATOR STRIP */

        .mv-collabs {
          width:min(1450px,calc(100% - 80px));
          margin:clamp(34px,4vw,55px) auto 0;
          padding:18px 0 0;
          border-top:1px solid rgba(255,255,255,.1);
        }

        .mv-collabs > p {
          margin:0 0 12px;
          color:#d3ad3b;
          font-size:8px;
          font-weight:700;
          letter-spacing:.22em;
        }

        .mv-collabs-window {
          overflow:hidden;
          padding:12px 0;
          border-bottom:1px solid rgba(255,255,255,.08);
        }

        .mv-collabs-track {
          width:max-content;
          white-space:nowrap;
          color:rgba(255,255,255,.62);
          font-size:clamp(14px,1.5vw,20px);
          font-weight:600;
          letter-spacing:-.015em;
          animation:mvCollabs 55s linear infinite;
        }

        .mv-collabs-track b {
          margin:0 15px;
          color:#d3ad3b;
          font-weight:400;
        }

        @keyframes mvCollabs {
          from { transform:translateX(0); }
          to { transform:translateX(-50%); }
        }


        /* MILLION VIEW FILMS */

        .mv-million {
          width:min(1450px,calc(100% - 80px));
          margin:clamp(30px,3.5vw,50px) auto 5px;
          padding-top:clamp(24px,3vw,40px);
        }

        .mv-million-head {
          margin-bottom:14px;
        }

        .mv-million-head p {
          margin:0 0 6px;
          color:#d3ad3b;
          font-size:8px;
          font-weight:700;
          letter-spacing:.22em;
        }

        .mv-million-head h2 {
          margin:0;
          font-size:clamp(21px,2.5vw,34px);
          line-height:1;
          letter-spacing:-.04em;
        }

        .mv-million-grid {
          display:grid;
          grid-template-columns:repeat(3,minmax(0,1fr));
          gap:10px;
        }

        .mv-million-card {
          color:#fff;
          text-decoration:none;
          min-width:0;
        }

        .mv-million-thumb {
          position:relative;
          aspect-ratio:16/9;
          overflow:hidden;
          background:#111;
        }

        .mv-million-thumb img {
          width:100%;
          height:100%;
          display:block;
          object-fit:cover;
          filter:saturate(.9) contrast(1.04);
          transition:transform .45s ease, filter .45s ease;
        }

        .mv-million-shade {
          position:absolute;
          inset:0;
          background:
            linear-gradient(
              0deg,
              rgba(0,0,0,.68),
              transparent 55%
            );
        }

        .mv-million-count {
          position:absolute;
          left:12px;
          bottom:11px;
          color:#e0b839;
          font-size:clamp(14px,1.6vw,22px);
          line-height:1;
          font-weight:800;
          letter-spacing:-.03em;
          text-transform:uppercase;
        }

        .mv-million-play {
          position:absolute;
          right:11px;
          bottom:10px;
          width:32px;
          height:32px;
          display:grid;
          place-items:center;
          border-radius:50%;
          background:#fff;
          color:#050505;
          font-size:12px;
        }

        .mv-million-card h3 {
          margin:8px 0 0;
          font-size:10px;
          line-height:1.35;
          font-weight:600;
          text-transform:uppercase;
        }

        .mv-million-card:hover img {
          transform:scale(1.04);
          filter:saturate(1.05);
        }


        /* LIBRARY */

        .mv-library {
          width:min(1450px,calc(100% - 80px));
          margin:clamp(65px,7vw,100px) auto 0;
          padding-top:35px;
          border-top:1px solid rgba(255,255,255,.12);
        }

        .mv-library-head {
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:20px;
          margin-bottom:28px;
        }

        .mv-library-head .mv-gold {
          grid-column:1/-1;
        }

        .mv-library-head h2 {
          margin:0;
          font-size:clamp(45px,6vw,90px);
          line-height:.9;
          letter-spacing:-.06em;
        }

        .mv-library-head > p:last-child {
          align-self:end;
          justify-self:end;
          margin:0;
          color:rgba(255,255,255,.42);
          font-size:12px;
          line-height:1.65;
        }

        .mv-grid {
          display:grid;
          grid-template-columns:repeat(4,minmax(0,1fr));
          gap:26px 12px;
        }

        .mv-grid .mv-card {
          width:100%;
        }

        /* END */

        .mv-end {
          width:min(1450px,calc(100% - 80px));
          margin:clamp(70px,8vw,110px) auto 60px;
          padding:clamp(55px,6vw,85px) 0;
          text-align:center;
          border-top:1px solid rgba(255,255,255,.12);
        }

        .mv-end h2 {
          margin:18px 0 42px;
          font-size:clamp(58px,8vw,110px);
          line-height:.76;
          letter-spacing:-.078em;
        }

        .mv-end a {
          display:inline-block;
          padding:16px 24px;
          border:1px solid rgba(255,255,255,.4);
          color:#fff;
          text-decoration:none;
          font-size:9px;
          font-weight:700;
          letter-spacing:.18em;
        }

        .mv-end a:hover {
          background:#fff;
          color:#050505;
        }

        @media(max-width:900px) {
          .mv-stats {
            grid-template-columns:repeat(2,1fr);
          }

          .mv-grid {
            grid-template-columns:repeat(3,minmax(0,1fr));
          }
        }

        @media(max-width:650px) {

          .mv-million {
            width:calc(100% - 44px);
          }

          .mv-million-grid {
            display:flex;
            overflow-x:auto;
            gap:8px;
            scrollbar-width:none;
          }

          .mv-million-grid::-webkit-scrollbar {
            display:none;
          }

          .mv-million-card {
            flex:0 0 76vw;
          }



          .mv-collabs {
            width:calc(100% - 44px);
          }

          .mv-hero-video {
            inset:-8%;
            width:116%;
            height:116%;
            filter:
              blur(2px)
              brightness(.38)
              saturate(.65);
          }

          .mv-hero {
            min-height:64svh;
          }

          .mv-hero-content {
            width:calc(100% - 44px);
            padding-bottom:55px;
          }

          .mv-hero h1 {
            font-size:18vw;
          }

          .mv-intro {
            max-width:92%;
            font-size:13px;
          }

          .mv-stats {
            grid-template-columns:1fr 1fr;
          }

          .mv-stats > div {
            min-height:120px;
          }

          .mv-people > p,
          .mv-people > h2 {
            width:calc(100% - 44px);
          }

          .mv-card {
            flex-basis:72vw;
          }

          .mv-card-big {
            flex-basis:80vw;
          }

          .mv-play {
            opacity:1;
            transform:none;
          }

          .mv-landmark,
          .mv-break,
          .mv-library,
          .mv-end {
            width:calc(100% - 44px);
          }

          .mv-landmark > a {
            min-height:52svh;
          }

          .mv-library-head {
            grid-template-columns:1fr;
          }

          .mv-library-head .mv-gold {
            grid-column:1;
          }

          .mv-library-head > p:last-child {
            justify-self:start;
          }

          .mv-grid {
            grid-template-columns:repeat(2,minmax(0,1fr));
            gap:32px 9px;
          }
        }

        @media(max-width:420px) {
          .mv-grid {
            grid-template-columns:1fr;
          }
        }

        @media(prefers-reduced-motion:reduce) {
          .mv-marquee > div {
            animation:none;
          }
        }


        /* ==================================================
           FINAL COMPACT MUSIC PAGE OVERRIDES
           ================================================== */

        /* Hero title: smaller and one line on desktop */
        .mv-hero h1 {
          font-size:clamp(42px,6vw,86px) !important;
          line-height:.9 !important;
          letter-spacing:-.055em !important;
          white-space:nowrap;
        }

        /* Every section heading small + single line */
        .mv-row-head h2,
        .mv-million-head h2,
        .mv-library-head h2,
        .mv-end h2 {
          font-size:clamp(18px,2.1vw,28px) !important;
          line-height:1 !important;
          letter-spacing:-.025em !important;
          white-space:nowrap !important;
          margin:0 !important;
        }

        /* Much smaller eyebrow labels */
        .mv-row-head p,
        .mv-million-head p,
        .mv-library-head .mv-gold,
        .mv-collabs > p {
          font-size:7px !important;
          letter-spacing:.19em !important;
        }

        /* Rows much tighter */
        .mv-row {
          padding:24px 0 5px !important;
        }

        .mv-row-head {
          padding-bottom:10px !important;
        }

        .mv-track {
          gap:8px !important;
          padding-bottom:8px !important;
        }

        /* Card titles ONE LINE */
        .mv-card h3,
        .mv-million-card h3 {
          margin-top:6px !important;
          font-size:9px !important;
          line-height:1.2 !important;
          white-space:nowrap !important;
          overflow:hidden !important;
          text-overflow:ellipsis !important;
        }

        .mv-card > p {
          margin-top:3px !important;
          font-size:7px !important;
        }

        /* Three million-view films */
        .mv-million {
          width:min(1450px,calc(100% - 74px));
          margin:28px auto 5px;
          padding:0;
        }

        .mv-million-head {
          margin-bottom:10px;
        }

        .mv-million-grid {
          display:grid;
          grid-template-columns:repeat(3,minmax(0,1fr));
          gap:8px;
        }

        .mv-million-card {
          min-width:0;
          color:#fff;
          text-decoration:none;
        }

        .mv-million-thumb {
          position:relative;
          overflow:hidden;
          aspect-ratio:16/9;
          background:#111;
        }

        .mv-million-thumb img {
          width:100%;
          height:100%;
          object-fit:cover;
          display:block;
          transition:transform .4s ease;
        }

        .mv-million-card:hover img {
          transform:scale(1.035);
        }

        .mv-million-shade {
          position:absolute;
          inset:0;
          background:linear-gradient(
            0deg,
            rgba(0,0,0,.72),
            transparent 52%
          );
        }

        .mv-million-count {
          position:absolute;
          left:10px;
          bottom:9px;
          z-index:2;
          color:#d3ad3b;
          font-size:clamp(15px,1.6vw,23px);
          line-height:1;
          letter-spacing:-.035em;
          text-transform:uppercase;
        }

        .mv-million-play {
          position:absolute;
          right:9px;
          bottom:8px;
          z-index:2;
          width:29px;
          height:29px;
          border-radius:50%;
          background:#fff;
          color:#050505;
          display:grid;
          place-items:center;
          font-size:11px;
        }

        /* Lower collaborator strip stays */
        .mv-collabs {
          margin-top:28px !important;
          padding-top:13px !important;
        }

        .mv-collabs-window {
          padding:8px 0 !important;
        }

        .mv-collabs-track {
          font-size:clamp(11px,1.15vw,16px) !important;
        }

        /* Archive much tighter */
        .mv-library {
          margin-top:35px !important;
          padding-top:20px !important;
        }

        .mv-library-head {
          margin-bottom:15px !important;
          display:flex !important;
          align-items:flex-end !important;
          justify-content:space-between !important;
          gap:20px !important;
        }

        .mv-library-head > p:last-child {
          display:none;
        }

        .mv-grid {
          gap:17px 8px !important;
        }

        /* Final CTA also not gigantic */
        .mv-end {
          margin-top:42px !important;
          padding:34px 0 !important;
        }

        .mv-end h2 {
          margin:8px 0 20px !important;
        }

        @media(max-width:650px) {

          .mv-hero h1 {
            font-size:11.5vw !important;
            white-space:nowrap !important;
          }

          .mv-row-head h2,
          .mv-million-head h2,
          .mv-library-head h2,
          .mv-end h2 {
            font-size:18px !important;
            white-space:nowrap !important;
          }

          .mv-million {
            width:calc(100% - 44px);
          }

          .mv-million-grid {
            display:flex;
            gap:7px;
            overflow-x:auto;
            scrollbar-width:none;
          }

          .mv-million-grid::-webkit-scrollbar {
            display:none;
          }

          .mv-million-card {
            flex:0 0 72vw;
          }

          .mv-million-count {
            font-size:17px;
          }

          .mv-card h3,
          .mv-million-card h3 {
            font-size:8px !important;
          }

          .mv-library-head {
            display:block !important;
          }
        }



        /* ===============================================
           MUSIC PAGE HIERARCHY PASS
           =============================================== */

        .mv-row {
          margin-top:18px !important;
          padding:30px 0 8px !important;
          border-top:1px solid rgba(255,255,255,.075);
        }

        .mv-row-head {
          padding-bottom:14px !important;
        }

        .mv-row-head h2 {
          font-size:clamp(27px,3.1vw,43px) !important;
          line-height:.95 !important;
          letter-spacing:-.04em !important;
          white-space:nowrap !important;
        }

        .mv-row-head p {
          margin-bottom:7px !important;
          font-size:8px !important;
          letter-spacing:.21em !important;
        }

        .mv-million {
          margin-top:24px !important;
          padding-top:31px !important;
          border-top:1px solid rgba(255,255,255,.075);
        }

        .mv-million-head {
          margin-bottom:14px !important;
        }

        .mv-million-head h2 {
          font-size:clamp(29px,3.3vw,45px) !important;
          line-height:.95 !important;
          letter-spacing:-.04em !important;
          white-space:nowrap !important;
        }

        .mv-million-head p {
          margin-bottom:7px !important;
          font-size:8px !important;
          letter-spacing:.21em !important;
        }

        /* Archive heading same family, not gigantic */
        .mv-library-head h2 {
          font-size:clamp(28px,3.1vw,42px) !important;
          line-height:.95 !important;
          letter-spacing:-.04em !important;
          white-space:nowrap !important;
        }

        /* Keep cards dense */
        .mv-card h3,
        .mv-million-card h3 {
          font-size:9px !important;
          line-height:1.15 !important;
          white-space:nowrap !important;
          overflow:hidden !important;
          text-overflow:ellipsis !important;
        }

        /* Slightly more breathing room between actual sections,
           not giant dead zones */
        .mv-track {
          padding-bottom:10px !important;
        }

        @media(max-width:650px) {
          .mv-row-head h2,
          .mv-million-head h2,
          .mv-library-head h2 {
            font-size:23px !important;
          }

          .mv-row,
          .mv-million {
            margin-top:15px !important;
            padding-top:24px !important;
          }
        }



        .mv-hero-content {
          width:min(1450px,calc(100% - 74px)) !important;
          margin:0 auto !important;
          padding-top:clamp(58px,6vw,88px) !important;
          padding-bottom:40px !important;
          position:relative;
          z-index:3;
        }

        .mv-hero h1 {
          margin-top:13px !important;
        }

        .mv-intro {
          margin-top:18px !important;
          margin-bottom:17px !important;
        }


        /* FULL PAGE MOVING REEL */

        .mv-hero-video {
          position:fixed !important;
          top:-10vh !important;
          left:-10vw !important;
          width:120vw !important;
          height:120vh !important;
          max-width:none !important;
          z-index:0 !important;
          object-fit:cover !important;
          object-position:center center !important;
          pointer-events:none !important;

          opacity:.88 !important;

          filter:
            blur(2px)
            brightness(.68)
            saturate(.78)
            contrast(1.04) !important;

          transform:scale(1.08) !important;
        }

        /*
          The page content lives above the fixed video.
        */

        .mv-page {
          position:relative;
          isolation:isolate;
          background:transparent !important;
        }

        .mv-page > *:not(.mv-hero-video) {
          position:relative;
          z-index:2;
        }

        /*
          Global dark veil over reel.
          MUCH lighter than before.
        */

        .mv-page::before {
          content:"";
          position:fixed;
          inset:0;
          z-index:1;
          pointer-events:none;
          background:rgba(0,0,0,.36);
        }

        /*
          Hero itself no longer needs the brutal old overlay.
        */

        .mv-hero-overlay {
          position:absolute !important;
          inset:0 !important;
          background:
            linear-gradient(
              90deg,
              rgba(0,0,0,.58) 0%,
              rgba(0,0,0,.34) 48%,
              rgba(0,0,0,.18) 100%
            ),
            linear-gradient(
              0deg,
              rgba(0,0,0,.42) 0%,
              rgba(0,0,0,.06) 60%
            ) !important;
          z-index:1 !important;
          pointer-events:none;
        }


        /* CONTENT OVER MOVING REEL */

        .mv-row,
        .mv-million,
        .mv-library,
        .mv-collabs,
        .mv-stats,
        .mv-end {
          position:relative;
          background:rgba(5,5,5,.76) !important;
          backdrop-filter:blur(1px);
          -webkit-backdrop-filter:blur(1px);
        }

        .mv-row,
        .mv-million,
        .mv-library {
          box-shadow:
            0 -20px 35px rgba(0,0,0,.24),
            0 20px 35px rgba(0,0,0,.24);
        }

        /*
          Give a little breathing window between shelves
          where the moving reel is visible.
        */

        .mv-row {
          margin-top:10px !important;
        }

        .mv-million {
          margin-top:12px !important;
        }

        /*
          Keep thumbnail text readable.
        */

        .mv-card h3,
        .mv-million-card h3,
        .mv-row-head h2,
        .mv-million-head h2,
        .mv-library-head h2 {
          text-shadow:0 2px 12px rgba(0,0,0,.55);
        }


        .mv-row-head h2,
        .mv-million-head h2,
        .mv-library-head h2 {
          font-size:clamp(27px,3vw,42px) !important;
          line-height:.95 !important;
          white-space:nowrap !important;
        }

        .mv-row-head {
          padding-bottom:13px !important;
        }

        .mv-million-head {
          margin-bottom:13px !important;
        }


        @media(max-width:650px) {

          .mv-hero {
            min-height:54svh !important;
          }

          .mv-hero-content {
            width:calc(100% - 44px) !important;
            padding-top:40px !important;
          }

          .mv-hero-video {
            top:-7vh !important;
            left:-18vw !important;
            width:136vw !important;
            height:114vh !important;
            opacity:.8 !important;

            filter:
              blur(1.5px)
              brightness(.62)
              saturate(.74) !important;
          }

          .mv-page::before {
            background:rgba(0,0,0,.42);
          }

          .mv-row,
          .mv-million,
          .mv-library,
          .mv-collabs {
            background:rgba(5,5,5,.82) !important;
          }

          .mv-row-head h2,
          .mv-million-head h2,
          .mv-library-head h2 {
            font-size:23px !important;
          }
        }



        /* ==================================================
           FINAL CONTINUOUS BACKGROUND POLISH
           ================================================== */

        /* Hide low-resolution artifacts by treating reel
           as moving texture instead of a sharp hero image */
        .mv-hero-video {
          top:-12vh !important;
          left:-12vw !important;
          width:124vw !important;
          height:124vh !important;

          opacity:.84 !important;

          filter:
            blur(8px)
            brightness(.66)
            saturate(.72)
            contrast(.96) !important;

          transform:scale(1.14) !important;
        }

        /* One consistent veil across the entire page */
        .mv-page::before {
          background:rgba(0,0,0,.43) !important;
        }

        /* Keep hero text readable without killing the reel */
        .mv-hero-overlay {
          background:
            linear-gradient(
              90deg,
              rgba(0,0,0,.62) 0%,
              rgba(0,0,0,.38) 42%,
              rgba(0,0,0,.15) 100%
            ),
            linear-gradient(
              0deg,
              rgba(0,0,0,.24) 0%,
              rgba(0,0,0,.03) 65%
            ) !important;
        }

        /* Pull first video row MUCH closer to hero */
        .mv-hero {
          min-height:47svh !important;
        }

        .mv-hero-content {
          padding-top:clamp(55px,5vw,72px) !important;
          padding-bottom:22px !important;
        }

        /* REMOVE THE VISIBLE SECTION BANDS */
        .mv-row,
        .mv-million,
        .mv-library,
        .mv-collabs,
        .mv-stats,
        .mv-end {
          background:transparent !important;

          border-top:0 !important;
          border-bottom:0 !important;

          box-shadow:none !important;

          backdrop-filter:none !important;
          -webkit-backdrop-filter:none !important;
        }

        /* Sections still have hierarchy from typography,
           but no obvious boxes/separators */
        .mv-row {
          margin-top:0 !important;
          padding-top:27px !important;
          padding-bottom:7px !important;
        }

        .mv-million {
          margin-top:7px !important;
          padding-top:28px !important;
        }

        .mv-library {
          margin-top:27px !important;
          padding-top:25px !important;
        }

        .mv-collabs {
          margin-top:23px !important;
          padding-top:12px !important;
        }

        /* Very subtle heading readability only */
        .mv-row-head,
        .mv-million-head,
        .mv-library-head {
          position:relative;
          z-index:3;
        }

        .mv-row-head h2,
        .mv-million-head h2,
        .mv-library-head h2 {
          text-shadow:
            0 2px 8px rgba(0,0,0,.75),
            0 0 25px rgba(0,0,0,.35) !important;
        }

        /* Thumbnails remain the visual separators themselves */
        .mv-thumb,
        .mv-million-thumb {
          box-shadow:0 8px 24px rgba(0,0,0,.22);
        }

        @media(max-width:650px) {

          .mv-hero {
            min-height:48svh !important;
          }

          .mv-hero-content {
            padding-top:34px !important;
            padding-bottom:20px !important;
          }

          .mv-hero-video {
            top:-10vh !important;
            left:-22vw !important;
            width:144vw !important;
            height:120vh !important;

            opacity:.8 !important;

            filter:
              blur(6px)
              brightness(.61)
              saturate(.7)
              contrast(.96) !important;

            transform:scale(1.13) !important;
          }

          .mv-page::before {
            background:rgba(0,0,0,.48) !important;
          }
        }



        /* REMOVE EMPTY SPACE UNDER EXPLORE THE WORK */

        .mv-hero {
          min-height:0 !important;
          height:auto !important;
        }

        .mv-hero-content {
          padding-top:48px !important;
          padding-bottom:20px !important;
        }

        .mv-enter {
          margin-bottom:0 !important;
        }

        /* First catalogue row starts immediately after hero */
        .mv-hero + .mv-row,
        #archive + .mv-row {
          margin-top:0 !important;
          padding-top:18px !important;
        }

        @media(max-width:650px) {
          .mv-hero {
            min-height:0 !important;
            height:auto !important;
          }

          .mv-hero-content {
            padding-top:32px !important;
            padding-bottom:16px !important;
          }
        }



        /* BOTTOM BTS / HISTORY MOMENT */

        .mv-bottom-bts {
          width:min(1450px,calc(100% - 74px));
          margin:34px auto 22px;
          position:relative;
          z-index:3;
        }

        .mv-bottom-bts-head {
          display:flex;
          justify-content:space-between;
          align-items:flex-end;
          gap:30px;
          margin-bottom:12px;
        }

        .mv-bottom-bts-head p {
          margin:0;
          color:#d3ad3b;
          font-size:7px;
          font-weight:700;
          letter-spacing:.21em;
          white-space:nowrap;
        }

        .mv-bottom-bts-head h2 {
          margin:0;
          font-size:clamp(24px,2.7vw,38px);
          line-height:.95;
          letter-spacing:-.04em;
          white-space:nowrap;
        }

        .mv-bottom-bts-grid {
          display:grid;
          grid-template-columns:1.35fr 1fr 1fr;
          gap:8px;
          height:clamp(180px,22vw,310px);
        }

        .mv-bottom-bts-grid figure {
          margin:0;
          overflow:hidden;
          background:#111;
        }

        .mv-bottom-bts-grid img {
          width:100%;
          height:100%;
          object-fit:cover;
          display:block;
          filter:saturate(.82) contrast(1.04);
          transition:transform .45s ease, filter .45s ease;
        }

        .mv-bottom-bts-grid figure:hover img {
          transform:scale(1.025);
          filter:saturate(1);
        }

        /* Stats stay directly underneath BTS */
        .mv-bottom-bts + .mv-stats {
          margin-top:16px !important;
        }

        @media(max-width:650px) {

          .mv-bottom-bts {
            width:calc(100% - 44px);
            margin-top:26px;
          }

          .mv-bottom-bts-head {
            display:block;
          }

          .mv-bottom-bts-head h2 {
            margin-top:6px;
            font-size:22px;
            white-space:normal;
          }

          .mv-bottom-bts-grid {
            display:flex;
            height:190px;
            gap:7px;
            overflow-x:auto;
            scrollbar-width:none;
          }

          .mv-bottom-bts-grid::-webkit-scrollbar {
            display:none;
          }

          .mv-bottom-bts-grid figure {
            flex:0 0 73vw;
          }
        }



        /* ==================================================
           DENSER STANDARD VIDEO ROWS
           MOST WATCHED REMAINS LARGE
           ================================================== */

        /* Normal Netflix rows: smaller cards */
        .mv-track .mv-card {
          flex:0 0 clamp(185px,18vw,275px) !important;
        }

        /* Slightly tighter gaps */
        .mv-track {
          gap:7px !important;
        }

        /* Smaller normal-card labels */
        .mv-card h3 {
          font-size:8px !important;
          margin-top:5px !important;
        }

        .mv-card > p {
          font-size:6.5px !important;
          margin-top:2px !important;
        }

        /* MOST WATCHED stays intentionally large */
        .mv-million-grid {
          grid-template-columns:repeat(3,minmax(0,1fr)) !important;
          gap:8px !important;
        }

        .mv-million-card h3 {
          font-size:9px !important;
        }

        /* Main archive becomes denser too */
        .mv-grid {
          grid-template-columns:repeat(5,minmax(0,1fr)) !important;
          gap:15px 7px !important;
        }

        @media(max-width:1000px) {
          .mv-grid {
            grid-template-columns:repeat(4,minmax(0,1fr)) !important;
          }
        }

        @media(max-width:650px) {
          .mv-track .mv-card {
            flex-basis:61vw !important;
          }

          .mv-grid {
            grid-template-columns:repeat(2,minmax(0,1fr)) !important;
          }

          /* Most Watched remains larger on mobile too */
          .mv-million-card {
            flex:0 0 76vw !important;
          }
        }

      `}</style>
    
      <style>{`
        .mv-mobile-background-reel {
          display: none;
        }

        @media (max-width: 650px) {
          /* Dedicated mobile reel — independent of desktop hero video */
          .mv-mobile-background-reel {
            display: block !important;
            position: fixed !important;

            top: -6vh !important;
            left: -8vw !important;

            width: 116vw !important;
            height: 112vh !important;

            max-width: none !important;

            object-fit: cover !important;
            object-position: center center !important;

            z-index: 0 !important;
            pointer-events: none !important;

            opacity: .88 !important;

            filter:
              blur(5px)
              brightness(.68)
              saturate(.78)
              contrast(1.04) !important;

            transform: scale(1.08) !important;
          }

          /* We don't need the desktop reel on phones anymore */
          .mv-hero-video {
            display: none !important;
          }

          /* Content stays above the mobile reel */
          .mv-page > *:not(.mv-mobile-background-reel) {
            position: relative;
            z-index: 2;
          }

          /* Dark cinematic veil between reel and content */
          .mv-page::before {
            z-index: 1 !important;
            background: rgba(0,0,0,.40) !important;
          }
        }
      `}</style>

</main>
  );
}

"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import { KSPPlayerLink } from "../ksp-player";
import { Localized, SiteFooter, SiteHeader, useLanguage } from "../site-language";

// Additions and metadata refreshes are managed by scripts/import-ksp-films.mjs.
import catalogue from "../../data/ksp-films.json";
import { sections, collaborators, viewLabel, filterArchive } from "../film-catalogue.mjs";

import HeroReelToggle from "./hero-reel-toggle";
const groups = sections(catalogue.videos);
const asCard = (video: typeof catalogue.videos[number]) => [
  video.id, `${video.artist} · ${video.title}`, video.viewCount === null ? "" : `${viewLabel(video.viewCount)} views`,
  video.publishedAt?.slice(0, 4) || "", video.thumbnail,
];
const videos = groups.archive.map(asCard);
const latest = groups.latest.map(asCard);
const standout = [...catalogue.videos]
  .filter(
    (video) =>
      typeof video.viewCount === "number" &&
      video.viewCount >= 500000
  )
  .sort((a, b) => (b.viewCount ?? 0) - (a.viewCount ?? 0))
  .map(asCard);
const eraVideos = [groups.twenties, groups.late, groups.early].map(items => items.map(asCard));
const artists = collaborators(catalogue).filter((artist, index, names) => {
  const key = artist.toLocaleLowerCase("en").replace(/[\s_-]+/g, "");
  return names.findIndex((name) => name.toLocaleLowerCase("en").replace(/[\s_-]+/g, "") === key) === index;
});

function getVideoIdentity(video: string[]) {
  const raw = video[1] || "";
  const match = raw.match(/^(.*?)\s+[·—–-]\s+(.+)$/);

  const artist = match ? match[1].trim() : "";
  let title = match ? match[2].trim() : raw.trim();

  if (artist) {
    const escapedArtist = artist.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const repeatedArtist = new RegExp(
      `^${escapedArtist}\\s*(?:-|–|—|·|:)\\s*`,
      "i"
    );

    title = title.replace(repeatedArtist, "").trim();
  }

  const views =
    video[2]
      ?.match(/[\d,.]+\s*[KMB]?\s*views\b/i)?.[0]
      ?.replace(/\s*views$/i, "")
      .trim() || "";

  return { artist, title, views };
}


/* KSP_TITLE_MARQUEE_COMPONENT_START */

function SlidingTitle({ text }: { text: string }) {
  const windowRef = useRef<HTMLSpanElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [overflowing, setOverflowing] = useState(false);

  useEffect(() => {
    const measure = () => {
      const box = windowRef.current;
      const measureNode = measureRef.current;

      if (!box || !measureNode) return;

      setOverflowing(
        measureNode.scrollWidth > box.clientWidth + 2
      );
    };

    measure();

    const frame = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", measure);
    };
  }, [text]);

  return (
    <span
      ref={windowRef}
      className={`mv-title-window${overflowing ? " is-overflowing" : ""}`}
    >
      <span ref={measureRef} className="mv-title-measure" aria-hidden="true">
        {text}
      </span>

      <span className="mv-title-track">
        <span>{text}</span>

        {overflowing && (
          <>
            <span className="mv-title-gap" aria-hidden="true">•</span>
            <span aria-hidden="true">{text}</span>
          </>
        )}
      </span>
    </span>
  );
}

/* KSP_TITLE_MARQUEE_COMPONENT_END */

function VideoMeta({ video }: { video: string[] }) {
  const { artist, title, views } = getVideoIdentity(video);

  return (
    <div className="mv-video-meta">
      <div className="mv-video-meta-row">
        <h3><SlidingTitle text={title} /></h3>
        {views && (
          <span className="mv-card-views">
            <svg
                    className="mv-view-eye"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 5C6.5 5 2.1 8.7.8 12c1.3 3.3 5.7 7 11.2 7s9.9-3.7 11.2-7C21.9 8.7 17.5 5 12 5Zm0 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z"
                      fill="currentColor"
                      fillRule="evenodd"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="2.15"
                      fill="currentColor"
                    />
                  </svg>
            <span>{views} <Localized en="views" fr="vues" /></span>
          </span>
        )}
      </div>
      <div className="mv-card-details">{artist && <div className="mv-card-artist">{artist}</div>}{video[3] && <time className="mv-card-year" dateTime={video[3]}>{video[3]}</time>}</div>
    </div>
  );
}

function HoverInfo({ video }: { video: string[] }) {
  const { artist, title, views } = getVideoIdentity(video);

  return (
    <div className="mv-hover-info" aria-hidden="true">
      <strong>{title}</strong>
      {artist && <em>{artist}</em>}
      {views && <span>{views} <Localized en="VIEWS" fr="VUES" /></span>}
    </div>
  );
}

function Card({ video, big = false }: { video: string[]; big?: boolean }) {
  return (
    <KSPPlayerLink
      className={`mv-card ${big ? "mv-card-big" : ""}`}
      video={{ sourceType: "youtube", source: video[0], ...getVideoIdentity(video) }}
    >
      <div className="mv-thumb">
        <img
          src={video[4] || `https://img.youtube.com/vi/${video[0]}/hqdefault.jpg`}
          alt=""
          loading="lazy"
        />
        <div className="mv-shade" />
        <HoverInfo video={video} />
      </div>

      <VideoMeta video={video} />
    </KSPPlayerLink>
  );
}

function ScrollRail({ className, children }: { className: string; children: ReactNode }) {
  const railRef = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const update = () => {
      setCanScrollRight(rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 2);
    };
    const observer = new ResizeObserver(update);

    update();
    observer.observe(rail);
    rail.addEventListener("scroll", update, { passive: true });

    return () => {
      observer.disconnect();
      rail.removeEventListener("scroll", update);
    };
  }, []);

  const advance = () => {
    const rail = railRef.current;
    const firstCard = rail?.firstElementChild as HTMLElement | null;
    if (!rail) return;

    const gap = Number.parseFloat(getComputedStyle(rail).columnGap) || 0;
    const cardWidth = firstCard?.getBoundingClientRect().width || rail.clientWidth / 3;
    rail.scrollBy({ left: (cardWidth + gap) * 3, behavior: "smooth" });
  };

  return (
    <div className="mv-scroll-rail">
      <div ref={railRef} className={className}>{children}</div>
      <button
        type="button"
        className="mv-scroll-arrow"
        onClick={advance}
        disabled={!canScrollRight}
        aria-label="Scroll right"
      >
        <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}

function Row({
  eyebrow,
  title,
  items,
  big = false,
  progressive = false,
}: {
  eyebrow: string;
  title: string;
  items: string[][];
  progressive?: boolean;
  big?: boolean;
}) {
  const [visible, setVisible] = useState(20);
  return (
    <section className={`mv-row ${progressive ? "mv-era" : ""}`}>
      <div className="mv-row-head">
        <div>
          <p className={eyebrow === "THE LIBRARY" ? "mv-library-kicker" : undefined}>
            {eyebrow}
          </p>
          <h2
            className="mv-catalogue-section-title"
          >
            {title}
          </h2>
        </div>
        {!progressive && <span><Localized en="SCROLL" fr="DÉFILER" /> →</span>}
      </div>

      <ScrollRail className="mv-track">
        {(progressive ? items.slice(0, visible) : items).map((video) => (
          <Card key={`${title}-${video[0]}`} video={video} big={big} />
        ))}
      </ScrollRail>
      {progressive && visible < items.length && <button type="button" className="mv-expand" onClick={() => setVisible(n => n + 20)}><Localized en="EXPLORE THE ERA" fr="EXPLORER CETTE ÉPOQUE" /> + <span>{Math.min(visible, items.length)} / {items.length}</span></button>}
    </section>
  );
}

export default function FilmsPage() {
  const [language] = useLanguage();
  const fr = language === "fr";
  const copy = (en: string, french: string) => fr ? french : en;
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("");
  const [limit, setLimit] = useState(100);
  const filtered = filterArchive(groups.archive, query, year);
  const active = Boolean(query.trim() || year);
  const shown = (active ? filtered : filtered.slice(0, limit)).map(asCard);
  const archivePreview = (
    !active && limit < filtered.length
      ? filtered.slice(limit, Math.min(limit + 5, filtered.length)).map(asCard)
      : []
  );
  const years = [...new Set(groups.archive.map(v => v.publishedAt.slice(0, 4)))];

  const historyYearStats = years.map((historicYear) => ({
    year: historicYear,
    count: groups.archive.filter(
      (video) => video.publishedAt.slice(0, 4) === historicYear
    ).length,
  }));

  const earliestArchiveYear = [...historyYearStats]
    .sort((a, b) => a.year.localeCompare(b.year))[0];

  const latestArchiveYear = [...historyYearStats]
    .sort((a, b) => b.year.localeCompare(a.year))[0];

  const busiestArchiveYear = [...historyYearStats]
    .sort((a, b) => b.count - a.count)[0];
  const showArtistInArchive = (artist: string) => {
    setQuery(artist);
    setYear("");
    requestAnimationFrame(() => {
      document.getElementById("archive")?.scrollIntoView({ behavior: "smooth" });
    });
  };
  return (
    <main className="mv-page" data-reel="on">
      <SiteHeader active="music" />
      <video
        className="mv-mobile-background-reel"
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
      >
      </video>


      <section className="mv-hero">
      <HeroReelToggle />
        <video
          className="mv-hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/music-hero-mobile.mp4" type="video/mp4" />
        </video>

        <div className="mv-hero-overlay" />

        <div className="mv-hero-content">
          <p className="mv-gold">
            KSP FILMS
          </p>

          <h1>
            {copy("MUSIC, MADE", "LA MUSIQUE,")}
            <br />
            {copy("VISUAL.", "EN IMAGES.")}
          </h1>

          <p className="mv-intro">
            <Localized
              en="More than ten years of artists, crews, sets and images. From KSP Films to KSP Vision."
              fr="Plus de dix ans d'artistes, d'équipes, de plateaux et d'images. De KSP Films à KSP Vision."
            />
          </p>

          <div className="mv-hero-actions">
        <a href="#archive" className="mv-enter">
            <Localized en="EXPLORE THE WORK" fr="EXPLORER LE TRAVAIL" /> ↓
          </a>
        <a className="mv-hero-project-cta" href="/booking?project=music-video">
          <span><Localized en="START A PROJECT" fr="DÉMARRER UN PROJET" /></span>
          <span aria-hidden="true">↗</span>
        </a>
      </div>
        </div>
      </section>



      <section className="mv-history-archive">
        <div className="mv-history-topline">
          <p className="mv-history-kicker">
            {copy("THE ARCHIVE", "LES ARCHIVES")}
          </p>

          <nav className="mv-history-nav" aria-label={copy("Archive navigation", "Navigation des archives")}>
            <a href="#history-journey">
              {copy("TIMELINE", "CHRONOLOGIE")}
            </a>
            <a href="#archive">
              {copy("FULL INDEX", "INDEX COMPLET")}
            </a>
          </nav>
        </div>

        <div className="mv-history-intro-row">
          <div className="mv-history-intro-copy">
            <h2>
              {copy(
                "MORE THAN A DECADE IN MOTION.",
                "PLUS D’UNE DÉCENNIE EN MOUVEMENT."
              )}
            </h2>

            <p>
              {copy(
                "Music videos, artists and eras documented through KSP.",
                "Vidéoclips, artistes et époques documentés par KSP."
              )}
            </p>
          </div>

          <div className="mv-history-stats">
            <div>
              <strong>{groups.archive.length}</strong>
              <span>{copy("FILMS", "CLIPS")}</span>
            </div>

            <div>
              <strong>{years.length}</strong>
              <span>{copy("YEARS", "ANNÉES")}</span>
            </div>

            <div>
              <strong>{artists.length}</strong>
              <span>{copy("ARTISTS", "ARTISTES")}</span>
            </div>
          </div>
        </div>

        <div className="mv-history-timeline">
          <div className="mv-history-years">
            {[...historyYearStats]
              .sort((a, b) => a.year.localeCompare(b.year))
              .map((item) => {
                const edgeClass =
                  item.year === earliestArchiveYear.year
                    ? "is-start"
                    : item.year === latestArchiveYear.year
                      ? "is-end"
                      : "";

                return (
                  <button
                    type="button"
                    key={`history-${item.year}`}
                    className={`mv-history-year ${edgeClass}`}
                    onClick={() => {
                      setQuery("");
                      setYear(item.year);
                      setLimit(100);

                      requestAnimationFrame(() => {
                        document.getElementById("archive")?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      });
                    }}
                  >
                    <span>{item.year}</span>
                    <small>
                      {item.count} {copy("films", "clips")}
                    </small>
                  </button>
                );
              })}
          </div>
        </div>
      </section>

      <Row
        eyebrow={copy("LATEST WORK", "LES DERNIÈRES SORTIES")}
        title={copy("RECENT MUSIC VIDEOS", "CLIPS RÉCENTS")}
        items={latest}
      />




      <section className="mv-million">
        <div className="mv-million-head">
          <p><Localized en="AUDIENCE FAVOURITES" fr="LES PLUS REGARDÉS" /></p>
          <h2 className="mv-catalogue-section-title"><Localized en="MOST WATCHED" fr="LES PLUS REGARDÉS" /></h2>
        </div>

        <ScrollRail className="mv-million-grid mv-most-watched-track">
          {standout.map((video) => (
            <KSPPlayerLink
              key={`million-${video[0]}`}
              video={{ sourceType: "youtube", source: video[0], ...getVideoIdentity(video) }}
              className="mv-million-card"
            >
              <div className="mv-million-thumb">
                <img
                  src={video[4] || `https://img.youtube.com/vi/${video[0]}/hqdefault.jpg`}
                  alt=""
                  loading="lazy"
                />

                <div className="mv-million-shade" />

                <strong className="mv-million-count">
                  {getVideoIdentity(video).views} <Localized en="views" fr="vues" />
                </strong>
                <HoverInfo video={video} />

              </div>

              <VideoMeta video={video} />
            </KSPPlayerLink>
          ))}
        </ScrollRail>
      </section>

      <section className="mv-present-day">
        <div className="mv-present-day-label">
          <span>{copy("PRESENT DAY", "AUJOURD’HUI")}</span>
          <strong>2025–2026</strong>
        </div>

        <div className="mv-present-day-meta">
          <span>
            {groups.archive.filter(
              (video) => Number(video.publishedAt.slice(0, 4)) >= 2025
            ).length}
            {" "}
            {copy("films in the current period", "clips dans la période actuelle")}
          </span>

          <small>
            {copy(
              "THE STORY CONTINUES",
              "L’HISTOIRE CONTINUE"
            )}
          </small>
        </div>
      </section>

      <section className="mv-history-gateway" id="history-journey">
        <div className="mv-history-gateway-copy">
          <p>{copy("THE ARCHIVE", "LES ARCHIVES")}</p>

          <h2>
            <Localized
              en="BACK THROUGH THE YEARS"
              fr="AU FIL DES ANNÉES"
            />
          </h2>

          <span>
            {copy(
              "Start with the present, then move backward through the catalogue.",
              "On part du présent, puis on remonte le catalogue."
            )}
          </span>
        </div>

        <div className="mv-history-signals">
          <div>
            <small>{copy("FIRST YEAR", "PREMIÈRE ANNÉE")}</small>
            <strong>{earliestArchiveYear.year}</strong>
          </div>

          <div>
            <small>{copy("BUSIEST YEAR", "ANNÉE LA PLUS ACTIVE")}</small>
            <strong>{busiestArchiveYear.year}</strong>
            <span>{busiestArchiveYear.count} {copy("films", "clips")}</span>
          </div>

          <div>
            <small>{copy("CURRENT EDGE", "JUSQU’À")}</small>
            <strong>{latestArchiveYear.year}</strong>
          </div>
        </div>
      </section>
      <section className="mv-era-marker mv-era-marker-modern">
        <div>
          <span>{copy("CHAPTER 01", "CHAPITRE 01")}</span>
          <strong>2020–2024</strong>
        </div>

        <p>
          {groups.archive.filter((video) => {
            const chapterYear = Number(video.publishedAt.slice(0, 4));
            return chapterYear >= 2020 && chapterYear <= 2024 && video.youtubeId !== "gFhVhJHWgKA";
          }).length}
          {" "}
          {copy("films in this chapter", "clips dans ce chapitre")}
        </p>

        <div className="mv-era-milestone">
          <small>{copy("ARCHIVE MILESTONE", "REPÈRE D’ARCHIVE")}</small>

          <strong>{busiestArchiveYear.year}</strong>

          <span>
            {busiestArchiveYear.count}{" "}
            {copy(
              "films · busiest year represented",
              "clips · année la plus active représentée"
            )}
          </span>
        </div>
      </section>

      <Row
        eyebrow="2020 — 2024"
        title={copy("MODERN ERA", "ÈRE MODERNE")}
        items={groups.archive
          .filter((v) => {
            const year = Number(v.publishedAt.slice(0, 4));
            return year >= 2020 && year <= 2024 && v.youtubeId !== "gFhVhJHWgKA";
          })
          .map(asCard)}
      />
      <section className="mv-era-marker mv-era-marker-early">
        <div>
          <span>{copy("CHAPTER 02", "CHAPITRE 02")}</span>
          <strong>2014–2019</strong>
        </div>

        <p>
          {groups.archive.filter(
            (video) => Number(video.publishedAt.slice(0, 4)) <= 2019
          ).length}
          {" "}
          {copy("films in this chapter", "clips dans ce chapitre")}
        </p>

        <div className="mv-era-milestone mv-era-origin">
          <small>{copy("ARCHIVE ORIGIN", "ORIGINE DES ARCHIVES")}</small>

          <strong>{earliestArchiveYear.year}</strong>

          <span>
            {copy(
              "earliest year currently represented",
              "première année actuellement représentée"
            )}
          </span>
        </div>
      </section>

      <Row
        eyebrow="2014 – 2019"
        title={copy("EARLY CATALOGUE", "PREMIER CATALOGUE")}
        items={groups.archive
          .filter((v) => Number(v.publishedAt.slice(0, 4)) <= 2019)
          .map(asCard)}
      />


      <section className="mv-people-history">
        <p>{copy("PEOPLE ACROSS THE YEARS", "LES VISAGES À TRAVERS LES ANNÉES")}</p>

        <div>
          <h2>
            {copy("ARTISTS / COLLABORATORS", "ARTISTES / COLLABORATIONS")}
          </h2>

          <span>
            {artists.length}{" "}
            {copy(
              "names across the KSP Films archive",
              "noms à travers les archives KSP Films"
            )}
          </span>
        </div>
      </section>

      <section className="mv-artists-feature mv-collabs">
        <p><span className="mv-artists-feature-label"><Localized en="ARTISTS / COLLABORATORS" fr="ARTISTES / COLLABORATIONS" /></span></p>

        <div className="mv-collabs-window">
          <div className="mv-collabs-track">
          {artists.map((artist, index) => <span key={artist}>{index > 0 && <b aria-hidden="true">×</b>}<button type="button" className="mv-collab-button" onClick={() => showArtistInArchive(artist)}>{artist}</button></span>)}
        </div>
        </div>
      </section>

      <section id="archive" className="mv-library">
        <div className="mv-library-head">
          <p className="mv-library-kicker mv-gold"><Localized en="THE COMPLETE INDEX" fr="L’INDEX COMPLET" /></p>

          <h2 className="mv-catalogue-section-title"><Localized en="ARCHIVE." fr="ARCHIVES." /></h2>

          <p>
            <Localized
              en="The complete filmography. Search by artist or move year by year."
              fr="La filmographie complète. Recherchez par artiste ou parcourez les années."
            />
          </p>
        </div>

        <div className="mv-archive-tools">
          <label>
            <span className="mv-filter-label">{copy("SEARCH", "RECHERCHER")}</span>
            <input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={copy(
                "SEARCH ARTIST OR TITLE",
                "RECHERCHER UN ARTISTE OU UN TITRE"
              )}
            />
          </label>

          <label>
            <span className="mv-filter-label">{copy("ARTIST", "ARTISTE")}</span>
            <select
              value={artists.includes(query) ? query : ""}
              onChange={e => setQuery(e.target.value)}
            >
              <option value="">{copy("ALL ARTISTS", "TOUS LES ARTISTES")}</option>
              {artists.map(artist => (
                <option key={artist} value={artist}>{artist}</option>
              ))}
            </select>
          </label>

          {active && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setYear("");
                setLimit(100);
              }}
            >
              {copy("CLEAR", "RÉINITIALISER")}
            </button>
          )}
        </div>

        <div className="mv-archive-year-timeline">
          <span className="mv-archive-year-heading">
            {copy("BY YEAR", "PAR ANNÉE")}
          </span>

          <div className="mv-archive-year-track">
            <button
              type="button"
              className={!year ? "is-active" : ""}
              onClick={() => {
                setYear("");
                setLimit(100);
              }}
            >
              {copy("ALL", "TOUS")}
            </button>

            {years.map(y => (
              <button
                type="button"
                key={y}
                className={year === y ? "is-active" : ""}
                onClick={() => {
                  setYear(y);
                  setLimit(100);
                }}
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        <p className="mv-result-count" role="status">{filtered.length} {filtered.length === 1 ? copy("video", "clip") : copy("videos", "clips")}{filtered.length === 0 && ` — ${copy("No matching videos.", "Aucun clip ne correspond à votre recherche.")}`}</p>
        <div className="mv-grid mv-archive-grid">
          {shown.map((video: Parameters<typeof Card>[0]["video"]) => (
            <Card key={`grid-${video[0]}`} video={video} />
          ))}
        </div>

        {!active && limit < filtered.length && (
          <div className="mv-archive-reveal">
            <div
              className="mv-grid mv-archive-grid mv-archive-preview-grid"
              aria-hidden="true"
            >
              {archivePreview.map((video: Parameters<typeof Card>[0]["video"]) => (
                <Card key={`preview-${video[0]}`} video={video} />
              ))}
            </div>

            <div
              className="mv-archive-reveal-fade"
              aria-hidden="true"
            />

            <button
              type="button"
              className="mv-expand"
              onClick={() =>
                setLimit(n => Math.min(n + 50, filtered.length))
              }
            >
              {copy(
                "EXPLORE FULL ARCHIVE",
                "EXPLORER TOUTES LES ARCHIVES"
              )} + <span>{shown.length} / {filtered.length}</span>
            </button>
          </div>
        )}
      </section>

    {/* KSP_FILMS_BOTTOM_CTA */}
    <section className="mv-final-cta">
      <div className="mv-final-cta-copy">
        <p>
          <Localized
            en="THE NEXT FILM"
            fr="LE PROCHAIN FILM"
          />
        </p>

        <h2>
          <Localized
            en="YOUR TRACK. NEXT."
            fr="VOTRE MORCEAU. ENSUITE."
          />
        </h2>

        <span>
          <Localized
            en="From first idea to final cut, KSP Films builds music videos around the artist, the track and its world."
            fr="De la première idée au montage final, KSP Films construit des vidéoclips autour de l’artiste, du morceau et de son univers."
          />
        </span>
      </div>

      <a href="/booking?project=music-video" className="mv-final-cta-button">
        <Localized
          en="START A PROJECT"
          fr="DÉMARRER UN PROJET"
        />
        <b aria-hidden="true">↗</b>
      </a>
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
          flex:0 0 clamp(280px,26vw,420px);
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
          margin:10px auto 5px;
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
          margin-top:16px !important;
          padding-top:16px !important;
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



        /* KSP Films compact project-card identity */
        .mv-page .mv-video-meta {
          margin-top: 3px;
          min-width: 0;
        }

        .mv-page .mv-video-meta-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 9px;
          min-width: 0;
        }

        .mv-page .mv-video-meta h3 {
          margin: 0 !important;
          min-width: 0;
          color: #fff;
          font-size: 11px !important;
          line-height: 1.15 !important;
          font-weight: 500 !important;
          letter-spacing: -0.01em;
          white-space: nowrap !important;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .mv-page .mv-card-views {
          flex: 0 0 auto;
          color: rgba(255,255,255,.55);
          font-size: 9px;
          line-height: 1;
          font-weight: 500;
          letter-spacing: .04em;
          text-transform: uppercase;
        }

        .mv-page .mv-card-artist {
          margin-top: 2px;
          color: rgba(255,255,255,.62);
          font-size: 9px;
          line-height: 1.1;
          font-weight: 400;
          letter-spacing: .045em;
          text-transform: uppercase;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .mv-page .mv-grid .mv-video-meta {
          margin-top: 3px;
        }

        .mv-page .mv-grid .mv-video-meta h3 {
          font-size: 11px !important;
        }

        .mv-page .mv-grid .mv-card-artist,
        .mv-page .mv-grid .mv-card-views {
          font-size: 8px;
        }

        .mv-page .mv-million-card .mv-video-meta h3 {
          font-size: 12px !important;
        }

        .mv-page .mv-million-card .mv-card-views {
          display: none;
        }

        .mv-page .mv-hover-info em {
          display: block;
          margin-top: 3px;
          color: rgba(255,255,255,.68);
          font-size: 11px;
          line-height: 1.2;
          font-style: normal;
          font-weight: 500;
          letter-spacing: .035em;
          text-transform: uppercase;
        }

        @media (max-width: 700px) {
          .mv-page .mv-video-meta h3,
          .mv-page .mv-grid .mv-video-meta h3 {
            font-size: 12px !important;
          }

          .mv-page .mv-card-artist,
          .mv-page .mv-card-views {
            font-size: 8px;
          }

          .mv-page .mv-video-meta-row {
            gap: 6px;
          }
        }

        `}

        </style>

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

/* Mobile hero reel stays visible above blurred background */
.mv-hero-video {
  display: block !important;
  object-fit: cover;
  object-position: center top;
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

        /* Music-video card polish; preserve section sizes and hero behavior. */
        .mv-page .mv-thumb,
        .mv-page .mv-million-thumb {
          border-radius:12px;
          overflow:hidden;
        }
        .mv-page .mv-card h3,
        .mv-page .mv-million-card h3 {
          margin:10px 0 0 !important;
          font-size:16px !important;
          line-height:1.35 !important;
          font-weight:700;
          white-space:normal !important;
          overflow-wrap:anywhere;
          display:-webkit-box;
          -webkit-box-orient:vertical;
          -webkit-line-clamp:2;
          overflow:hidden;
        }
        .mv-page .mv-million-card h3 { font-size:20px !important; }
        .mv-page .mv-grid .mv-card h3 { font-size:14px !important; }
        .mv-page .mv-card .mv-thumb img,
        .mv-page .mv-million-card .mv-million-thumb img {
          transform:none;
          transition:none;
        }
        .mv-hover-info {
          display:none;
          position:absolute;
          inset:0;
          justify-content:flex-end;
          flex-direction:column;
          gap:5px;
          padding:12px;
          background:linear-gradient(0deg,rgba(0,0,0,.88),rgba(0,0,0,.28) 65%,transparent);
          pointer-events:none;
          opacity:0;
          transition:opacity 200ms ease;
          text-transform:uppercase;
        }
        .mv-hover-info strong {
          color:#fff;
          font-size:14px;
          line-height:1.3;
          overflow-wrap:anywhere;
          display:-webkit-box;
          -webkit-box-orient:vertical;
          -webkit-line-clamp:2;
          overflow:hidden;
        }
        .mv-hover-info span { color:#e0b839; font-size:12px; }
        @media (hover:hover) and (pointer:fine) {
          .mv-hover-info { display:flex; }
          .mv-card:hover .mv-hover-info,
          .mv-card:focus-visible .mv-hover-info,
          .mv-million-card:hover .mv-hover-info,
          .mv-million-card:focus-visible .mv-hover-info { opacity:1; }
          .mv-million-card:hover .mv-million-count,
          .mv-million-card:focus-visible .mv-million-count { opacity:0; }
        }



        /* Higgsfield-density final refinement */
        .mv-page .mv-thumb {
          margin-bottom: 0 !important;
        }

        .mv-page .mv-thumb img {
          display: block;
        }

        .mv-page .mv-video-meta,
        .mv-page .mv-grid .mv-video-meta {
          margin-top: 2px !important;
        }

        .mv-page .mv-video-meta-row {
          gap: 7px !important;
        }

        .mv-page .mv-video-meta h3,
        .mv-page .mv-grid .mv-video-meta h3 {
          margin: 0 !important;
          font-size: 11px !important;
          line-height: 1.08 !important;
          font-weight: 500 !important;
          letter-spacing: 0 !important;
          text-transform: none;
        }

        .mv-page .mv-card-artist {
          margin-top: 2px !important;
          font-size: 9px !important;
          line-height: 1.05 !important;
          font-weight: 400 !important;
          color: rgba(255,255,255,.48) !important;
          letter-spacing: 0 !important;
        }

        .mv-page .mv-card-views {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          flex: 0 0 auto;
          font-size: 9px !important;
          line-height: 1 !important;
          font-weight: 400 !important;
          color: rgba(255,255,255,.55) !important;
          letter-spacing: 0 !important;
          text-transform: none !important;
          white-space: nowrap;
        }

        .mv-page .mv-view-eye {
          width: 11px;
          height: 11px;
          flex: 0 0 11px;
        }

        .mv-page .mv-million-card .mv-video-meta h3 {
          font-size: 11px !important;
          font-weight: 500 !important;
        }

        .mv-page .mv-million-card .mv-card-views {
          display: none !important;
        }

        @media (max-width: 700px) {
          .mv-page .mv-video-meta,
          .mv-page .mv-grid .mv-video-meta {
            margin-top: 2px !important;
          }

          .mv-page .mv-video-meta h3,
          .mv-page .mv-grid .mv-video-meta h3 {
            font-size: 10px !important;
          }

          .mv-page .mv-card-artist,
          .mv-page .mv-card-views {
            font-size: 8px !important;
          }

          .mv-page .mv-view-eye {
            width: 10px;
            height: 10px;
            flex-basis: 10px;
          }
        }




        /* KSP Films final section rhythm */

        .mv-page .mv-video-meta h3,
        .mv-page .mv-grid .mv-video-meta h3,
        .mv-page .mv-million-card .mv-video-meta h3 {
          font-weight: 600 !important;
        }

        .mv-page .mv-row {
          margin-top: 0 !important;
          margin-bottom: 0 !important;
          padding-top: 18px !important;
          padding-bottom: 18px !important;
        }

        .mv-page .mv-row-head {
          margin-bottom: 12px !important;
        }

        .mv-page .mv-collabs {
          margin-top: 8px !important;
          margin-bottom: 12px !important;
          padding-top: 14px !important;
          padding-bottom: 14px !important;
        }

        .mv-page .mv-collabs > p {
          margin: 0 0 10px !important;
          font-size: 10px !important;
          font-weight: 600 !important;
          letter-spacing: .14em !important;
        }

        .mv-page .mv-collabs-window {
          margin-top: 0 !important;
        }

        .mv-page .mv-collabs-track {
          font-size: 13px !important;
          line-height: 1.25 !important;
          font-weight: 600 !important;
          letter-spacing: 0 !important;
        }

        .mv-page .mv-collabs-track b {
          margin: 0 8px !important;
          font-size: 9px !important;
          font-weight: 500 !important;
          opacity: .65;
        }

        @media (max-width: 700px) {
          .mv-page .mv-row {
            padding-top: 14px !important;
            padding-bottom: 14px !important;
          }

          .mv-page .mv-row-head {
            margin-bottom: 10px !important;
          }

          .mv-page .mv-collabs {
            padding-top: 12px !important;
            padding-bottom: 12px !important;
          }

          .mv-page .mv-collabs-track {
            font-size: 11px !important;
          }

          .mv-page .mv-collabs-track b {
            margin: 0 6px !important;
            font-size: 8px !important;
          }
        }


        html body .mv-page .mv-video-meta h3, html body .mv-page .mv-grid .mv-video-meta h3, html body .mv-page .mv-million-card .mv-video-meta h3 {font-family:inherit!important;font-weight:800!important;text-transform:uppercase;}
        html body .mv-page .mv-card-artist {font-family:inherit!important;font-weight:500!important;text-transform:uppercase;opacity:.78;}
        .mv-page .mv-era-grid {padding:0 clamp(25px,4vw,65px);grid-template-columns:repeat(3,minmax(0,1fr));gap:22px 14px;}
        .mv-page .mv-era .mv-row-head {border-top:1px solid #ffffff18;padding-top:20px;}
        .mv-timeline-label {padding:24px clamp(25px,4vw,65px) 0;color:#d3ad3b;font-size:10px;letter-spacing:.2em;}
        .mv-page .mv-expand {display:block;margin:20px auto 8px;padding:9px 0;border:0;border-bottom:1px solid #d3ad3b66;background:none;color:#fff;font-family:inherit;font-size:10px;font-weight:600;letter-spacing:.12em;cursor:pointer;}
        .mv-expand span {color:#aaa;margin-left:12px;font-size:10px;}
        .mv-archive-tools {display:flex;gap:16px;align-items:end;margin:22px 0 12px;}
        .mv-archive-tools label:first-child {flex:1;}
        .mv-filter-label {display:block;font-size:10px;letter-spacing:.12em;margin-bottom:8px;color:#aaa;}
        .mv-archive-tools input,.mv-archive-tools select {width:100%;min-height:42px;border:1px solid #ffffff35;background:#101010;color:white;padding:10px;font:inherit;font-size:12px;border-radius:0;}
        .mv-archive-tools button {background:none;color:#fff;border:0;border-bottom:1px solid #888;padding:12px 0;cursor:pointer;font-size:10px;}
        .mv-page .mv-result-count {color:#aaa;font-size:11px;margin-bottom:18px;}
        html body .mv-page .mv-library {padding-top:28px!important;padding-bottom:32px!important;}
        @media(max-width:700px){.mv-page .mv-era-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:18px 10px}.mv-archive-tools{flex-wrap:wrap;gap:12px}.mv-archive-tools label:first-child{flex-basis:100%}.mv-archive-tools label:nth-child(2){flex:1}}
`}</style>

      {/* KSP_FINAL_RHYTHM_START */}
      <style>{`

        /* ====================================================
           KSP FILMS — TRUE FINAL CATALOGUE RHYTHM
           This block intentionally comes AFTER previous inline
           styles so legacy spacing rules cannot override it.
           ==================================================== */

        .mv-page {
          --mv-gutter: clamp(25px,4vw,65px);
          --mv-section-top: 14px;
          --mv-section-bottom: 10px;
        }


        /* ====================================================
           1. REMOVE THE ACTUAL DEADSPACE
           ==================================================== */

        html body .mv-page .mv-row {
          min-height: 0 !important;
          height: auto !important;

          margin-top: 0 !important;
          margin-bottom: 0 !important;

          padding-top: var(--mv-section-top) !important;
          padding-bottom: var(--mv-section-bottom) !important;
        }

        /*
          OLD CSS had:
          row-head padding-bottom:16px
          PLUS margin-bottom:12px.

          That was creating ~28px before the cards by itself.
        */
        html body .mv-page .mv-row-head {
          box-sizing: border-box !important;

          margin: 0 !important;
          padding:
            0
            var(--mv-gutter)
            8px
          !important;

          min-height: 0 !important;
          height: auto !important;
        }

        html body .mv-page .mv-row-head p {
          margin: 0 0 5px !important;
        }

        html body .mv-page .mv-row-head h2 {
          margin: 0 !important;
        }

        /*
          OLD track had 20px bottom padding.
          Combined with row bottom + next row top this created
          the large empty bands visible in the screenshots.
        */
        html body .mv-page .mv-track {
          box-sizing: border-box !important;

          margin: 0 !important;

          padding:
            0
            var(--mv-gutter)
            3px
          !important;

          gap: 10px !important;

          min-height: 0 !important;
          height: auto !important;

          align-items: flex-start !important;
        }


        /* ====================================================
           2. MOST WATCHED — SAME VERTICAL RHYTHM
           Keep cards large, only remove empty space.
           ==================================================== */

        html body .mv-page .mv-million {
          min-height: 0 !important;
          height: auto !important;

          margin: 0 !important;

          padding:
            14px
            0
            10px
          !important;
        }

        html body .mv-page .mv-million-head {
          box-sizing: border-box !important;

          width: 100% !important;

          margin: 0 !important;

          padding:
            0
            var(--mv-gutter)
            8px
          !important;
        }

        html body .mv-page .mv-million-head p {
          margin: 0 0 5px !important;
        }

        html body .mv-page .mv-million-head h2 {
          margin: 0 !important;
        }

        html body .mv-page .mv-million-grid {
          box-sizing: border-box !important;

          margin-top: 0 !important;
          margin-bottom: 0 !important;

          padding-bottom: 3px !important;

          min-height: 0 !important;
        }


        /* ====================================================
           3. BACK THROUGH THE YEARS
           Keep it, but stop making it its own empty section.
           ==================================================== */

        html body .mv-page .mv-timeline-label {
          box-sizing: border-box !important;

          min-height: 0 !important;
          height: auto !important;

          margin: 0 !important;

          padding:
            10px
            var(--mv-gutter)
            3px
          !important;

          line-height: 1 !important;
        }


        /* ====================================================
           4. UNIFORM NORMAL VIDEO CARDS
           ==================================================== */

        html body .mv-page .mv-track .mv-card {
          flex:
            0
            0
            clamp(185px,18vw,275px)
          !important;

          width: clamp(185px,18vw,275px) !important;
          min-width: clamp(185px,18vw,275px) !important;
          max-width: clamp(185px,18vw,275px) !important;

          height: auto !important;
          min-height: 0 !important;

          align-self: flex-start !important;

          overflow: hidden !important;
        }

        html body .mv-page .mv-thumb {
          display: block !important;

          width: 100% !important;

          aspect-ratio: 16 / 9 !important;
          height: auto !important;
          min-height: 0 !important;

          margin: 0 !important;

          overflow: hidden !important;
        }

        html body .mv-page .mv-thumb img {
          display: block !important;

          width: 100% !important;
          height: 100% !important;

          max-width: none !important;

          object-fit: cover !important;
          object-position: center center !important;

          aspect-ratio: auto !important;
        }


        /* ====================================================
           5. EVERY NORMAL CARD GETS THE SAME META HEIGHT
           ==================================================== */

        html body .mv-page .mv-video-meta {
          box-sizing: border-box !important;

          display: grid !important;
          grid-template-rows: 14px 12px !important;

          row-gap: 2px !important;

          width: 100% !important;
          height: 28px !important;
          min-height: 28px !important;
          max-height: 28px !important;

          margin: 4px 0 0 !important;

          overflow: hidden !important;
        }

        html body .mv-page .mv-video-meta-row {
          display: flex !important;

          align-items: center !important;

          width: 100% !important;
          min-width: 0 !important;

          height: 14px !important;
          min-height: 14px !important;
          max-height: 14px !important;

          margin: 0 !important;

          gap: 7px !important;
        }

        html body .mv-page .mv-video-meta h3 {
          display: block !important;

          flex: 1 1 auto !important;

          width: auto !important;
          min-width: 0 !important;

          height: 14px !important;
          min-height: 14px !important;
          max-height: 14px !important;

          margin: 0 !important;

          overflow: hidden !important;

          white-space: nowrap !important;

          font-size: 11px !important;
          line-height: 14px !important;
          font-weight: 800 !important;

          text-transform: uppercase !important;
        }

        html body .mv-page .mv-card-views {
          display: inline-flex !important;

          flex: 0 0 auto !important;

          align-items: center !important;

          height: 14px !important;

          margin: 0 !important;

          white-space: nowrap !important;
        }

        html body .mv-page .mv-card-details {
          box-sizing: border-box !important;

          display: flex !important;

          align-items: baseline !important;
          justify-content: space-between !important;

          gap: 8px !important;

          width: 100% !important;
          min-width: 0 !important;

          height: 12px !important;
          min-height: 12px !important;
          max-height: 12px !important;

          margin: 0 !important;

          overflow: hidden !important;
        }

        html body .mv-page .mv-card-artist {
          flex: 1 1 auto !important;

          min-width: 0 !important;

          height: 12px !important;

          margin: 0 !important;

          overflow: hidden !important;

          white-space: nowrap !important;
          text-overflow: ellipsis !important;

          font-size: 9px !important;
          line-height: 12px !important;
          font-weight: 500 !important;
        }

        html body .mv-page .mv-card-year {
          flex: 0 0 auto !important;

          height: 12px !important;

          white-space: nowrap !important;

          line-height: 12px !important;
        }


        /* ====================================================
           6. OVERFLOW-AWARE TITLE MARQUEE
           ONLY LONG TITLES MOVE.
           SHORT TITLES REMAIN COMPLETELY STILL.
           ==================================================== */

        html body .mv-page .mv-title-window {
          position: relative !important;

          display: block !important;

          width: 100% !important;
          max-width: 100% !important;

          height: 14px !important;

          overflow: hidden !important;

          white-space: nowrap !important;
        }

        html body .mv-page .mv-title-measure {
          position: absolute !important;

          left: 0 !important;
          top: 0 !important;

          visibility: hidden !important;

          width: max-content !important;

          pointer-events: none !important;

          white-space: nowrap !important;
        }

        html body .mv-page .mv-title-track {
          display: block;

          width: max-content;

          white-space: nowrap;

          will-change: transform;
        }

        html body .mv-page
        .mv-title-window.is-overflowing
        .mv-title-track {
          display: inline-flex !important;

          align-items: center !important;

          animation:
            mvCardTitleTicker
            9s
            linear
            infinite
          !important;
        }

        html body .mv-page .mv-title-gap {
          display: inline-block;

          margin: 0 22px;

          color: #d3ad3b;

          font-size: 7px;
        }

        @keyframes mvCardTitleTicker {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(calc(-50% - 11px));
          }
        }

        @media (prefers-reduced-motion: reduce) {
          html body .mv-page
          .mv-title-window.is-overflowing
          .mv-title-track {
            animation: none !important;
          }

          html body .mv-page .mv-title-window {
            text-overflow: ellipsis !important;
          }
        }


        /* ====================================================
           7. ARTISTS / COLLABORATORS
           Pull it directly underneath Earlier Work.
           ==================================================== */

        html body .mv-page .mv-collabs {
          min-height: 0 !important;
          height: auto !important;

          margin:
            0
            !important;

          padding:
            9px
            0
            9px
          !important;
        }

        html body .mv-page .mv-collabs > p {
          box-sizing: border-box !important;

          margin:
            0
            0
            6px
          !important;

          padding:
            0
            var(--mv-gutter)
          !important;
        }

        html body .mv-page .mv-collabs-window {
          margin: 0 !important;

          min-height: 0 !important;
        }


        /* ====================================================
           8. ARCHIVE
           Preserve its NON-scrollable wrapping grid.
           Tighten only the transition into it.
           ==================================================== */

        html body .mv-page .mv-library {
          box-sizing: border-box !important;

          width: min(1600px,100%) !important;

          min-height: 0 !important;
          height: auto !important;

          margin:
            0
            auto
          !important;

          padding:
            12px
            var(--mv-gutter)
            20px
          !important;
        }

        html body .mv-page .mv-library-head {
          margin: 0 0 7px !important;
          padding: 0 !important;
        }

        html body .mv-page .mv-library-head p {
          margin-top: 0 !important;
        }

        html body .mv-page .mv-archive-tools {
          margin:
            7px
            0
            8px
          !important;

          padding: 0 !important;
        }

        html body .mv-page .mv-result-count {
          margin:
            0
            0
            8px
          !important;
        }

        html body .mv-page #archive .mv-archive-grid {
          margin: 0 !important;

          padding: 0 !important;

          overflow: visible !important;

          align-items: start !important;
        }

        html body .mv-page
        #archive .mv-archive-grid
        > .mv-card {
          width: 100% !important;

          min-width: 0 !important;
          max-width: 100% !important;

          height: auto !important;

          overflow: hidden !important;
        }

        /*
          Archive cards share the EXACT same 16:9 + 28px metadata
          geometry as the horizontal catalogue cards.
        */
        html body .mv-page
        #archive .mv-archive-grid
        .mv-thumb {
          width: 100% !important;

          aspect-ratio: 16 / 9 !important;

          height: auto !important;
        }


        /* ====================================================
           9. EXPLORE BUTTON:
           Archive only.
           ==================================================== */

        html body .mv-page .mv-row .mv-expand {
          display: none !important;
        }

        html body .mv-page #archive .mv-expand {
          display: block !important;

          margin:
            14px
            auto
            2px
          !important;
        }


        /* ====================================================
           10. MOBILE
           ==================================================== */

        @media (max-width: 700px) {

          .mv-page {
            --mv-section-top: 10px;
            --mv-section-bottom: 8px;
          }

          html body .mv-page .mv-row-head {
            padding-bottom: 7px !important;
          }

          html body .mv-page .mv-track {
            padding-bottom: 2px !important;
          }

          html body .mv-page .mv-track .mv-card {
            flex-basis: 61vw !important;

            width: 61vw !important;
            min-width: 61vw !important;
            max-width: 61vw !important;
          }

          html body .mv-page .mv-million {
            padding-top: 10px !important;
            padding-bottom: 8px !important;
          }

          html body .mv-page .mv-timeline-label {
            padding-top: 8px !important;
          }

          html body .mv-page .mv-library {
            padding-top: 10px !important;
          }
        }

      `}</style>
      {/* KSP_FINAL_RHYTHM_END */}


      {/* KSP_FINAL_DETAIL_POLISH_START */}
      <style>{`

        /* ==================================================
           VIDEO METADATA — PULL CLOSER TO THUMBNAILS
           ================================================== */

        html body .mv-page .mv-video-meta {
          margin-top: 1px !important;
        }

        html body .mv-page .mv-video-meta-row {
          transform: translateY(-1px);
        }

        html body .mv-page .mv-card-details {
          transform: translateY(-4px);
        }

        /*
          Preserve the fixed metadata geometry.
          We are moving the content visually upward,
          NOT changing card heights.
        */
        html body .mv-page .mv-card-title,
        html body .mv-page .mv-card-artist,
        html body .mv-page .mv-card-year,
        html body .mv-page .mv-card-views {
          margin-top: 0 !important;
        }


        /* ==================================================
           MOST WATCHED — MATCH CATALOGUE GUTTERS
           ================================================== */

        html body .mv-page .mv-most-watched-track,
        html body .mv-page .mv-million-grid {
          box-sizing: border-box !important;

          padding-left: var(--mv-gutter) !important;
          padding-right: var(--mv-gutter) !important;

          width: 100% !important;
        }

        html body .mv-page .mv-million-head {
          padding-left: var(--mv-gutter) !important;
          padding-right: var(--mv-gutter) !important;
        }


        /* ==================================================
           SLIDING TITLES
           Keep exact existing behavior.
           ================================================== */

        html body .mv-page .mv-title-window {
          transform: translateY(-1px);
        }


        /* ==================================================
           CLEAN FINAL CTA
           ================================================== */

        html body .mv-page .mv-final-cta {
          box-sizing: border-box;

          width: min(
            1450px,
            calc(100% - (var(--mv-gutter) * 2))
          );

          margin:
            20px
            auto
            18px;

          padding:
            24px
            0
            22px;

          display: flex;

          align-items: flex-end;
          justify-content: space-between;

          gap: 30px;

          border-top:
            1px
            solid
            rgba(255,255,255,.12);

          position: relative;
          z-index: 3;
        }

        html body .mv-page .mv-final-cta-copy {
          min-width: 0;
        }

        html body .mv-page .mv-final-cta-copy p {
          margin:
            0
            0
            7px;

          color: #d3ad3b;

          font-size: 9px;
          line-height: 1;

          font-weight: 700;

          letter-spacing: .2em;

          text-transform: uppercase;
        }

        html body .mv-page .mv-final-cta-copy h2 {
          margin: 0;

          color: #fff;

          font-size:
            clamp(
              28px,
              3.5vw,
              52px
            );

          line-height: .92;

          font-weight: 800;

          letter-spacing: -.05em;

          text-transform: uppercase;
        }

        html body .mv-page .mv-final-cta-copy > span {
          display: block;

          margin-top: 8px;

          color: rgba(255,255,255,.52);

          font-size: 11px;
          line-height: 1.3;

          letter-spacing: .02em;
        }

        html body .mv-page .mv-final-cta-button {
          flex: 0 0 auto;

          min-height: 46px;

          padding:
            0
            19px;

          display: inline-flex;

          align-items: center;
          justify-content: center;

          gap: 18px;

          border:
            1px
            solid
            rgba(211,173,59,.72);

          color: #fff;

          background:
            rgba(5,5,5,.18);

          text-decoration: none;

          font-size: 9px;

          font-weight: 700;

          letter-spacing: .14em;

          text-transform: uppercase;

          transition:
            background .2s ease,
            border-color .2s ease;
        }

        html body .mv-page .mv-final-cta-button b {
          color: #d3ad3b;

          font-size: 13px;

          font-weight: 400;
        }

        @media (hover:hover) {
          html body .mv-page .mv-final-cta-button:hover {
            background:
              rgba(211,173,59,.08);

            border-color: #d3ad3b;
          }
        }


        /* ==================================================
           BOTTOM RHYTHM
           Archive → CTA → Footer
           ================================================== */

        html body .mv-page #archive {
          margin-bottom: 0 !important;
          padding-bottom: 12px !important;
        }

        html body .mv-page #archive .mv-expand {
          margin-bottom: 0 !important;
        }


        /* ==================================================
           MOBILE
           ================================================== */

        @media (max-width:700px) {

          html body .mv-page .mv-final-cta {
            width:
              calc(
                100% -
                44px
              );

            margin-top: 15px;

            padding:
              20px
              0;

            display: block;
          }

          html body .mv-page .mv-final-cta-copy h2 {
            font-size: 32px;
          }

          html body .mv-page .mv-final-cta-button {
            margin-top: 18px;

            width: 100%;

            justify-content: space-between;

            box-sizing: border-box;
          }

        }

      `}</style>
      {/* KSP_FINAL_DETAIL_POLISH_END */}


      {/* KSP_PIXEL_ALIGNMENT_START */}
      <style>{`

        /* ================================================
           FINAL PIXEL ALIGNMENT
           ================================================ */

        /*
          Every catalogue heading now has the SAME distance
          to the thumbnails beneath it.
        */
        html body .mv-page .mv-row-head,
        html body .mv-page .mv-million-head {
          margin-bottom: 0 !important;
          padding-bottom: 6px !important;
        }

        html body .mv-page .mv-row-head + .mv-scroll-rail > .mv-track,
        html body .mv-page .mv-million-head + .mv-scroll-rail > .mv-million-grid {
          margin-top: 0 !important;
        }


        /* ================================================
           MOST WATCHED LEFT / RIGHT ALIGNMENT

           Do not use internal padding here.
           Give the actual rail the same outside gutter as
           every other catalogue rail.
           ================================================ */

        html body .mv-page .mv-most-watched-track {
          box-sizing: border-box !important;

          width: auto !important;

          margin-left: var(--mv-gutter) !important;
          margin-right: var(--mv-gutter) !important;

          padding-left: 0 !important;
          padding-right: 0 !important;
        }

        /*
          Most Watched heading already uses the normal gutter.
          Keep it on the exact same axis as the cards.
        */
        html body .mv-page .mv-million-head {
          padding-left: var(--mv-gutter) !important;
          padding-right: var(--mv-gutter) !important;
        }


        /* ================================================
           NORMAL ROWS:
           eliminate any leftover invisible top spacing.
           ================================================ */

        html body .mv-page .mv-track {
          padding-top: 0 !important;
        }


        /* ================================================
           BOTTOM CTA COPY
           Keep the added sentence elegant, not paragraph-y.
           ================================================ */

        html body .mv-page .mv-final-cta-copy > span {
          max-width: 560px;

          margin-top: 9px !important;

          font-size: 11px !important;
          line-height: 1.45 !important;

          color: rgba(255,255,255,.56) !important;
        }


        @media (max-width:700px) {

          html body .mv-page .mv-row-head,
          html body .mv-page .mv-million-head {
            padding-bottom: 5px !important;
          }

          html body .mv-page .mv-most-watched-track {
            margin-left: var(--mv-gutter) !important;
            margin-right: var(--mv-gutter) !important;
          }

          html body .mv-page .mv-final-cta-copy > span {
            max-width: 100%;
          }

        }

      `}</style>
      {/* KSP_PIXEL_ALIGNMENT_END */}


      {/* KSP_FINAL_20260907_START */}
      <style>{`

        /* =================================================
           FINAL MOST WATCHED GEOMETRY

           Same page gutter as Recent / 2020s / Earlier Work.
           Full horizontal scrolling area.
           Last card can scroll completely into view.
           ================================================= */

        html body .mv-page .mv-million {
          box-sizing: border-box !important;
          width: 100% !important;
          max-width: none !important;

          margin-left: 0 !important;
          margin-right: 0 !important;

          overflow: visible !important;
        }

        html body .mv-page .mv-million-head {
          box-sizing: border-box !important;

          width: 100% !important;

          padding-left:
            clamp(25px,4vw,65px)
            !important;

          padding-right:
            clamp(25px,4vw,65px)
            !important;
        }

        html body .mv-page .mv-most-watched-track {
          box-sizing: border-box !important;

          display: flex !important;
          flex-wrap: nowrap !important;

          justify-content: flex-start !important;
          align-items: stretch !important;

          width: 100% !important;
          max-width: none !important;

          margin: 0 !important;

          padding:
            0
            clamp(25px,4vw,65px)
            4px
            clamp(25px,4vw,65px)
            !important;

          gap: 10px !important;

          overflow-x: auto !important;
          overflow-y: hidden !important;

          scroll-snap-type:
            x proximity !important;

          scroll-padding-inline:
            clamp(25px,4vw,65px)
            !important;

          scrollbar-width: none !important;
          -webkit-overflow-scrolling: touch;
        }

        html body
        .mv-page
        .mv-most-watched-track::-webkit-scrollbar {
          display: none !important;
        }

        html body
        .mv-page
        .mv-most-watched-track
        > .mv-million-card {

          flex:
            0 0
            clamp(300px,31vw,470px)
            !important;

          width:
            clamp(300px,31vw,470px)
            !important;

          min-width:
            clamp(300px,31vw,470px)
            !important;

          max-width:
            clamp(300px,31vw,470px)
            !important;

          scroll-snap-align: start !important;
        }


        /* Give the scroll rail a true right-end gutter. */
        html body
        .mv-page
        .mv-most-watched-track::after {

          content: "" !important;

          display: block !important;

          flex:
            0 0
            clamp(15px,2vw,32px)
            !important;
        }


        @media(max-width:700px) {

          html body
          .mv-page
          .mv-most-watched-track
          > .mv-million-card {

            flex:
              0 0
              76vw
              !important;

            width:
              76vw
              !important;

            min-width:
              76vw
              !important;

            max-width:
              76vw
              !important;
          }

        }

      `}</style>
      {/* KSP_FINAL_20260907_END */}

</main>
  );
}

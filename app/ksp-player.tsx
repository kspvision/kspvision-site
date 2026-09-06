"use client";

import { createContext, useCallback, useContext, useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import { createPortal, flushSync } from "react-dom";
import { Localized } from "./site-language";
import { videoSource, type KSPVideo } from "./video-source";
import "./ksp-player.css";

const PlayerContext = createContext<((video: KSPVideo, trigger: HTMLElement) => void) | null>(null);

export function KSPPlayerProvider({ children }: { children: ReactNode }) {
  const [selection, setSelection] = useState<{ video: KSPVideo; returnFocus: HTMLElement } | null>(null);
  const open = useCallback((video: KSPVideo, returnFocus: HTMLElement) => setSelection({ video, returnFocus }), []);
  const close = useCallback(() => setSelection(null), []);
  return <PlayerContext.Provider value={open}>
    {children}
    {selection && <KSPPlayer key={`${selection.video.sourceType}:${selection.video.source}`} video={selection.video} onClose={close} returnFocus={selection.returnFocus} />}
  </PlayerContext.Provider>;
}

/** An ordinary link without JS; opens the shared player on an unmodified click/tap. */
export function KSPPlayerLink({ video, className, children }: {
  video: KSPVideo; className?: string; children: ReactNode;
}) {
  const open = useContext(PlayerContext);
  const source = videoSource(video);
  return <a className={className} href={source?.external || video.source}
    target="_blank" rel="noreferrer" aria-haspopup={source && open ? "dialog" : undefined}
    onClick={(event) => {
      if (!source || !open || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
      event.preventDefault();
      // Mount the iframe during the original tap/click; keep audible autoplay enabled.
      flushSync(() => open(video, event.currentTarget));
    }}>{children}</a>;
}

export function KSPPlayer({ video, onClose, returnFocus }: { video: KSPVideo; onClose: () => void; returnFocus?: HTMLElement | null }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [failed, setFailed] = useState(false);
  const source = useMemo(() => videoSource(video), [video]);

  useEffect(() => {
    const element = dialog.current;
    if (!element || !source) return;
    const previouslyFocused = returnFocus || document.activeElement as HTMLElement | null;
    const x = window.scrollX;
    const y = window.scrollY;
    const body = document.body;
    const saved = { position: body.style.position, top: body.style.top, left: body.style.left,
      width: body.style.width, overflow: body.style.overflow, paddingRight: body.style.paddingRight };
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const padding = parseFloat(getComputedStyle(body).paddingRight) || 0;
    Object.assign(body.style, { position: "fixed", top: `-${y}px`, left: `-${x}px`,
      width: "100%", overflow: "hidden", paddingRight: `${padding + scrollbar}px` });
    element.showModal();
    return () => {
      element.close();
      Object.assign(body.style, saved);
      // Temporarily bypass site-wide smooth scrolling to restore the exact position.
      const root = document.documentElement;
      const scrollBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      window.scrollTo(x, y);
      root.style.scrollBehavior = scrollBehavior;
      if (previouslyFocused?.isConnected) previouslyFocused.focus({ preventScroll: true });
    };
  }, [source, returnFocus]);

  if (!source) return null;
  return createPortal(
    <dialog ref={dialog} className="ksp-player" aria-labelledby={titleId}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClose={onClose}>
      <div className="ksp-player-panel">
        <div className="ksp-player-topbar">
          <span className="ksp-player-brand">KSP VISION</span>
          <button type="button" className="ksp-player-close" onClick={onClose}>
            <Localized en="Close" fr="Fermer" /> <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="ksp-player-screen">
          {video.sourceType === "youtube" ?
            <iframe src={source.playback} title={video.title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /> :
            // Existing silent reels may have no captions; render tracks only when supplied.
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <video src={source.playback} poster={video.poster} controls autoPlay playsInline preload="metadata"
              aria-label={video.title} onError={() => setFailed(true)}>
              {video.captions && <track kind="captions" src={video.captions} srcLang={video.captionsLanguage || "en"} default />}
            </video>}
        </div>
        <div className="ksp-player-caption">
          <div><h2 id={titleId}>{video.title}</h2>{video.artist && <p>{video.artist}</p>}</div>
          <a href={source.external} target="_blank" rel="noopener noreferrer">
            {video.sourceType === "youtube" ? <Localized en="Watch on YouTube ↗" fr="Voir sur YouTube ↗" /> :
              <Localized en="Open video ↗" fr="Ouvrir la vidéo ↗" />}
          </a>
        </div>
        {failed && <p className="ksp-player-error" role="status">
          <Localized en="This video could not load. Try opening it directly using the link above."
            fr="La vidéo n’a pas pu être chargée. Essayez le lien ci-dessus pour l’ouvrir directement." />
        </p>}
      </div>
    </dialog>, document.body);
}

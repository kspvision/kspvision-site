"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Localized } from "./site-language";

export function WeddingGallery({ photos }: { photos: string[][] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const isOpen = selected !== null;
  useEffect(() => {
    if (!isOpen) return;
    const el = dialog.current;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    el?.showModal();
    return () => {
      el?.close();
      document.body.style.overflow = overflow;
      trigger.current?.focus({ preventScroll: true });
    };
  }, [isOpen]);
  return <>
    <div className="weddingGalleryGrid">
      {photos.map(([src, alt], index) => <a className="weddingGalleryLink weddingGalleryItem"
        key={src} href={src} aria-label={`Open ${alt}`} aria-haspopup="dialog"
        onClick={event => {
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
          event.preventDefault(); trigger.current = event.currentTarget; setSelected(index);
        }}><img src={src} alt={alt} loading="lazy" /></a>)}
    </div>
    {selected !== null && createPortal(<dialog className="wedding-lightbox" ref={dialog}
      aria-label={photos[selected][1]} onCancel={event => {event.preventDefault(); setSelected(null);}}
      onClose={() => setSelected(null)}>
      <div className="wedding-lightbox-bar"><span>{selected + 1} / {photos.length}</span>
        <button type="button" onClick={() => setSelected(null)}><Localized en="Close" fr="Fermer" /> ×</button></div>
      <img src={photos[selected][0]} alt={photos[selected][1]} />
      <div className="wedding-lightbox-controls">
        <button type="button" disabled={selected === 0} onClick={() => setSelected(selected - 1)}><Localized en="Previous" fr="Précédente" /></button>
        <button type="button" disabled={selected === photos.length - 1} onClick={() => setSelected(selected + 1)}><Localized en="Next" fr="Suivante" /></button>
      </div>
    </dialog>, document.body)}
  </>;
}

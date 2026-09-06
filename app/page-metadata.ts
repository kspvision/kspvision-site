import type { Metadata } from "next";

export function pageMetadata(path: string, title: string, description: string): Metadata {
  return {
    title: { absolute: title }, description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type: "website", locale: "en_CA", images: [{ url: "/og.png", width: 1200, height: 630, alt: "KSP Vision" }] },
    twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  };
}

import Home from "./home";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KSP VISION — Production · Cinematography · Post-Production",
  description:
    "Cinematic films, music videos, documentaries and branded stories from Montréal.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "KSP VISION — Production · Cinematography · Post-Production",
    description:
      "Cinematic films, music videos, documentaries and branded stories from Montréal.",
    url: "/",
    type: "website",
    locale: "en_CA",
    images: [
      {
        url: "/og-ksp-vision.png?v=20260916",
        width: 1200,
        height: 630,
        alt: "KSP Vision | Production, Cinematography, Post-production",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KSP VISION — Production · Cinematography · Post-Production",
    description:
      "Cinematic films, music videos, documentaries and branded stories from Montréal.",
    images: ["/og-ksp-vision.png?v=20260916"],
  },
};

export default Home;

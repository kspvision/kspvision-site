import { KSPPlayerProvider } from "./ksp-player";
import "./catalogue-polish.css";
import type { Metadata } from "next";
import "./globals.css";
import "./session-polish.css";
import "./responsive-permanent.css";
import "./v2-refinement.css";

export const metadata: Metadata = {
  title: { default: "KSP Vision | Film Production in Montréal", template: "%s | KSP Vision" },
  description: "Production, cinematography and post-production by Kevin Shayne. Visual stories designed to make an impact.",
  icons: {
    icon: [{ url: "/ksp-favicon.png", type: "image/png" }],
    shortcut: "/ksp-favicon.png",
    apple: "/ksp-favicon.png",
  },
  metadataBase: new URL("https://kspvision.ca"),
  openGraph: { title: "KSP Vision | Film Production in Montréal", description: "Production, cinematography and post-production for music, brands, documentaries and weddings.", type: "website", locale: "en_CA", images: [{ url: "/og.png", width: 1200, height: 630, alt: "KSP Vision | Production, Cinematography, Post-production" }] },
  twitter: { card: "summary_large_image", title: "KSP Vision | Film Production in Montréal", description: "Production, cinematography and post-production for music, brands, documentaries and weddings.", images: ["/og.png"] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><KSPPlayerProvider>{children}</KSPPlayerProvider></body></html>;
}

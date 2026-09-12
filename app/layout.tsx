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


const kspStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://kspvision.ca/#website",
      url: "https://kspvision.ca/",
      name: "KSP Vision",
      description:
        "Film production, cinematography and post-production in Montréal for music videos, weddings, brands and documentaries.",
      inLanguage: ["en-CA", "fr-CA"],
      publisher: {
        "@id": "https://kspvision.ca/#organization",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://kspvision.ca/#organization",
      name: "KSP Vision",
      legalName: "KSP Vision Inc.",
      url: "https://kspvision.ca/",
      logo: {
        "@type": "ImageObject",
        url: "https://kspvision.ca/ksp-vision-logo.png",
      },
      image: "https://kspvision.ca/og.png",
      description:
        "Montréal production company working across music videos, weddings, brand films, documentaries, cinematography and post-production.",
      email: "bookings@kspvision.ca",
      founder: {
        "@id": "https://kspvision.ca/#kevin-shayne",
      },
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Québec, Canada",
      },
    },
    {
      "@type": "Person",
      "@id": "https://kspvision.ca/#kevin-shayne",
      name: "Kevin Shayne",
      url: "https://kspvision.ca/about",
      jobTitle: "Founder & Creative Director",
      worksFor: {
        "@id": "https://kspvision.ca/#organization",
      },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          id="ksp-vision-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(kspStructuredData) }}
        />
      </head>
      <body>
        <KSPPlayerProvider>{children}</KSPPlayerProvider>
      </body>
    </html>
  );
}

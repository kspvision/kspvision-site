import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KSP Vision — Audiovisual production in Montréal",
  description: "Production, cinematography and post-production by Kevin Sanelus. Visual stories designed to make an impact.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

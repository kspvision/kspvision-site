import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mira Bridal Makeup Montréal",
  description: "Bridal and special-event makeup by Mira in Montréal, with application and finished-look portfolios.",
  openGraph: {
    title: "Mira Bridal Makeup Montréal",
    description: "Soft, polished and camera-ready bridal beauty by Mira.",
    images: [{ url: "/mira/final/final-1.jpg", alt: "Completed bridal makeup by Mira" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mira Bridal Makeup Montréal",
    description: "Soft, polished and camera-ready bridal beauty by Mira.",
    images: ["/mira/final/final-1.jpg"],
  },
};

const application = [1, 2, 3, 4].map((number) => [
  `/mira/final/application-${number}.jpg`,
  `Mira bridal makeup application, view ${number}`,
]);
const finished = [1, 2, 3, 4].map((number) => [
  `/mira/final/final-${number}.jpg`,
  `Completed bridal makeup by Mira, portrait ${number}`,
]);
const rates = [
  ["Bridal makeup", "$175"],
  ["Bridal trial", "$110"],
  ["Bride + trial", "$265"],
  ["Bridal party / guest", "$120 per person"],
  ["Special-event makeup", "$125"],
];

export default function MiraPage() {
  return <main className="detailPage weddingPage miraPage">
    <header className="detailNav"><a className="brand" href="/" aria-label="KSP Vision home"><span>KSP</span> VISION</a><nav className="mainNav" aria-label="Main navigation"><a href="/music-videos">Music Videos</a><a href="/weddings">Weddings</a><a href="/brand-documentary">Brand / Doc</a><a href="/booking" className="navCta">Book</a></nav></header>
    <section className="miraSection" aria-labelledby="mira-page-heading">
      <div className="miraLead"><img src="/mira/final/mira-working.jpg" alt="Mira applying bridal eye makeup" /><div className="miraLeadCopy"><p className="miraEyebrow">Bridal + event makeup</p><h1 id="mira-page-heading" className="miraTitle">MIRA</h1><p className="miraLocation">Montréal + surroundings</p><p className="miraNameNote"><strong>Mira is her professional name.</strong></p><p>Soft, polished and camera-ready beauty tailored to your features, your comfort and the feeling of your celebration.</p><a className="button miraButton" href="mailto:divya.vila91@gmail.com?subject=Makeup%20booking%20with%20Mira">Book Mira by email ↗</a></div></div>
      <div className="miraProofGroup"><h2><span>01</span> Before + application</h2><div className="miraPortfolio">{application.map(([src, alt]) => <a href={src} target="_blank" rel="noreferrer" aria-label={`Open full-size photo: ${alt}`} key={src}><img src={src} alt={alt} /></a>)}</div></div>
      <div className="miraProofGroup"><h2><span>02</span> The finished look</h2><div className="miraPortfolio">{finished.map(([src, alt]) => <a href={src} target="_blank" rel="noreferrer" aria-label={`Open full-size photo: ${alt}`} key={src}><img src={src} alt={alt} /></a>)}</div></div>
      <div className="miraRates"><div><p className="miraEyebrow">Services</p><h2>Launch rates</h2><p>Starting rates in Canadian dollars. Travel outside Montréal is quoted according to distance.</p></div><div className="miraRateList">{rates.map(([service, price]) => <div key={service}><span>{service}</span><strong>{price}</strong></div>)}</div></div>
      <p className="miraContact">Availability and quotes: <a href="mailto:divya.vila91@gmail.com">divya.vila91@gmail.com</a></p>
    </section>
    <footer><a className="brand" href="/"><span>KSP</span> VISION</a><p>Bridal + event makeup · Montréal</p><p><a href="/weddings">Wedding films by KSP Vision ↗</a></p></footer>
  </main>;
}

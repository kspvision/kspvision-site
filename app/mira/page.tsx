import type { Metadata } from "next";
import { Localized, SiteFooter, SiteHeader } from "../site-language";
import { MiraTheme } from "./mira-theme";

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
const gallery = [
  ["/mira/gallery/gallery-01.jpeg", "Evening makeup look by Mira"],
  ["/mira/gallery/gallery-02.jpg", "Mira applying bridal eye makeup"],
  ["/mira/gallery/gallery-03.jpg", "Bride wearing makeup by Mira during her ceremony"],
  ["/mira/gallery/gallery-04.jpg", "Bridal makeup by Mira in natural light"],
  ["/mira/gallery/gallery-05.jpg", "Formal evening makeup by Mira"],
  ["/mira/gallery/gallery-07.jpg", "Mira applying the finishing touches to a bride"],
  ["/mira/gallery/gallery-08.jpg", "Mira preparing a bride on her wedding morning"],
  ["/mira/gallery/gallery-09.jpeg", "Bride and groom portrait featuring makeup by Mira"],
  ["/mira/gallery/gallery-10.jpeg", "Soft bridal makeup beneath the veil"],
  ["/mira/gallery/gallery-11.jpeg", "Close portrait of bridal makeup by Mira"],
  ["/mira/gallery/gallery-12.jpeg", "Finished bridal makeup portrait by Mira"],
];
const rates = [
  ["Bridal makeup", "$175"],
  ["Bridal trial", "$110"],
  ["Bride + trial", "$265"],
  ["Bridal party / guest", "$120 per person"],
  ["Special-event makeup", "$125"],
];

export default function MiraPage() {
  return <MiraTheme><main className="detailPage weddingPage miraPage">
    <SiteHeader />
    <section className="miraSection" aria-labelledby="mira-page-heading">
      <div className="miraLead"><img src="/mira/final/mira-working.jpg" alt="Mira appliquant du maquillage de mariée" /><div className="miraLeadCopy"><p className="miraEyebrow"><Localized en="Bridal + event makeup" fr="Maquillage mariage + événement"/></p><h1 id="mira-page-heading" className="miraTitle">MIRA</h1><p className="miraLocation">Montréal + <Localized en="surroundings" fr="environs"/></p><p className="miraNameNote"><strong><Localized en="Mira is her professional name." fr="Mira est son nom professionnel."/></strong></p><p><Localized en="Soft, polished and camera-ready beauty tailored to your features, your comfort and the feeling of your celebration." fr="Un maquillage doux, soigné et prêt pour la caméra, adapté à vos traits, votre confort et l’esprit de votre célébration."/></p><a className="button miraButton" href="mailto:divya.vila91@gmail.com?subject=Makeup%20booking%20with%20Mira"><Localized en="Book Mira by email" fr="Réserver Mira par courriel"/> ↗</a></div></div>
      <div className="miraProofGroup"><h2><span>01</span> <Localized en="Before + application" fr="Avant + application"/></h2><div className="miraPortfolio">{application.map(([src, alt]) => <a href={src} target="_blank" rel="noreferrer" aria-label={`Open full-size photo: ${alt}`} key={src}><img src={src} alt={alt} /></a>)}</div></div>
      <div className="miraProofGroup"><h2><span>02</span> <Localized en="The finished look" fr="Le résultat final"/></h2><div className="miraPortfolio">{finished.map(([src, alt]) => <a href={src} target="_blank" rel="noreferrer" aria-label={`Open full-size photo: ${alt}`} key={src}><img src={src} alt={alt} /></a>)}</div></div>
      <div className="miraProofGroup miraGalleryGroup"><div className="miraGalleryHeading"><h2><span>03</span> <Localized en="Selected work" fr="Travaux sélectionnés"/></h2><p><Localized en="Bridal mornings, finished portraits and event beauty. A wider look at Mira’s work." fr="Matins de mariage, portraits finis et beauté événementielle. Un aperçu plus large du travail de Mira."/></p></div><div className="miraPortfolio miraGallery">{gallery.map(([src, alt]) => <a href={src} target="_blank" rel="noreferrer" aria-label={`Open full-size photo: ${alt}`} key={src}><img src={src} alt={alt} /></a>)}</div></div>
      <div className="miraRates"><div><p className="miraEyebrow"><Localized en="Services" fr="Services"/></p><h2><Localized en="Launch rates" fr="Tarifs de lancement"/></h2><p><Localized en="Starting rates in Canadian dollars. Travel outside Montréal is quoted according to distance." fr="Tarifs de départ en dollars canadiens. Les déplacements hors Montréal sont calculés selon la distance."/></p></div><div className="miraRateList">{rates.map(([service, price]) => <div key={service}><span><Localized en={service} fr={service==="Bridal makeup"?"Maquillage de mariée":service==="Bridal trial"?"Essai mariage":service==="Bride + trial"?"Mariée + essai":service==="Bridal party / guest"?"Cortège / invitée":"Maquillage événementiel"}/></span><strong>{price.replace("per person","par personne")}</strong></div>)}</div></div>
      <p className="miraContact"><Localized en="Availability and quotes:" fr="Disponibilités et devis :"/> <a href="mailto:divya.vila91@gmail.com">divya.vila91@gmail.com</a></p>
    </section>
    <SiteFooter />
  </main></MiraTheme>;
}

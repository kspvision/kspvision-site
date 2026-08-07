type WorkPageProps = { label: string; title: string; description: string; services: string[]; tone: string };

export function WorkPage({ label, title, description, services, tone }: WorkPageProps) {
  return <main className="detailPage">
    <aside className="previewNotice">Preview edition — selected projects are being updated</aside>
    <header className="detailNav"><a className="brand" href="/" aria-label="KSP Vision home"><span>KSP</span> VISION</a><nav className="mainNav" aria-label="Main navigation"><a href="/music-videos">Music Videos</a><a href="/brand-documentary">Brand / Doc</a><a href="/weddings">Weddings</a><a href="/booking" className="navCta">Book</a></nav></header>
    <section className={`detailHero ${tone}`}><p className="kicker">{label}</p><h1>{title}</h1><p>{description}</p><a className="button gold" href="/booking">Discuss your project ↗</a></section>
    <section className="detailServices"><p className="kicker">Included services</p><div>{services.map((service, index)=><article key={service}><span>0{index+1}</span><h2>{service}</h2></article>)}</div></section>
    <section className="detailPlaceholder"><p className="kicker">Start a conversation</p><h2>Have a story worth telling?</h2><p>Share the objective, audience and ideal timeline. KSP Vision will shape the right production approach around the project.</p><a className="textLink" href="/booking">Request availability <b>↗</b></a></section>
    <footer><a className="brand" href="/"><span>KSP</span> VISION</a><p>Production · Cinematography · Post-production</p><p>Montréal, Québec</p></footer>
  </main>;
}

type WorkPageProps = { label: string; title: string; description: string; services: string[]; tone: string };

export function WorkPage({ label, title, description, services, tone }: WorkPageProps) {
  return <main className="detailPage">
    <header className="detailNav"><a className="brand" href="/"><span>KSP</span> VISION</a><nav className="mainNav"><a href="/music-videos">Music Videos</a><a href="/brand-documentary">Brand / Doc</a><a href="/weddings">Weddings</a><a href="/booking" className="navCta">Book</a></nav></header>
    <section className={`detailHero ${tone}`}><p className="kicker">{label}</p><h1>{title}</h1><p>{description}</p><a className="button gold" href="/booking">Discuss your project ↗</a></section>
    <section className="detailServices"><p className="kicker">Included services</p><div>{services.map((service, index)=><article key={service}><span>0{index+1}</span><h2>{service}</h2></article>)}</div></section>
    <section className="detailPlaceholder"><p className="kicker">Selected work</p><h2>Projects will appear here.</h2><p>Final thumbnails and video links can be added when your selection is ready.</p></section>
    <footer><a className="brand" href="/"><span>KSP</span> VISION</a><p>Production · Cinematography · Post-production</p><p>Montréal, Québec</p></footer>
  </main>;
}

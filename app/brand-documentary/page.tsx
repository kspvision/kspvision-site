const projects = [
  { title: "Barbancourt", type: "Commercial film", youtubeId: "hNRG8NT3sRs" },
  { title: "Fragrance", type: "Product campaign", youtubeId: "FYL9RmYlZ6U" },
];

export default function Page(){return <main className="detailPage brandPage">
  <aside className="previewNotice">Preview edition — selected projects are being updated</aside>
  <header className="detailNav"><a className="brand" href="/" aria-label="KSP Vision home"><span>KSP</span> VISION</a><nav className="mainNav" aria-label="Main navigation"><a href="/music-videos">Music Videos</a><a href="/weddings">Weddings</a><a className="activeNav" href="/brand-documentary">Brand / Doc</a><a href="/booking" className="navCta">Book</a></nav></header>
  <section className="detailHero toneBrand"><p className="kicker">Brand & documentary</p><h1>Stories with purpose.</h1><p>Commercial films, portraits and documentary content made to communicate clearly, feel authentic and stay memorable.</p><a className="button gold" href="/booking">Start a project ↗</a></section>
  <section className="brandCollection"><div className="weddingSectionHead"><div><p className="kicker">Selected work</p><h2>Commercial stories</h2></div><p>Two selected campaigns for this preview. More brand and documentary work will be added to the collection.</p></div>
    <div className="brandGrid">{projects.map(project=><article className="brandFilm" key={project.title}><div className="videoEmbed"><iframe src={`https://www.youtube-nocookie.com/embed/${project.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${project.youtubeId}&controls=1&rel=0`} title={`${project.title} — ${project.type}`} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div><div><p>{project.type}</p><h3>{project.title}</h3></div></article>)}</div>
  </section>
  <section className="brandCapabilities"><p className="kicker">Complete production</p><div>{["Creative strategy","Production","Interviews & cinematography","Post-production"].map((item,index)=><article key={item}><span>0{index+1}</span><h2>{item}</h2></article>)}</div></section>
  <footer><a className="brand" href="/"><span>KSP</span> VISION</a><p>Production · Cinematography · Post-production</p><p>Montréal, Québec</p></footer>
</main>}

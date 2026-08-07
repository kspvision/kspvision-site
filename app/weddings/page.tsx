const films = [
  { title: "Smith & Aureanne", role: "Featured wedding film", className: "featured", src: "/weddings/smith-aureanne.mp4" },
  { title: "Ralph & Evelyne", role: "Wedding highlight", className: "", src: "/weddings/ralph-evelyne.mp4" },
  { title: "Suffrard & Florence", role: "Wedding highlight", className: "", src: "/weddings/suffrard-florence.mp4" },
];

export default function WeddingsPage() {
  return <main className="detailPage weddingPage">
    <aside className="previewNotice">Preview edition — portfolio updates in progress</aside>
    <header className="detailNav"><a className="brand" href="/"><span>KSP</span> VISION</a><nav className="mainNav"><a href="/music-videos">Music Videos</a><a href="/brand-documentary">Brand / Doc</a><a href="/weddings">Weddings</a><a href="/booking" className="navCta">Book</a></nav></header>
    <section className="detailHero toneWedding weddingHero"><p className="kicker">Wedding films · Montréal & beyond</p><h1>More than a day.<br/><em>A feeling, preserved.</em></h1><p>Intimate, cinematic wedding films shaped around the people, gestures and moments that make your celebration yours.</p><a className="button gold" href="/booking">Tell us about your day ↗</a></section>
    <section className="weddingFilms"><div className="weddingSectionHead"><div><p className="kicker">Selected celebrations</p><h2>Wedding stories</h2></div><p>Three stories. Three distinct celebrations. Each film is approached with intention, discretion and a documentary eye.</p></div>
      <div className="weddingGrid">{films.map((film, index) => <article className={`weddingFilm ${film.className}`} key={film.title}><div className="weddingVisual"><video src={film.src} muted loop autoPlay playsInline preload="metadata"/><span className="filmNumber">0{index + 1}</span><span className="filmStatus">Real wedding film</span></div><div className="weddingMeta"><div><p>{film.role}</p><h3>{film.title}</h3></div><span>Film preview</span></div></article>)}</div>
    </section>
    <section className="weddingExperience"><p className="kicker">The experience</p><div><article><span>01</span><h2>Before</h2><p>A thoughtful conversation about your people, your priorities and how you want the day to feel.</p></article><article><span>02</span><h2>During</h2><p>Calm, unobtrusive coverage that lets genuine moments unfold without turning the day into a production.</p></article><article><span>03</span><h2>Forever</h2><p>A carefully shaped film with emotional pacing, polished colour and sound, made to be revisited.</p></article></div></section>
    <section className="weddingCta"><p className="kicker">Now booking</p><h2>Your story deserves<br/>to feel like yours.</h2><a className="button gold" href="/booking">Check availability ↗</a></section>
    <footer><a className="brand" href="/"><span>KSP</span> VISION</a><p>Production · Cinematography · Post-production</p><p>Montréal, Québec</p></footer>
  </main>;
}

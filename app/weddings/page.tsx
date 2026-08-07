const films = [
  { title: "Smith & Aureanne", role: "Featured wedding film", youtubeId: "kCRAeRvvy4M", featured: true },
  { title: "Ralph & Evelyne", role: "Wedding highlight", youtubeId: "uMIXszAhhdw" },
  { title: "Suffrard & Florence", role: "Wedding highlight", youtubeId: "bpbGlC9mAX0" },
];
const gallery = [
  ["/weddings/smith-rings.jpg","Smith & Aureanne exchanging rings"], ["/weddings/ralph-prep.jpg","Wedding-day preparation"],
  ["/weddings/smith-party.jpg","Smith & Aureanne with their wedding party"], ["/weddings/ralph-bride.jpg","Bride portrait in the forest"],
  ["/weddings/suffrard-dress.jpg","Wedding dress detail"], ["/weddings/suffrard-ceremony.jpg","Wedding ceremony"],
];

export default function WeddingsPage() {
  return <main className="detailPage weddingPage">
    <aside className="previewNotice">Preview edition — portfolio updates in progress</aside>
    <header className="detailNav"><a className="brand" href="/" aria-label="KSP Vision home"><span>KSP</span> VISION</a><nav className="mainNav" aria-label="Main navigation"><a href="/music-videos">Music Videos</a><a className="activeNav" href="/weddings">Weddings</a><a href="/brand-documentary">Brand / Doc</a><a href="/booking" className="navCta">Book</a></nav></header>
    <section className="weddingIntro"><div><p className="kicker">Wedding films · Montréal & beyond</p><h1>More than a day.<br/><em>A feeling, preserved.</em></h1><p>Intimate, cinematic wedding films shaped around the people, gestures and moments that make your celebration yours.</p><a className="button gold" href="/booking">Tell us about your day ↗</a></div><img src="/weddings/smith-party.jpg" alt="Smith and Aureanne surrounded by their wedding party" /></section>
    <section className="weddingFilms"><div className="weddingSectionHead"><div><p className="kicker">Selected celebrations</p><h2>Wedding stories</h2></div><p>Three distinct celebrations, filmed with intention, discretion and a documentary eye.</p></div>
      <div className="weddingVideoGrid">{films.map((film)=><article className={film.featured ? "featuredWeddingVideo" : ""} key={film.title}><div className="videoEmbed"><iframe src={`https://www.youtube-nocookie.com/embed/${film.youtubeId}?rel=0`} title={`${film.title} wedding film`} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div><div className="weddingMeta"><div><p>{film.role}</p><h3>{film.title}</h3></div><span>Watch film</span></div></article>)}</div>
    </section>
    <section className="weddingGallery"><div className="weddingSectionHead"><div><p className="kicker">In the details</p><h2>Moments, preserved</h2></div><p>Quiet preparations, shared glances and the people who made each celebration unforgettable.</p></div><div>{gallery.map(([src,alt],i)=><figure className={`galleryItem galleryItem${i+1}`} key={src}><img src={src} alt={alt}/></figure>)}</div></section>
    <section className="weddingExperience"><p className="kicker">The experience</p><div><article><span>01</span><h2>Before</h2><p>A thoughtful conversation about your people, your priorities and how you want the day to feel.</p></article><article><span>02</span><h2>During</h2><p>Calm, unobtrusive coverage that lets genuine moments unfold without turning the day into a production.</p></article><article><span>03</span><h2>Forever</h2><p>A carefully shaped film with emotional pacing, polished colour and sound, made to be revisited.</p></article></div></section>
    <section className="weddingCta"><p className="kicker">Now booking</p><h2>Your story deserves<br/>to feel like yours.</h2><a className="button gold" href="/booking">Check availability ↗</a></section>
    <footer><a className="brand" href="/"><span>KSP</span> VISION</a><p>Production · Cinematography · Post-production</p><p>Montréal, Québec</p></footer>
  </main>;
}

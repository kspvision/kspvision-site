const videos=[
  ["foENa43ZOvc","Tizzo x Shreez — Kreyday Everyday","Recent · 75K views"],
  ["lpm-NBRsNGM","Ti Juice — Appel / Get Busy","Selected work"],
  ["_pGbFSSgh_o","AK Green — Focus sur mes plans","Recent · KSP Films"],
  ["9iQLjcR6stY","Ti Juice — Écriture Sale 2","26K views"],
  ["oxMC068NZTs","Enima ft. Russkov — Cette Nuit","Selected archive"],
  ["zn6t267flQs","Enima — Intro","Selected archive"],
  ["6PgAanYdKg8","Enima — MMS (Power Remix)","Selected archive"],
  ["1QHbt4cGNkc","Tizzo x Shreez x Soft — On Fouette","1.6M views"],
  ["4PiqS4zQTLI","Tizzo x Shreez x Soft — Dragon","KSP Films"],
  ["F1VzsoBr03Y","YLS — Lifestyle","94K views"],
  ["Xigfun9PNh4","Soft — Dopeman Go","85K views"],
  ["hgA5A3PgPUE","Mighty P ft. LK — Believe It","59K views"],
  ["paEIFYsnBIk","Young A Stunnin' & A1 — Murk","52K views"],
  ["lAu2Q4mBddM","Busy Bros — Life A Movie","14K views"],
  ["sNPWXgvifMU","Õr Pür — Get Right Witcha","KSP Films"],
  ["Zc6beDmPFHM","Lordt — 9 Nights","10K views"],
  ["kHWK9pK2Qc0","Bilo Da Kid — Never","KSP Films"],
  ["GUbCpGGs8Qw","Faxxts — Affiliated","KSP Films"],
  ["lhT8luz5X3Y","Kay Bandz — Winning","KSP Films"],
  ["bLHcxEtVMao","Vulture ft. Hooks — Tout Ma Vie","KSP Films"],
  ["XY-_FdHYspA","Zoe Kot X — By Myself","KSP Films"],
  ["COp_9KadXgg","Lost ft. Cliff — Ennemis","KSP Films"],
  ["Q0ejc1FRaro","Freeman — If I Die","KSP Films"],
  ["tpGCNT5tKG4","Sabz — Intoxicated","KSP Films"],
];
export default function Page(){return <main className="detailPage musicPage">
  <aside className="previewNotice">Preview edition — portfolio updates in progress</aside>
  <header className="detailNav"><a className="brand" href="/" aria-label="KSP Vision home"><span>KSP</span> VISION</a><nav className="mainNav" aria-label="Main navigation"><a className="activeNav" href="/music-videos">Music Videos</a><a href="/weddings">Weddings</a><a href="/brand-documentary">Brand / Doc</a><a href="/booking" className="navCta">Book</a></nav></header>
  <section className="detailHero toneMusic"><p className="kicker">Music videos</p><h1>Sound, translated<br/>into images.</h1><p>Creative direction and complete production for artists who want a visual identity with character.</p><a className="button gold" href="/booking">Create your visual ↗</a></section>
  <section className="videoCollection"><div className="weddingSectionHead"><div><p className="kicker">Selected work</p><h2>Watch the films</h2></div><p>Direction, cinematography, editing and visual production by Kevin Shayne / KSP Vision.</p></div><div className="musicGrid">{videos.map((v,i)=><a className="musicCard" aria-label={`Watch ${v[1]} on YouTube`} href={`https://www.youtube.com/watch?v=${v[0]}`} target="_blank" rel="noreferrer" key={v[0]}><div className="musicThumb" style={{backgroundImage:`linear-gradient(0deg,rgba(0,0,0,.7),transparent 65%),url(https://img.youtube.com/vi/${v[0]}/hqdefault.jpg)`}}><span>{String(i+1).padStart(2,"0")}</span><b aria-hidden="true">▶</b></div><div><h3>{v[1]}</h3><p>{v[2]}</p></div></a>)}</div></section>
  <footer><a className="brand" href="/"><span>KSP</span> VISION</a><p>Production · Cinematography · Post-production</p><p>Montréal, Québec</p></footer>
</main>}

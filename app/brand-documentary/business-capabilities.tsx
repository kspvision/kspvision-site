import styles from "./business-capabilities.module.css";

const capabilities = [
  {
    number: "01",
    title: "COMPANY & FOUNDER STORIES",
    text: "Films that introduce the people, purpose and story behind a business."
  },
  {
    number: "02",
    title: "CAMPAIGNS & PRODUCT FILMS",
    text: "Commercial visuals for launches, products, services and campaigns."
  },
  {
    number: "03",
    title: "TESTIMONIAL & RECRUITMENT",
    text: "Interview-led stories built for trust, culture and recruitment."
  },
  {
    number: "04",
    title: "DOCUMENTARY & INTERVIEWS",
    text: "Profiles and documentary films shaped around real people and stories."
  },
  {
    number: "05",
    title: "SOCIAL & DIGITAL CONTENT",
    text: "Short edits and vertical assets built from the same production."
  },
  {
    number: "06",
    title: "PLATFORM-READY DELIVERY",
    text: "Finished assets prepared for web, social, YouTube and campaigns."
  }
];

const deliverables = [
  "HERO FILM",
  "SHORT CUTDOWNS",
  "VERTICAL SOCIAL",
  "WEB & YOUTUBE",
  "SUBTITLED VERSIONS"
];

export default function BusinessCapabilities() {
  return (
    <section className={styles.section}>
      <div className={styles.intro}>
        <div>
          <div className={styles.eyebrow}>WHAT WE BUILD</div>
          <h2>ONE PRODUCTION. BUILT TO TRAVEL.</h2>
        </div>

        <p className={styles.summary}>
          From the main film to campaign cutdowns and social assets, KSP Vision
          can carry a project from production through final delivery.
        </p>
      </div>

      <div className={styles.grid}>
        {capabilities.map((item) => (
          <article className={styles.card} key={item.number}>
            <span className={styles.number}>{item.number}</span>

            <div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.delivery}>
        <span className={styles.deliveryLabel}>COMMON DELIVERABLES</span>

        <div className={styles.deliveryItems}>
          {deliverables.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

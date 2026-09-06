import styles from "./business-capabilities.module.css";

const capabilities = [
  {
    number: "01",
    title: "COMPANY & FOUNDER STORIES",
    text: "Human-led films that introduce the people, purpose and story behind a business."
  },
  {
    number: "02",
    title: "CAMPAIGNS & PRODUCT FILMS",
    text: "Commercial visuals built around a launch, product, service or focused campaign."
  },
  {
    number: "03",
    title: "TESTIMONIAL & RECRUITMENT",
    text: "Interview-driven stories that help build trust, attract talent and communicate real experiences."
  },
  {
    number: "04",
    title: "DOCUMENTARY & INTERVIEWS",
    text: "Profiles, conversations and documentary-led films shaped around real people and real stories."
  },
  {
    number: "05",
    title: "SOCIAL & DIGITAL CONTENT",
    text: "Shorter edits and vertical assets designed to extend the production across social and digital platforms."
  },
  {
    number: "06",
    title: "PLATFORM-READY DELIVERY",
    text: "Final assets prepared for websites, campaigns, YouTube, presentations and social platforms."
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
        <div className={styles.eyebrow}>WHAT WE BUILD</div>

        <div className={styles.introGrid}>
          <h2>
            ONE PRODUCTION.
            <br />
            BUILT TO TRAVEL.
          </h2>

          <div className={styles.introCopy}>
            <p>
              A strong production should do more than create one beautiful film.
              We shape each project around the audience, the message and where
              the work needs to live.
            </p>

            <p>
              From the main film to shorter campaign assets, KSP Vision can carry
              a project from concept and production through post-production and
              final delivery.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        {capabilities.map((item) => (
          <article className={styles.card} key={item.number}>
            <div className={styles.number}>{item.number}</div>

            <div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.delivery}>
        <div className={styles.deliveryLabel}>COMMON DELIVERABLES</div>

        <div className={styles.deliveryItems}>
          {deliverables.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>

        <div className={styles.deliveryNote}>
          Scope and deliverables are shaped around each production.
        </div>
      </div>

      <div className={styles.bottom}>
        <div>
          <div className={styles.bottomEyebrow}>BUILT AROUND THE GOAL</div>
          <h3>
            TELL US WHAT THE
            <br />
            VIDEO NEEDS TO DO.
          </h3>
        </div>

        <a href="/booking" className={styles.cta}>
          <span>START A PROJECT</span>
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}

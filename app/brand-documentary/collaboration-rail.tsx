import styles from "./collaboration-rail.module.css";

export default function CollaborationRail() {
  return (
    <div className={`${styles.rail} brandCollaborationRail`} aria-label="Selected collaborations">
      <img
        src="/collaborations-logos.png"
        width="1750"
        height="200"
        alt="Selected KSP Vision collaborations"
        className={styles.image}
      />
    </div>
  );
}

import styles from "./collaboration-rail.module.css";

export default function CollaborationRail() {
  return (
    <div className={styles.rail} aria-label="Selected collaborations">
      <img
        src="/collaborations-selected.png"
        alt="Selected KSP Vision collaborations"
        className={styles.image}
      />
    </div>
  );
}

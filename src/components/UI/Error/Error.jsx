import styles from "./Error.module.css";

export default function Error({ children }) {
  return (
    <div className={styles.primary}>
      <h2>{children}</h2>
    </div>
  );
}

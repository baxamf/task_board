import styles from "./Info.module.css";

export default function Info({ children }) {
  return <div className={styles.text}>{children}</div>;
}

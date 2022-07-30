import styles from "./Input.module.css";

export default function Input({ value, changeInput, placeholder }) {
  return (
    <input
      className={styles.primary}
      value={value}
      onChange={changeInput}
      type="text"
      placeholder={placeholder}
      onFocus={(e) => (e.target.placeholder = "")}
      onBlur={(e) => {
        placeholder ? (e.target.placeholder = placeholder) : e.target.focus();
      }}
    />
  );
}

import { useState, useCallback } from "react";
import Button from "../UI/Button";
import Input from "../UI/Input/Input";
import styles from "./Form.module.css";

export default function Form({ add }) {
  const [title, setTitle] = useState("");

  const addOnSubmit = (e) => {
    e.preventDefault();
    add(title);
    setTitle("");
  };

  return (
    <form onSubmit={addOnSubmit} className={styles.primary}>
      <Input changeInput={(e) => setTitle(e.target.value)} value={title} />
      <Button>+ Add task</Button>
    </form>
  );
}

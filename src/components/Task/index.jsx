import { useState } from "react";
import styles from "./Task.module.css";
import { FaUndo } from "react-icons/fa";

export default function Task({ task, callback, drag }) {
  const { cb_deleteTask } = callback;
  const { cb_editTask } = callback;

  const [editTask, setEditTask] = useState("");
  const [back, setBack] = useState("");

  const edit = (title) => {
    const newTitle = { title };
    cb_editTask(task.id, newTitle);
    setEditTask("");
  };

  const del = (e) => {
    e.stopPropagation();
    cb_deleteTask(task.id);
  };

  return (
    <li
      onClick={() => {
        setEditTask(task.title);
        setBack(task.title);
      }}
      className={styles.t}
      draggable="true"
      onDragEnd={(e) => {
        e.target.style.opacity = "1";
      }}
      onDragStart={(e) => {
        e.target.style.opacity = "0.5";
        drag(task);
      }}
    >
      {back && !editTask ? (
        <span
          className={styles.edit}
          onClick={(e) => {
            e.stopPropagation();
            edit(back);
            setBack("");
          }}
        >
          <FaUndo />
        </span>
      ) : null}
      <span onClick={del}>X</span>
      {editTask ? (
        <textarea
          onChange={(e) => setEditTask(e.target.value)}
          onBlur={() => edit(editTask)}
          value={editTask}
        ></textarea>
      ) : (
        task.title
      )}
    </li>
  );
}

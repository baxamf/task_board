import { useState } from "react";
import styles from "./Task.module.css";

export default function Task({ task, handlers, drag }) {
  const { deleteTask } = handlers;
  const { cb_editTask } = handlers;

  const [editTask, setEditTask] = useState("");

  const edit = (e) => {
    const newTitle = { title: editTask };
    cb_editTask(task.id, newTitle);
    setEditTask("");
  };

  const del = (e) => {
    e.preventDefault();
    deleteTask(task.id);
  };

  return (
    <li
      onClick={() => setEditTask(task.title)}
      onContextMenu={del}
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
      {editTask ? (
        <textarea
          onChange={(e) => setEditTask(e.target.value)}
          onBlur={edit}
          value={editTask}
        ></textarea>
      ) : (
        task.title
      )}
    </li>
  );
}

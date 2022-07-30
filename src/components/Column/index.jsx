import { useState } from "react";
import Task from "../Task";
import styles from "./Column.module.css";

export default function Column({ tasks, handlers, id }) {
  const [stateTasks, setTasks] = useState(tasks);
  const dragItem = (dragTask) => {
    console.log(dragTask);
  };

  function dropHandler(e) {
    console.log(id);
  }

  return (
    <ul
      id={id}
      className={styles.tasks}
      onDrop={dropHandler}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDragEnter={(e) => {
        e.stopPropagation();
      }}
    >
      {tasks.map((task) => (
        <Task key={task.id} task={task} handlers={handlers} drop={dragItem} />
      ))}
    </ul>
  );
}

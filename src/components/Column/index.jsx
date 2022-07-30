import Task from "../Task";
import styles from "./Column.module.css";

export default function Column({ tasks, handlers, id, drop, drag }) {
  function dropHandler(e) {
    drop(id);
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
        <Task key={task.id} task={task} handlers={handlers} drag={drag} />
      ))}
    </ul>
  );
}

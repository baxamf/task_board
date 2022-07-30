import Task from "../Task";
import styles from "./Column.module.css";

export default function Column({ children, tasks, callback, id, drop, drag }) {
  function dropHandler(e) {
    drop(id);
  }
  return (
    <ul
      id={id}
      className={`${styles.tasks} ${styles[id]}`}
      onDrop={dropHandler}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDragEnter={(e) => {
        e.stopPropagation();
      }}
    >
      {children}
      {tasks.map((task) => (
        <Task key={task.id} task={task} callback={callback} drag={drag} />
      ))}
    </ul>
  );
}

import { useMemo } from "react";
import Column from "../Column";
import styles from "./BoardColumns.module.css";

export default function BoardColumns({ tasks, handlers }) {
  const { newTasks, inProgressTasks, doneTasks } = tasks;

  return (
    <div className={styles.container}>
      <Column tasks={newTasks} handlers={handlers} id={"new"} />
      <Column tasks={inProgressTasks} handlers={handlers} id={"in_progress"} />
      <Column tasks={doneTasks} handlers={handlers} id={"done"} />
    </div>
  );
}

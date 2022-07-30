import { useCallback, useState } from "react";
import Column from "../Column";
import styles from "./BoardColumns.module.css";

export default function BoardColumns({ tasks, handlers }) {
  const { newTasks, inProgressTasks, doneTasks } = tasks;
  const { cb_editTask } = handlers;

  const [dragTask, setDragTask] = useState({});

  const onDragTask = useCallback(
    (task) => {
      setDragTask(task);
    },
    [dragTask]
  );

  const dropBoard = (dropColumn) => {
    if (dropColumn !== dragTask.status) {
      cb_editTask(dragTask.id, { status: dropColumn });
    }
  };

  return (
    <div className={styles.container}>
      <Column
        drag={onDragTask}
        drop={dropBoard}
        tasks={newTasks}
        handlers={handlers}
        id={"new"}
      />
      <Column
        drag={onDragTask}
        drop={dropBoard}
        tasks={inProgressTasks}
        handlers={handlers}
        id={"in_progress"}
      />
      <Column
        drag={onDragTask}
        drop={dropBoard}
        tasks={doneTasks}
        handlers={handlers}
        id={"done"}
      />
    </div>
  );
}

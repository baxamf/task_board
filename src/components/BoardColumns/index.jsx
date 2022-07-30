import { useCallback, useState, useMemo } from "react";
import Column from "../Column";
import styles from "./BoardColumns.module.css";
import { BiTaskX } from "react-icons/bi";
import { BiTask } from "react-icons/bi";
import { BsGearFill } from "react-icons/bs";

export default function BoardColumns({ tasks, callback }) {
  const { cb_editTask } = callback;

  const [dragTask, setDragTask] = useState({});

  const newTasks = useMemo(
    () => tasks.filter((tasks) => tasks.status === "new"),
    [tasks]
  );
  const inProgressTasks = useMemo(
    () => tasks.filter((tasks) => tasks.status === "in_progress"),
    [tasks]
  );
  const doneTasks = useMemo(
    () => tasks.filter((tasks) => tasks.status === "done"),
    [tasks]
  );

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
        callback={callback}
        id={"new"}
      >
        <BiTaskX />
      </Column>
      <Column
        drag={onDragTask}
        drop={dropBoard}
        tasks={inProgressTasks}
        callback={callback}
        id={"in_progress"}
      >
        <BsGearFill />
      </Column>
      <Column
        drag={onDragTask}
        drop={dropBoard}
        tasks={doneTasks}
        callback={callback}
        id={"done"}
      >
        <BiTask />
      </Column>
    </div>
  );
}

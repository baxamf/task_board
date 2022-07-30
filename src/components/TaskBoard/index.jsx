import { useCallback, useEffect, useMemo } from "react";
import Queries from "../../api";
import BoardColumns from "../BoardColumns";
import Form from "../Form";
import useAsync from "../hooks";
import styles from "./TaskBoard.module.css";

export default function TaskBoard() {
  const { tasks, run, setTasks } = useAsync(Queries.get);

  useEffect(() => {
    run();
  }, []);

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

  const addTask = useCallback(
    (title) => {
      const newTask = { title, status: "new" };
      Queries.add(newTask).then((resp) => {
        setTasks([...tasks, resp.data]);
      });
    },
    [tasks]
  );

  const deleteTask = useCallback(
    (id) => {
      Queries.del(id).then(() => {
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks);
      });
    },
    [tasks]
  );

  const cb_editTask = useCallback(
    (id, updatedTitle) => {
      const item = tasks.find((task) => task.id === id);
      const updatedTask = { ...item, ...updatedTitle };
      const updatedTasks = tasks.map((task) =>
        task.id === id ? updatedTask : task
      );
      setTasks(updatedTasks);
      Queries.change(id, updatedTitle);
    },
    [tasks, setTasks]
  );

  return (
    <div className={styles.container}>
      <Form add={addTask} />
      <BoardColumns
        tasks={{ newTasks, inProgressTasks, doneTasks }}
        handlers={{ deleteTask, cb_editTask }}
      />
    </div>
  );
}

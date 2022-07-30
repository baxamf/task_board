import { useCallback, useEffect, useMemo } from "react";
import Queries from "../../api";
import BoardColumns from "../BoardColumns";
import Form from "../Form";
import useAsync from "../hooks";
import Info from "../UI/Info/Info";
import styles from "./TaskBoard.module.css";
import { TbDragDrop } from "react-icons/tb";

export default function TaskBoard() {
  const { tasks, run, setTasks } = useAsync(Queries.get);

  useEffect(() => {
    run();
  }, []);

  const cb_addTask = useCallback(
    (title) => {
      const newTask = { title, status: "new" };
      Queries.add(newTask).then((resp) => {
        setTasks([...tasks, resp.data]);
      });
    },
    [tasks]
  );

  const cb_deleteTask = useCallback(
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
      <Form add={cb_addTask} />
      <Info>
        <TbDragDrop />
        Drag and drop task from one to another stage
      </Info>
      <BoardColumns tasks={tasks} callback={{ cb_deleteTask, cb_editTask }} />
    </div>
  );
}

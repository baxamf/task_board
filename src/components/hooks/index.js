import { useState } from "react";

export default function useAsync(callback) {
  const [tasks, setTasks] = useState([]);

  function run() {
    callback()
      .then((resp) => {
        const data = resp.data;
        setTasks(data);
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return { run, tasks, setTasks };
}

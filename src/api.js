import axios from "axios";

const URL = "https://62d926c290883139359c0527.mockapi.io/task_board";

export default class Queries {
  static get() {
    return axios.get(URL);
  }
  static add(task) {
    return axios.post(URL, task);
  }
  static change(id, updatedTask) {
    return axios.put(`${URL}/${id}`, updatedTask);
  }
  static del(id) {
    return axios.delete(`${URL}/${id}`);
  }
}

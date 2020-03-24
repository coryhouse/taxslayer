import axios from "axios";

// Async in JS
// 1. Callback function
// 2. Promise
// 3. Async/await (abstraction over promises)

export function get1099s() {
  // This will return a promise
  return axios.get("http://localhost:3001/f1099s");
}

export function delete1099(id) {
  return axios.delete(`http://localhost:3001/f1099s/${id}`);
}

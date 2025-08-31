import axios from "axios";

const instance = axios.create({
  baseURL: "https://task-manager-4cu9.onrender.com/api", // 👈 deployed backend
});

export default instance;

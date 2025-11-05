import axios from "axios";

const api = axios.create({
  baseURL: "https://recruitment-be-81o9.onrender.com/api", // change to production URL later
});

export default api;

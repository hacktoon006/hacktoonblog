// src/utils/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://server-gqgt.onrender.com/api", // ✅ use environment variable
  withCredentials: true,
});

export default instance;

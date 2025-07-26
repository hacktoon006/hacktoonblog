// src/utils/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // ✅ use environment variable
  withCredentials: true,
});

export default instance;

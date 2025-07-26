// src/utils/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: 'import.meta.env.VITE_API_BASE_URL', // ✅ uses env variable
  withCredentials: true,
});

export default instance;

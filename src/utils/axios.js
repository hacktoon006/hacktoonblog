// src/utils/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: 'https://server-gqgt.onrender.com/api/$1', // ✅ uses env variable
  withCredentials: true,
});

export default instance;

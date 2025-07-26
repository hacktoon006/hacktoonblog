// src/Socket.js
import { io } from "socket.io-client";

const socket = io("https://server-gqgt.onrender.com", {
  transports: ["websocket"], // optional but helps in local dev
});

export default socket;

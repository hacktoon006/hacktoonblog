// src/Socket.js
import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  transports: ["websocket"], // optional but helps in local dev
});

export default socket;

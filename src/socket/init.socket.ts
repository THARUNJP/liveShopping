import { Server } from "socket.io";
import { Server as HttpServer } from "node:http";

let io;
function initSocket(server: HttpServer) {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });
}

export default initSocket;

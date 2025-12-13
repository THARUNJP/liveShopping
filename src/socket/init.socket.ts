import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import { handleJoinUser, handleSessionCreation } from "../service/socket.service";

let io: Server;

export default function initSocket(server: HttpServer): Server {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });
  console.log("socket is running on port 8000");

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);
    
    socket.on("create-session",({sessionCode,callType})=>{
        handleSessionCreation(sessionCode,callType)
    })
    socket.on("join-session", ({ sessionCode, participantName }) => {
      handleJoinUser(sessionCode, participantName,socket.id)
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });

  return io;
}

// Optional getter (useful later)
export function getIO(): Server {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
}

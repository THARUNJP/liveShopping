import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { createServer } from "node:http";
import initSocket from "./socket/init.socket";


const PORT = process.env.port || 8000;


const server = createServer(app)

initSocket(server)

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
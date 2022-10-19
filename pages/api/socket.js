import { PrismaClient } from "@prisma/client";
import { Socket, Server } from "socket.io";

const prisma = new PrismaClient();

export default async function (req, res) {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;
  }
  res.end();
}

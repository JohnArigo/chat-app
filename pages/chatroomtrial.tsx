import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
import { getMessageData } from "../libraries/getMessageData";
import { Root2 } from "../libraries/types";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import useSWR, { SWRConfig } from "swr";
import io from "Socket.IO-client";
let socket: any;

export default function ChatRoom({ messages }: any) {
  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log("connected");
    });
  };

  const [tryS, setTryS] = useState<string>("");

  const onChangeHandler = (e: any) => {
    setTryS(e.target.value);
    socket?.emit("input-change", e.target.value);
  };

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <input value={tryS} onChange={onChangeHandler} />
    </main>
  );
}

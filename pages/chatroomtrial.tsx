import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
import { getMessageData } from "../libraries/getMessageData";
import { Root2 } from "../libraries/types/types";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import useSWR, { SWRConfig } from "swr";

export default function GameTrial() {
  const words = ["hello", "hell", "hoe", "lol"];

  const [playerArray, setPlayerArray] = useState(["h", "e", "l", "l", "o"]);
  const [submitArray, setSubmitArray] = useState<string[]>([]);
  const [totalArray, setTotalArray] = useState([]);
  const counter: number = 0;

  const handleClick = (letter: string) => {
    setSubmitArray((prevState) => {
      return [...prevState, letter];
    });
  };

  return (
    <main className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="w-72 h-16 flex ">
        {submitArray.map((subLetter: string) => {
          return (
            <div className="w-10 h-10 bg-amber-700 text-white mr-4 flex justify-center items-center">
              {subLetter}
            </div>
          );
        })}
      </div>
      <div className="w-72 h-16 flex ">
        {playerArray.map((letter: string) => {
          return (
            <div
              className="w-10 h-10 bg-amber-700 text-white mr-4 flex justify-center items-center"
              onClick={() => handleClick(letter)}
            >
              {letter}
            </div>
          );
        })}
      </div>
    </main>
  );
}

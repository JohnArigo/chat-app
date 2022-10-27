import { useRouter } from "next/router";
import AnagramGame from "../components/AnagramGame";
import { useRef, useState, useEffect } from "react";
import TimeOut from "../components/timeout";
import { useSession } from "next-auth/react";
import NoSessionPage from "../components/noSessionPage";
import { PrismaClient } from "@prisma/client";
import prisma from "../lib/prisma";

export async function getStaticProps() {
  const topScores = await prisma.scores.findMany({
    orderBy: {
      score: "desc",
    },
  });

  return {
    props: {
      topScores: topScores,
    },
  };
}

export default function GameTrial({ topScores }: any) {
  const { data: session, status } = useSession();
  const [timer, setTimer] = useState(-1);
  useEffect(() => {
    timer > 0 && setTimeout(() => setTimer(timer - 1), 1000);
  }, [timer]);
  const [start, setStart] = useState(false);
  const [counter, setCounter] = useState<number>(0);
  if (!session) {
    return (
      <main>
        <NoSessionPage />
      </main>
    );
  } else {
    return (
      <main className="w-screen h-screen flex flex-col items-center justify-center">
        <h1>{timer <= 0 ? null : `Time left: ${timer}`}</h1>
        {timer === 0 ? (
          <TimeOut
            score={counter}
            setTimer={setTimer}
            setStart={setStart}
            session={session}
            setCounter={setCounter}
            topScores={topScores}
          />
        ) : (
          <AnagramGame
            setTimer={setTimer}
            timer={timer}
            counter={counter}
            setCounter={setCounter}
            start={start}
            setStart={setStart}
          />
        )}
      </main>
    );
  }
}

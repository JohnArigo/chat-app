async function postScore(toBeSubmitted: any) {
  const response = await fetch("../api/sendScore", {
    method: "POST",
    body: JSON.stringify(toBeSubmitted),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

export interface dataToSendType {
  username: string;
  score: number;
  date: string;
}

export default function TimeOut({
  score,
  setTimer,
  setStart,
  session,
  setCounter,
  topScores,
}: any) {
  console.log(topScores);
  const submitToChat = async (e: any) => {
    e.preventDefault();
    const toBeSubmitted: dataToSendType = {
      username: session?.user?.name!,
      score: score,
      date: new Date().toDateString(),
    };
    console.log(toBeSubmitted);
    try {
      await postScore(toBeSubmitted);
    } catch (err: any) {
      console.log(err);
    }
  };
  //push to database score if submitted.
  //make api to update high scores

  const handlePlay = () => {
    setTimer(90);
    setStart(true);
    setCounter(0);
  };

  return (
    <main className="h-96 w-96 flex-col flex justify-center items-center">
      <h1>Time has expired</h1>
      <div>
        {topScores.map((score: any) => {
          return (
            <section className="flex flex-row">
              <div>{score?.username}</div>
              <div>{score?.score}</div>
              <div>{score?.date}</div>
            </section>
          );
        })}
      </div>
      <h4>You scored {score}</h4>
      <div className="ml-2 flex flex-row w-full justify-between">
        <button onClick={submitToChat}>Submit Score</button>
        <button onClick={handlePlay}>Play again</button>
      </div>
    </main>
  );
}

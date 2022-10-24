import { useRef, useState, useEffect } from "react";

import getWordData from "../libraries/getWordData";

export default function AnagramGame({
  setTimer,
  timer,
  counter,
  setCounter,
  start,
  setStart,
  session,
}: any) {
  const defaultLetters = ["h", "e", "l", "l", "o"];
  const [playerArray, setPlayerArray] = useState<string[]>([
    "h",
    "e",
    "l",
    "l",
    "o",
  ]);
  const [submitArray, setSubmitArray] = useState<string[]>([]);
  const [totalArray, setTotalArray] = useState<string[]>([]);

  const handleStart = () => {
    setStart(true);
    setTimer(90);
  };
  //for initial player array
  const handleClickPlayer = (letter: string, passedIndex: number) => {
    setSubmitArray((prevState) => {
      return [...prevState, letter];
    });
    setPlayerArray((prevState) => {
      return prevState.filter((indLetter, index) => {
        return index != passedIndex;
      });
    });
  };

  const handleSubmit = async () => {
    const currentWord = submitArray.join("");
    const works = await getWordData(currentWord);
    if (works[0]?.word! === currentWord) {
      setTotalArray((prevState) => {
        if (prevState.includes(currentWord)) {
          console.log("WORD ALREADY SUBMITTED");
          return [...prevState];
        } else {
          switch (submitArray.length) {
            case 5:
              setCounter(counter + 500);
              break;
            case 4:
              setCounter(counter + 400);
              break;
            case 3:
              setCounter(counter + 300);
              break;
            case 2:
              setCounter(counter + 200);
              break;
            case 1:
              setCounter(counter + 100);
              break;
            default:
              setCounter(counter);
              break;
          }
          return [...prevState, currentWord];
        }
      });
    } else if (works[0]?.word === undefined || works[0].word === null) {
      console.log("invalid word");
    }
    //increment point counter

    //reset player letter pool
    setPlayerArray(defaultLetters);
    //reset submit array
    setSubmitArray([]);
  };

  //for submitted array
  const handleClickSubmit = (letter: string, passedIndex: number) => {
    setSubmitArray((prevState) => {
      return prevState.filter((indLetter, index) => {
        return passedIndex != index;
      });
    });
    setPlayerArray((prevState) => {
      return [...prevState, letter];
    });
  };

  console.log(totalArray);
  console.log(counter);

  if (start) {
    return (
      <main className="w-96 h-96 flex flex-col items-center justify-center">
        <div className="w-72 h-16 flex ">
          {submitArray.map((subLetter, index) => {
            return (
              <div
                className="w-10 h-10 bg-amber-700 text-white mr-4 flex justify-center items-center"
                onClick={() => handleClickSubmit(subLetter, index)}
              >
                {subLetter}
              </div>
            );
          })}
        </div>
        <div>
          <button className="mb-5 mt-5" onClick={() => handleSubmit()}>
            Submit
          </button>
        </div>
        <div className="w-72 h-16 flex ">
          {playerArray.map((letter, index) => {
            return (
              <div
                className="w-10 h-10 bg-amber-700 text-white mr-4 flex justify-center items-center"
                onClick={() => handleClickPlayer(letter, index)}
              >
                {letter}
              </div>
            );
          })}
        </div>
      </main>
    );
  } else {
    return (
      <main className="w-96 h-96 flex justify-center items-center">
        <button onClick={handleStart}>Start new game</button>
      </main>
    );
  }
}

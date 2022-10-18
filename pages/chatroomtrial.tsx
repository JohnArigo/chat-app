import { useEffect, useState } from "react";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import useSWR from "swr";
import messageWindow from "../components/messageWindow";

//pulling data from database SQLite using PRISMA
export async function getServerSideProps() {
  //prisma query
  const messages = await prisma.messages.findMany();

  return {
    props: {
      messages: messages,
    },
    //revalidate: 60,
  };
}
//[p]
async function postMessages(userMessage: any) {
  const response = await fetch("./api/sendMessage", {
    method: "POST",
    body: JSON.stringify(userMessage),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

export interface Root2 {
  username: string;
  user_image: string;
  message: string;
}

const fetcher = async () => {
  const res = await fetch("./api/retrieveMessages");
  const data = await res.json();
  return data;
};

export default function ChatRoomTrial({ messages }: any) {
  const { data, error } = useSWR("api/retrieveMessages", fetcher);
  console.log(data);
  console.log(error);
  //play on username
  const userName = "raggyBoi";
  //state for form being sent
  const [userMessage, setuserMessage] = useState<Root2>({
    username: userName,
    user_image: "filler",
    message: " ",
  });

  //handles change in client state
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setuserMessage((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const submitToChat = async (e: any) => {
    e.preventDefault();
    try {
      await postMessages(userMessage);
      setuserMessage((prevState) => {
        return {
          ...prevState,
          user_image: "filler",
          message: " ",
        };
      });
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center">
      <section className="bg-white rounded-md h-96 w-96 flex flex-col overflow-y-scroll ">
        {messages.map((message: any) => {
          const messageContainer = () => {
            if (message.username === userName) {
              return "flex flex-row-reverse items-center text-black mb-3";
            } else {
              return "flex flex-row items-center text-black mb-3";
            }
          };

          return (
            <div className={messageContainer()}>
              <h1 className="ml-2 w-14 h-14 flex justify-center items-center rounded-full bg-orange-700">
                {message.username[0].toLocaleUpperCase()}
              </h1>
              <h1 className=" w-52 h-16 bg-slate-600 ml-2 rounded-md">
                {message.message}
              </h1>
            </div>
          );
        })}
      </section>
      <form
        onSubmit={(e) => submitToChat(e)}
        className="mt-10 bg-green-200 w-96 h-20 flex items-center"
      >
        <textarea
          className="ml-2 h-16 w-64 overflow-y-auto resize-none"
          name="message"
          value={userMessage.message}
          onChange={(event) => handleChange(event)}
        />
        <button className="bg-red-200 ml-3 ">Submit chat</button>
      </form>
    </main>
  );
}

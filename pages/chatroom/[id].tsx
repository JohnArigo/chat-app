import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
import { getMessageData } from "../../libraries/getMessageData";
import { Root2 } from "../../libraries/types/types";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import useSWR from "swr";
import { useSession, getSession } from "next-auth/react";
import noSessionForm from "../../components/noSessionForm";
import NoSessionForm from "../../components/noSessionForm";

const prisma = new PrismaClient();

export async function getStaticPaths() {
  //prisma query to find all paths available
  const pages = await prisma.pages.findMany();

  const paths = pages.map((page) => {
    return { params: { id: page.page_name.toString() } };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
  //sends ID for Prisma query
  const roomMessages = await getMessageData(context.params.id);

  return {
    props: {
      messages: roomMessages,
    },
    revalidate: 10,
  };
}

//sends message stored in state to APi that will update database
async function postMessages(userMessage: any) {
  const response = await fetch("../api/sendMessage", {
    method: "POST",
    body: JSON.stringify(userMessage),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}
//Fethcer tool for SWR to use.
const fetcher = (url: any) => axios.get(url).then((res) => res.data);

export default function ChatRoom({ messages }: any) {
  //fetches data from database client side in order to have a steady stream of data required
  const { data, error } = useSWR("/api/posts", fetcher);
  //Temp message data storage until API updates database or data fetches to refresh page
  const [messageData, setMessageData] = useState(messages);
  //Temp message data storage until API updates database or data fetches to refresh page
  const [dataMessages, setDataMessages] = useState(data);
  //determines the current route / page for comparison
  const router = useRouter();
  const myID = () => {
    const { id } = router.query;
    const myID = id!.toString();
    return myID;
  };
  //session data --using to extract userName, image
  const { data: session, status } = useSession();
  /*  useEffect(() => {
    if (session) {
      console.log("session = true");
      router.push(`/chatroom/${myID()}`);
    } else {
      // maybe go to login page
      router.push("/api/auth/signin");
    }
  }, [router, session]); */

  //filters all messages to return message meant for specific page
  //data loads as undefined, so we use messages(staticProps) as a fallback data source(initial)
  const findDataSource = () => {
    if (dataMessages === undefined) {
      const dataSource = messageData.filter((message: any) => {
        if (message.page_name === myID()) {
          return message;
        }
      });
      return dataSource;
    } else {
      const dataSource = dataMessages.filter((message: any) => {
        if (message.page_name === myID()) {
          return message;
        }
      });
      return dataSource;
    }
  };

  const userImage = () => {
    if (session?.user?.image === null || session?.user?.image === undefined) {
      return "invalid";
    } else return session?.user?.image;
  };

  //state for form being sent
  const [userMessage, setuserMessage] = useState<Root2>({
    username: session?.user?.name!,
    user_image: userImage(),
    message: " ",
    page_name: myID(),
  });

  //handles change in client state
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setuserMessage((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  //form submit, resets state and utilizes send function
  const submitToChat = async (e: any) => {
    e.preventDefault();
    try {
      await postMessages(userMessage);
      //set messages data source state holder
      setMessageData?.((prevState: any) => {
        return [...prevState, userMessage];
      });
      //sets SWR message source state holder
      setDataMessages?.((prevState: any) => {
        return [...prevState, userMessage];
      });
      //resets current message holder
      setuserMessage((prevState) => {
        return {
          ...prevState,
          message: " ",
          page_name: myID(),
        };
      });
    } catch (err: any) {
      console.log(err);
    }
  };

  //references bottom div to scroll to new message
  const bottomRef = useRef<null | HTMLDivElement>(null);
  const bottomClick = () => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center">
      <button className=" cursor-pointer" onClick={() => bottomClick()}>
        Click to view latest messages
      </button>
      <section className="bg-white rounded-md h-96 w-96 flex flex-wrap items-end overflow-y-auto">
        {findDataSource()?.map((message: any) => {
          const messageContainer = () => {
            if (message.username === session?.user?.name) {
              return "w-full flex flex-row-reverse items-end text-black mb-3 mr-2";
            } else {
              return "w-full flex flex-row items-end text-black mb-3";
            }
          };

          return (
            <div className={messageContainer()} key={message.id}>
              <h1 className="ml-2 w-14 h-14 flex justify-center items-center rounded-full bg-orange-700">
                {session?.user?.name![0]}
              </h1>

              <h1 className=" w-56 h-20 max-h-48 bg-slate-600 ml-2 rounded-md overflow-y-auto overflow-x-hidden">
                {message.message}
              </h1>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </section>
      {session ? (
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
      ) : (
        <NoSessionForm />
      )}
    </main>
  );
}

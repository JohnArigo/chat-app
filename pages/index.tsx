/*
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="w-screen h-screen bg-green-100">This is the main page</div>
  );
};

export default Home; */

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";

export default function Home({ user }: any) {
  // `session` will match the returned value of `callbacks.session()` from `NextAuth()`

  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center">
      <Link href={"./chatroom"}>Chatrooms</Link>
      <h1 className="sm:text-5xl text-2xl mt-10">
        {" "}
        <Typewriter
          words={[
            "Lets chat! click on Chatrooms above",
            "Live chat-app with 5 rooms",
            "Use GitHub, Google or Facebook to login",
            "Credentials are automatically transferred",
            "Shout in the chat if you find any bugs!",
          ]}
          cursor
          cursorColor="red"
          cursorStyle="_"
          loop={Infinity}
          typeSpeed={90}
          deleteSpeed={50}
        />
      </h1>
    </main>
  );
}

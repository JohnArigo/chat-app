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

export default function Home({ user }: any) {
  // `session` will match the returned value of `callbacks.session()` from `NextAuth()`

  return (
    <main>
      <Link href={"./chatroom"}>Chatroom</Link>
    </main>
  );
}

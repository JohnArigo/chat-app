import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Signin({ user, setUser }: any) {
  const router = useRouter();

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <section className=" w-72 h-72 bg-white text-green-900 rounded-xl flex flex-row flex-wrap justify-center">
        <button
          onClick={() =>
            signIn("google", { callbackUrl: "http://localhost:3000/chatroom" })
          }
        >
          Sign in with Google
        </button>
        <button
          onClick={() =>
            signIn("facebook", {
              callbackUrl: "http://localhost:3000/chatroom",
            })
          }
        >
          Sign in with Facebook
        </button>
        <button
          onClick={() =>
            signIn("github", { callbackUrl: "http://localhost:3000/chatroom" })
          }
        >
          Sign in with Github
        </button>
      </section>
    </main>
  );
}

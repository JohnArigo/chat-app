import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Signin({ user, setUser }: any) {
  //will setUser and save user to local storage when !user
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      console.log("No JWT");
      console.log(status);
      void signIn("okta");
    } else if (status === "authenticated") {
      void router.push("/");
    }
  }, [status]);

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <section className=" w-72 h-72 bg-white text-green-900 rounded-xl flex flex-row flex-wrap justify-center">
        <h1 className="w-full text-center text-lg">Enter log in information</h1>
        <form className="flex flex-col justify-center h-1/2 w-full">
          <label>Username</label>
          <input />
          <label>Password</label>
          <input />
          <button className="mt-10">Log in</button>
        </form>
      </section>
    </main>
  );
}

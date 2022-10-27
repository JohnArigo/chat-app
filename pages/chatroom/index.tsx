import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import NoSessionPage from "../../components/noSessionPage";
import prisma from "../../lib/prisma";

//pulling data from database SQLite using PRISMA
export async function getServerSideProps() {
  const links = await prisma.pages.findMany();

  console.log(links);

  return {
    props: {
      links: links,
    },
  };
}

export default function ChatRooms({ links }: any) {
  const router = useRouter();

  const { data: session, status } = useSession();

  if (session) {
    return (
      <main className="flex flex-col items-center h-screen w-screen justify-center">
        <h1>Select chatroom to enter</h1>
        <section className="h-20 w-20 flex flex-col mt-10">
          {links.map((link: any) => {
            return (
              <div className="mb-5" key={link.page_title}>
                <Link href={`chatroom/${link.page_name}`}>
                  {link.page_title}
                </Link>
              </div>
            );
          })}
        </section>
      </main>
    );
  } else {
    return <NoSessionPage />;
  }
}

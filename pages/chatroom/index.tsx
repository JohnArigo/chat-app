import { PrismaClient } from "@prisma/client";
import Link from "next/link";
const prisma = new PrismaClient();

//pulling data from database SQLite using PRISMA
export async function getServerSideProps() {
  //prisma query
  const links = await prisma.pages.findMany();

  return {
    props: {
      links: links,
    },
  };
}

export default function ChatRooms({ links }: any) {
  console.log(links);
  return (
    <main className="flex items-center h-screen w-screen">
      <section className="bg-red-100 w-20 h-full flex flex-col">
        {links.map((link: any) => {
          return (
            <div className="mb-5">
              <Link href={`chatroom/${link.page_name}`}>{link.page_title}</Link>
            </div>
          );
        })}
      </section>
    </main>
  );
}

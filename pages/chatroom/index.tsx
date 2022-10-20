import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

const prisma = new PrismaClient();
//pulling data from database SQLite using PRISMA
export async function getServerSideProps() {
  const links = await prisma.pages.findMany();

  return {
    props: {
      links: links,
    },
  };
}

export default function ChatRooms({ links }: any) {
  const router = useRouter();

  const { data: session, status } = useSession();
  useEffect(() => {
    if (session) {
      console.log("session = true");
      router.push("/chatroom");
    } else {
      // maybe go to login page
      router.push("/api/auth/signin");
    }
  }, [router, session]);

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

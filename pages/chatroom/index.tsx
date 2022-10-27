import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import NoSessionPage from "../../components/noSessionPage";
import prisma from "../../lib/prisma";
import { useState } from "react";
import { Modal, Button } from "@mantine/core";
import Link from "next/link";

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

async function postnewPage(sendingPackage: pageType) {
  const response = await fetch("../api/sendCreatePage", {
    method: "POST",
    body: JSON.stringify(sendingPackage),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}
export type multiPageType = {
  links: pageType[];
  prevState: null;
};

export type pageType = {
  page_name: string;
  page_title: string;
};
export default function ChatRooms({ links }: multiPageType) {
  const router = useRouter();
  console.log(links);
  const { data: session, status } = useSession();
  const [sendingPackage, setSendingPackage] = useState<pageType>();
  const [edit, setEdit] = useState<boolean>(false);
  const handleChange = (event: any) => {
    const { name, value } = event?.target;
    setSendingPackage((prevState: any) => {
      return { ...prevState, [name]: value };
    });
  };
  const [pageLinks, setPageLinks] = useState<pageType[]>(links);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await postnewPage(sendingPackage!);
      setPageLinks((prevState: any) => {
        return [...prevState, sendingPackage];
      });
      setSendingPackage({
        page_name: " ",
        page_title: " ",
      });
      console.log("Success");
    } catch (error) {
      console.log(error);
    }
  };

  const handleButtonClick = () => {
    setEdit(true);
  };

  console.log(sendingPackage);
  if (session) {
    return (
      <main className="flex flex-col items-center h-screen w-screen justify-center">
        <Modal
          centered
          opened={edit}
          onClose={() => setEdit(false)}
          title="Create a new page"
        >
          <form onSubmit={handleSubmit} className="flex flex-col">
            <label>Enter Page URL</label>
            <input
              type="text"
              value={sendingPackage?.page_name}
              name="page_name"
              onChange={handleChange}
              className=" bg-gray-400 text-black shadow-lg"
            />
            <label>Enter Page Title</label>
            <input
              type="text"
              value={sendingPackage?.page_title}
              name="page_title"
              onChange={handleChange}
              className=" bg-gray-400 text-black shadow-lg"
            />
            <button onClick={() => setEdit(false)}>Create New Room</button>
          </form>
        </Modal>
        <Button
          className="bg-white mb-10 cursor-pointer text-black"
          onClick={handleButtonClick}
        >
          Create a new Chatroom
        </Button>
        <h1>Select chatroom to enter</h1>
        <section className="h-20 w-20 flex flex-col mt-10">
          {pageLinks.map((link: any) => {
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

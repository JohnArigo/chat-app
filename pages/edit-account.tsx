import { PrismaClient } from "@prisma/client";
import { Modal } from "@mantine/core";

const prisma = new PrismaClient();
import { useSession, getSession } from "next-auth/react";
import { useState } from "react";

export async function getServerSideProps({ req }: any) {
  const session = await getSession({ req });
  if (session) {
    const user = await prisma.user.findMany({
      where: {
        email: session?.user?.email,
      },
    });
    return {
      props: {
        user: user,
      },
    };
  }
  return {
    props: {
      user: null,
    },
  };
}

async function postUpdatedUser(sendingPackage: packageType) {
  const response = await fetch("../api/sendUpdater", {
    method: "POST",
    body: JSON.stringify(sendingPackage),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

export type packageType = {
  email: string;
  name: string;
};

export default function EditAccount({ user }: any) {
  const [edit, setEdit] = useState<boolean>(false);
  const [sendingPackage, setSendingPackage] = useState<packageType>({
    email: user[0].email,
    name: user[0].name,
  });

  const handleChange = (e: any) => {
    setSendingPackage((prevState) => {
      return { ...prevState, name: e?.target.value };
    });
  };

  const handleSubmit = async () => {
    try {
      await postUpdatedUser(sendingPackage);
      console.log("updated");
    } catch (error) {
      console.log(error);
    }
    setEdit(false);
  };
  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center">
      <h1>User information</h1>
      <section className="flex flex-wrap justify-center items-center mt-10">
        <img className="h-16 w-16 mr-5" src={user[0].image} />
        <div className="flex flex-col">
          <h4
            className="self-end mb-3 text-xs cursor-pointer"
            onClick={() => setEdit(true)}
          >
            edit username
          </h4>
          {edit ? (
            <Modal
              centered
              opened={edit}
              onClose={() => setEdit(false)}
              title="Edit your username"
            >
              <input value={sendingPackage.name} onChange={handleChange} />
              <button onClick={handleSubmit}>Submit</button>
            </Modal>
          ) : (
            <h2>{sendingPackage.name}</h2>
          )}
        </div>

        <h3 className="w-full text-center mt-3">{user[0].email}</h3>
      </section>
    </main>
  );
}

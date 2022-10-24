//you will pull specific message data from here
//this will pull all message data and will filter based on ID passed.
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//find how to pull ID from paths to getServerProps on [id].
//from [id], ID will be passed to getMessageID() for data.

export async function getMessageData(id: any) {
  const messages = await prisma.messages.findMany({
    where: {
      page_name: id,
    },
  });
  return messages;
}

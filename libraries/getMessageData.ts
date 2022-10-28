//you will pull specific message data from here
//this will pull all message data and will filter based on ID passed.
import prisma from "../lib/prisma";

export async function getMessageData(id: any) {
  const messages = await prisma.messages.findMany({
    where: {
      page_name: id,
    },
  });
  return messages;
}

import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const posts = await prisma.messages.findMany();
  res.json(posts);
}

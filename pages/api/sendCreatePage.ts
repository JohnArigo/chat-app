import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ alert: "Method not allowed" });
  }
  const pageData = JSON.parse(req.body);

  const savedpage = await prisma.pages.create({ data: pageData });

  res.json(savedpage);
  // res.status(200).json({ name: "John Doe" });
}

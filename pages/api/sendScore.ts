import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ alert: "Method not allowed" });
  }
  const scoreData = JSON.parse(req.body);

  const savedScores = await prisma.scores.create({ data: scoreData });
  console.log(res.json(savedScores));
  res.json(savedScores);
  // res.status(200).json({ name: "John Doe" });
}

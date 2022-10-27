import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import prisma from "../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ alert: "Method not allowed" });
  }
  const userData = JSON.parse(req.body);
  console.log(userData);
  const savedUser = await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      name: userData.name,
    },
  });

  res.json(savedUser);
}

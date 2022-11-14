import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import FacebookProvider from "next-auth/providers/facebook";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import prisma from "../../../lib/prisma";

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
  providers: [
    GitHubProvider({
      //@ts-ignore
      clientId: process.env.GITHUB_ID,
      //@ts-ignore
      clientSecret: process.env.GITHUB_SECRET,
      scope: "read:user",
    }),
    GoogleProvider({
      //@ts-ignore
      clientId: process.env.GOOGLE_ID, //@ts-ignore
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    FacebookProvider({
      //@ts-ignore
      clientId: process.env.FACEBOOK_ID, //@ts-ignore
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
};

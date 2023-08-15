import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../prisma";
import { compare } from "bcrypt-ts";

export const authOptions = {
  // Configure one or more authentication providers
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",

      async authorize(credentials, req) {
        const response = await prisma.admins.findFirst({
          where: {
            login: credentials?.login.toLowerCase(),
          },
        });

        if (!response) {
          throw new Error("No user was found");
        }
        const checkPass = await compare(credentials?.password, response?.password);
        if (!checkPass || credentials?.login.toLowerCase() !== response.login.toLowerCase()) {
          throw new Error("Email or password is wrong");
        }
        const user = {
          _id: response.id,
          email: response.id,
          name: response.login,
        };

        return user;
      },
    }),
  ],
};
export default NextAuth(authOptions);

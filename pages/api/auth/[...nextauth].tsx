import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import User from "../../../models/User";
import dbConnect from "../../../lib/dbConnect";
import { verifyPassword } from "../../../lib/auth";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.auth_secret,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},

      async authorize(credentials: any) {
        await dbConnect();

        const user = await User.findOne({ email: credentials.email }).select("password admin");

        if (!user) {
          throw new Error("Brak użytkownika o podanym adresie e-mail");
        }

        const isValid = await verifyPassword(credentials.password, user.password);

        if (!isValid) {
          throw new Error("Nieprawidłowe hasło");
        }

        return { id: user._id.toString(), admin: user.admin };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.admin = user.admin;
        token._id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.admin = token.admin;
        session.user._id = token._id;
      }
      return session;
    },
  },
});

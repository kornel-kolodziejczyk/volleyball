import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      admin: boolean;
    };
  }

  interface User {
    admin: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id: string;
    admin: boolean;
  }
}

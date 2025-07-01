import { Session as NextAuthSession, User as NextAuthUser } from "next-auth";

declare module "next-auth" {
  export interface User extends NextAuthUser {
    id?: string;
  }

  export interface Session extends NextAuthSession {
    user: User;
  }
}

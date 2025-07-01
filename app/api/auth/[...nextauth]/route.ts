import { StrapiApi } from "@/infra/api/strapi";
import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      console.log("Redirect", url, baseUrl);
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return baseUrl;
      return baseUrl;
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      console.log("Sign in");
      return true;
    },
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (credentials == null) return null;
        try {
          const { data } = await StrapiApi.Auth.login(
            credentials.username,
            credentials.password
          );
          return {
            ...data.user,
            name: data.user.username,
          };
        } catch (e) {
          console.error("Log in failed", e);
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

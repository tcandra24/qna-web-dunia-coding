import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { db } from "~/server/db";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [GoogleProvider],
  adapter: PrismaAdapter(db),
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },

  events: {
    signIn: async ({ user, isNewUser }) => {
      // Kalau isNewUser false (user lama), langsung return
      // alias ga jalanin function di bawah
      if (!isNewUser) return;

      // teo@gmail.com
      // ["teo", "gmail.com"]
      const generatedUsername = user.email?.split("@")[0];

      await db.user.update({
        where: {
          email: user.email!,
        },
        data: {
          username: generatedUsername,
        },
      });
    },
  },
} satisfies NextAuthConfig;

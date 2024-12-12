import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import prisma from "./lib/prisma";
import bcryptjs from "bcryptjs";

const credentialsProvider = Credentials({
  credentials: {
    email: { label: "email", type: "email", placeholder: "usuraio@gmail.com" },
    password: {
      label: "password",
      type: "password",
      placeholder: "Your password",
    },
  },
  authorize: async (credentials) => {
    try {
      //TODO: 1- LLAMAR A UNA FUNCION QUE VERIFICA CON ZOD QUE TENGA EMAIL Y PASSWORD
      const pastCredentials = z
        .object({
          email: z.string().email(),
          password: z.string(),
        })
        .safeParse(credentials);

      if (!pastCredentials.success) return null;

      //Busco el correo
      const user = await prisma.user.findUnique({
        where: {
          email: pastCredentials.data.email,
        },
      });

      if (!user) return null;

      //Busco si coincide el password
      const isPasswordCorrect = bcryptjs.compareSync(
        pastCredentials.data.password,
        user.password
      );
      if (!isPasswordCorrect) return null;

      const { password: _, ...rest } = user;

      return { ...rest };
    } catch (error) {
      return null;
    }
  },
});

export const authConfig = {
  providers: [credentialsProvider],
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/new-account",
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLogged = !!auth?.user;
      const isOnCheckout = nextUrl.pathname.startsWith("/checkout");

      console.log("isLogged", isLogged);
      console.log("isOnCheckout", isOnCheckout);

      if (isOnCheckout && !isLogged) return false;

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.data = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.data.role;
        session.user.userId = token.data.id;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

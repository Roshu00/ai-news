import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [],
  callbacks: {
    async authorized({ request, auth }: any) {
      const protectedPaths = [/\/admin/, /\/admin\/(.*)/, /\/creator/];

      const { pathname } = request.nextUrl;

      if (!auth && protectedPaths.some((p) => p.test(pathname))) return false;
      if (auth?.role === "creator" && pathname === "/creator") return true;

      return true;
    },
  },
} satisfies NextAuthConfig;

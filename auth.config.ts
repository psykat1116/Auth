import type { NextAuthConfig } from "next-auth";
// import GitHub from "next-auth/providers/github";
// import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { LoginSchema } from "@/Schema";
import { getUserByEmail } from "@/data/User";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validateFields = LoginSchema.safeParse(credentials);
        if (validateFields.success) {
          const { email, password } = validateFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) {
            return user;
          }
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;

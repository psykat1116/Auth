"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { RegisterSchema } from "@/Schema";
import { getUserByEmail } from "@/data/User";

export const Register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email Already In Use" };
  }

  await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  // TODO: Send Verification Token Email

  return { success: "User Created" };
};

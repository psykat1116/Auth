"use server";
import * as z from "zod";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

import { SettingsSchema } from "@/Schema";
import { getUserByEmail, getUserById } from "@/data/User";
import { currentUser } from "@/lib/auth";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationMail } from "@/lib/mail";

export const settings = async (data: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id);
  if (!dbUser) {
    return { error: "Unauthorized" };
  }
  if (user.isOAuth) {
    data.email = undefined;
    data.password = undefined;
    data.newPassword = undefined;
    data.isTwoFactorEnabled = undefined;
  }

  if (data.email && data.email !== user.email) {
    const existingUser = await getUserByEmail(data.email);
    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already exists" };
    }

    const verficationToken = await generateVerificationToken(data.email);
    await sendVerificationMail(verficationToken.email, verficationToken.token);
    return { error: "Email Verification Sent" };
  }

  if (data.password && data.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(data.password, dbUser.password);
    if (!passwordMatch) {
      return { error: "Password is Incorrect" };
    }

    const hashedPassword = await bcrypt.hash(data.newPassword, 10);
    data.password = hashedPassword;
  }

  await db.user.update({
    where: {
      id: dbUser.id,
    },
    data: {
      ...data,
    },
  });

  return { success: "Settings Updated" };
};

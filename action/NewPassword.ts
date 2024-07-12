"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { NewPasswordSchema } from "@/Schema";
import { getPasswordTokenByToken } from "@/data/PasswordToken";
import { getUserByEmail } from "@/data/User";
import { db } from "@/lib/db";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: "Missing token" };
  }

  const validatedFields = NewPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: validatedFields.error.message };
  }

  const existingToken = await getPasswordTokenByToken(token);
  if (!existingToken) {
    return { error: "Invalid token" };
  }

  const isExpired = new Date(existingToken.expires) < new Date();
  if (isExpired) {
    return { error: "Token expired" };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "Email Does Not Exist" };
  }

  const hashedPassword = await bcrypt.hash(validatedFields.data.password, 10);

  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await db.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: "Password Reset Successfully" };
};

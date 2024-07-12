"use server";
import * as z from "zod";
import { ResetSchema } from "@/Schema";
import { getUserByEmail } from "@/data/User";
import { generatePasswordResetToken } from "@/data/Tokens";
import { sendPasswordResetMail } from "@/lib/mail";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const existingUser = await getUserByEmail(validatedFields.data.email);
  if (!existingUser) {
    return { error: "Email Not Found" };
  }

  const passwordResetToken = await generatePasswordResetToken(validatedFields.data.email);
  await sendPasswordResetMail(passwordResetToken.email, passwordResetToken.token);

  return { success: "Reset Email Sent!" };
};

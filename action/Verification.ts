"use server";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/User";
import { getVericationTokenByToken } from "@/data/VerificationToken";

export const newVerification = async (token: string) => {
  const VerificationToken = await getVericationTokenByToken(token);
  if (!VerificationToken) {
    return { error: "Token Does Not Exist" };
  }

  const hasExpired = new Date(VerificationToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token Has Expired" };
  }

  const existingUser = await getUserByEmail(VerificationToken.email);
  if (!existingUser) {
    return { error: "User Does Not Exist" };
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: VerificationToken.email,
    },
  });

  await db.verificationToken.delete({
    where: { id: VerificationToken.id },
  });

  return { success: "Email Verified" };
};

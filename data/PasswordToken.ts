import { db } from "@/lib/db";
import { PasswordResetToken } from "@prisma/client";

export const getPasswordTokenByToken = async (
  token: string
): Promise<PasswordResetToken | null> => {
  try {
    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: {
        token,
      },
    });

    return passwordResetToken;
  } catch (error) {
    return null;
  }
};

export const getPasswordTokenByEmail = async (
  email: string
): Promise<PasswordResetToken | null> => {
  try {
    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: {
        email,
      },
    });

    return passwordResetToken;
  } catch (error) {
    return null;
  }
};

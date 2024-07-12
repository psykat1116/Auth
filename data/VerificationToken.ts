import { db } from "@/lib/db";
import { VerificationToken } from "@prisma/client";

export const getVericationTokenByEmail = async (
  email: string
): Promise<VerificationToken | null> => {
  try {
    const VerificationToken = await db.verificationToken.findFirst({
      where: {
        email,
      },
    });

    return VerificationToken;
  } catch (error) {
    return null;
  }
};

export const getVericationTokenByToken = async (
  token: string
): Promise<VerificationToken | null> => {
  try {
    const VerificationToken = await db.verificationToken.findUnique({
      where: {
        token,
      },
    });

    return VerificationToken;
  } catch (error) {
    return null;
  }
};

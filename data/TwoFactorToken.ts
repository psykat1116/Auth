import { db } from "@/lib/db";
import { TwoFactorToken } from "@prisma/client";

export const get2FATokenByToken = async (
  token: string
): Promise<TwoFactorToken | null> => {
  try {
    const TwoFactorToken = await db.twoFactorToken.findUnique({
      where: {
        token,
      },
    });

    return TwoFactorToken;
  } catch (error) {
    return null;
  }
};

export const get2FATokenByEmail = async (
  email: string
): Promise<TwoFactorToken | null> => {
  try {
    const TwoFactorToken = await db.twoFactorToken.findFirst({
      where: {
        email,
      },
    });

    return TwoFactorToken;
  } catch (error) {
    return null;
  }
};

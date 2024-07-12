import { db } from "@/lib/db";
import crypto from "crypto";
import { v4 as uuid } from "uuid";
import { VerificationToken } from "@prisma/client";

import { get2FATokenByEmail } from "@/data/TwoFactorToken";
import { getVericationTokenByEmail } from "@/data/VerificationToken";
import { getPasswordTokenByEmail } from "@/data/PasswordToken";

export const generate2FAToken = async (email: string) => {
  const token = crypto.randomInt(100000, 1000000).toString();
  const expires = new Date(new Date().getTime() + 300 * 1000);

  const existingToken = await get2FATokenByEmail(email);
  if (existingToken) {
    await db.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const newToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return newToken;
};

export const generateVerificationToken = async (
  email: string
): Promise<VerificationToken> => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVericationTokenByEmail(email);
  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const newToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return newToken;
};

export const generatePasswordResetToken = async (
  email: string
): Promise<VerificationToken> => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordTokenByEmail(email);
  if (existingToken) {
    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const newToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return newToken;
};

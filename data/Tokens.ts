import { db } from "@/lib/db";
import { v4 as uuid } from "uuid";
import { getVericationTokenByEmail } from "./VerificationToken";
import { VerificationToken } from "@prisma/client";
import { getPasswordTokenByEmail } from "./PasswordToken";

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

import { db } from "@/lib/db";
import { v4 as uuid } from "uuid";
import { getVericationTokenByEmail } from "./VerificationToken";
import { VerificationToken } from "@prisma/client";

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

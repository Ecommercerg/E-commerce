// pages/api/change-password.js

import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";
import bcrypt from "bcrypt";
import { isPasswordValid } from "../../../utils/passwordValidator";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  if (method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { userId, token, password } = body;

  if (isPasswordValid(password) === false) {
    return res.status(422).json({ message: "Password is not valid" });
  }

  try {
    // Find the verificationToken in the database
    const verificationToken = await prisma.verificationToken.findUnique({
      where: {
        token: token,
      },
    });

    if (
      !verificationToken ||
      verificationToken.expires < new Date() ||
      verificationToken.identifier !== userId
    ) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    // Token is valid, now you can update the user's password.

    // Generate a hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password in the database
    await prisma.user.update({
      where: { id: userId },
      data: {
        hashedPassword,
      },
    });

    // Optionally, you can delete the verificationToken from the database to prevent its reuse.

    await prisma.verificationToken.delete({
      where: {
        token: token,
      },
    });

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}

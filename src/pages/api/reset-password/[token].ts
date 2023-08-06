import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";
import crypto from "crypto";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;
  const { token } = query;


  if (method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Find the verificationToken in the database
    const verificationToken = await prisma.verificationToken.findUnique({
      where: {
        token: token as string,
      },
    });

    if (!verificationToken || verificationToken.expires < new Date()) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    return res.status(200).json({ message: "Valid token, redirect user to change password" , userId: verificationToken.identifier, token: verificationToken.token});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}

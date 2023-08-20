import serverAuth from "lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { currentUser } = await serverAuth(req, res);
    const wishlistItems = await prisma.wishlistItem.findMany({
      where: {
        userId: currentUser?.id,
      },
      include: {
        product: true,
      },
    });
    return res.status(200).json(wishlistItems);
  } catch (error: any) {
    return res.status(500).json({error: error?.message || "Something went wrong"});
  }
}

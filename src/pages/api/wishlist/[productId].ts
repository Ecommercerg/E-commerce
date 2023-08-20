import serverAuth from "lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;

  if (method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  if (!query.productId) {
    return res.status(400).json({ error: "MISSING_QUERY_VALUE" });
  }


  try {
    const { currentUser } = await serverAuth(req, res);
    const { productId } = query;
    //add product to wishlist using productId
    const wishlistItem = await prisma.wishlistItem.create({
      data: {
        product: {
          connect: {
            id: productId as string,
          },
        },
        user: {
          connect: {
            id: currentUser?.id as string,
          },
        },
      },
    });
    return res.status(200).json(wishlistItem);
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: error?.message || "Something went wrong" });
  }
}

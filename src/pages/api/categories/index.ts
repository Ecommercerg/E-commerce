import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  if (method == "POST") {
    const { name, description } = body;

    try {
      const category = await prisma.categorie.create({
        data: {
          name,
          description,
        },
      });
      return res.status(200).json(category);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  else if (method == "GET") {
    try {
      const categories = await prisma.categorie.findMany(
        {
          include: {
            products: true,
          },
        }
      );
      return res.status(200).json(categories);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}

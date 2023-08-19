import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const { method, query } = req;
    if (method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
      }
    const productId = query.id as string;
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: productId,
            },
        });
        return res.status(200).json(product);
    }
    catch (error) {
        console.error(error);
        return res.status(404).json({ error: "NOT_FOUND" });
    }
}
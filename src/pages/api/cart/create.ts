import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    if (method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const cart = await prisma.cart.create({
            data:{
                products: {
                    create: []
                },
                totalPrice: 0
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
}
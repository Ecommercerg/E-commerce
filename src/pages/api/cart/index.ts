import serverAuth from "lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    if (method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const { currentUser } = await serverAuth(req, res);
        const cart = await prisma.cart.findUnique({
            where: {
                userId: currentUser?.id,
            },
            include: {
                products: true,
            },
        });
        return res.status(200).json(cart);
    } catch (error: any) {
        return res.status(500).json({ error: error?.message || "Something went wrong" });
    }
}
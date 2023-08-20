import serverAuth from "lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method, body } = req;

    if (method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { productId, discountCode } = body;

    try {
        const { currentUser } = await serverAuth(req, res);
        const product = await prisma.product.findUnique({
            where: {
                id: productId,
            },
        });
        if (!product) {
            return res.status(404).json({ error: "NOT_FOUND" });
        }

        const discount = await prisma.discount.findUnique({
            where: {
                code: discountCode,
            },
        });

        if (!discount) {
            return res.status(404).json({ error: "DISCOUNT_NOT_FOUND" });
        } else if (discount?.endDate < new Date()) {
            return res.status(400).json({ error: "DISCOUNT_EXPIRED" });
        } else if (discount?.startDate > new Date()) {
            return res.status(400).json({ error: "DISCOUNT_NOT_STARTED" });
        }

        let newPrice = product.price;

        if(discount.type === "PERCENTAGE"){
            newPrice = product.price - (product.price * (discount.amount / 100));
        } else {
            newPrice = product.price - discount.amount;
        }

        const cart = await prisma.cart.findUnique({
            where: {
                userId: currentUser?.id,
            }
        });

        if (!cart) {
            return res.status(400).json({ error: "CART_NOT_FOUND" });
        }

        await prisma.cart.update({
            where: {
                userId: currentUser?.id as string,
            },
            data: {
                products: {
                    connect: {
                        id: productId as string,
                    },
                },
                totalPrice: cart.totalPrice - product.price + newPrice,
            },
        });
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ error: error?.message || "Something went wrong" });
    }
}
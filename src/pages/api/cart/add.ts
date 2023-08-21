import serverAuth from "lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method, body } = req;

    if (method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { productId, cartId } = body;

    if (!productId) {
        return res.status(400).json({ error: "MISSING_PRODUCT_ID" });
    }

    try {
        const { currentUser } = await serverAuth(req, res);
        const product = await prisma.product.findUnique({
            where: {
                id: productId as string,
            },
        });
        if (!product) {
            return res.status(404).json({ error: "PRODUCT_NOT_FOUND" });
        }
        const cart = await prisma.cart.findUnique({
            where: {
                userId: currentUser?.id,
            }
        });
        if (!cart) {
            return res.status(400).json({ error: "CART_NOT_FOUND" });
        }
        //add product to cart
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
                totalPrice: cart.totalPrice + product.price,
            },
        });
        return res.status(200).json("SUCCESS");
    } catch (error: any) {
        const product = await prisma.product.findUnique({
            where: {
                id: productId as string,
            },
        });
        if (!product) {
            return res.status(404).json({ error: "PRODUCT_NOT_FOUND" });
        }
        const cart = await prisma.cart.findUnique({
            where: {
                id: cartId,
            }
        });
        if (!cart) {
            return res.status(400).json({ error: "CART_NOT_FOUND" });
        }
        //add product to cart
        await prisma.cart.update({
            where: {
                id: cartId,
            },
            data: {
                products: {
                    connect: {
                        id: productId as string,
                    },
                },
                totalPrice: cart.totalPrice + product.price,
            },
        });
        return res.status(200).json("SUCCESS");
    }
}
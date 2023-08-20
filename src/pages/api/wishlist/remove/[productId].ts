import serverAuth from "lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    const { method, query } = req;

    if (method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    if (!query.productId) {
        return res.status(400).json({ error: "MISSING_QUERY_VALUE" });
    }

    const { productId } = query;
    
    try {
        const { currentUser } = await serverAuth(req, res);
        //remove product from wishlist using productId
        await prisma.wishlistItem.delete({
            where: {
                userId_productId: {
                    productId: productId as string,
                    userId: currentUser?.id as string,
                },
            },
        });        
        return res.status(200).json("SUCCESS");
    } catch (error: any) {
        
    }
}
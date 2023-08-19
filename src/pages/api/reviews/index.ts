import serverAuth from "lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {currentUser} = await serverAuth(req, res);
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }
    try{
        const {productId, rating, comment} = req.body;
        const product = await prisma.product.findUnique({
            where: {
                id: productId,
            },
        });
        if(!product){
            return res.status(404).json({error: "NOT_FOUND"});
        }
        const review = await prisma.review.create({
            data: {
                rating,
                comment,
                user: {
                    connect: {
                        id: currentUser.id,
                    },
                },
                product: {
                    connect: {
                        id: productId,
                    },
                },
            },
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
}

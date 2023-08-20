import serverAuth from "lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {method, body} = req;

    if (method !== "POST") {
        return res.status(405).json({message: "Method not allowed"});
    }

    const {name, price, description, images, categorieId, quantityInStock} = body;

    try {
        const {currentUser} = await serverAuth(req, res);

        if (currentUser?.role !== "ADMIN" ) {
            return res.status(403).json({error: "FORBIDDEN"});
        }
        const product = await prisma.product.create({
            data: {
                name,
                price,
                description,
                images,
                quantityInStock,
                categorie: {
                    connect: {
                        id: categorieId,
                    },
                },
            }
        });
        return res.status(200).json(product);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({error: "Something went wrong"});
    }
}
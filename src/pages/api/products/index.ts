import serverAuth from "lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next/types";
import { prisma } from "~/server/db";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ){
    if (req.method !== "GET") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    try{
        const products = await prisma.product.findMany();
        return res.status(200).json(products);
    }
    catch{
        return res.status(500).json({message: "Internal server error"});
    }
  }
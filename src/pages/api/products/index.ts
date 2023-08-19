import serverAuth from "lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next/types";
import { prisma } from "~/server/db";
import { IFilter, ISort, SortDirection, Operator } from "~/utils/filter";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const filter: IFilter = req.body.filter;
  //setting a default value for the sort
  const sort: ISort = req.body.sort || {
    name: "id",
    direction: SortDirection.ASC
  };

  try {

    //in case the filter isn't sent in the body
    if (!filter) {
      const products = await prisma.product.findMany({
        orderBy: {
          [sort.name]: sort.direction,
        },
        include: {
          categorie: true,
        },
      });
      return res.status(200).json(products);
    }

    //checks for the filter operator and returns the correct data
    switch (filter.operator) {
      case Operator.EQUALS:
        const product = await prisma.product.findFirst({
          where: {
            [filter.name]: filter.value,
          },
          orderBy: {
            [sort.name]: sort.direction,
          },
          include: {
            categorie: true,
            reviews: true,
          },
          
        });
        return res.status(200).json(product);
      case Operator.CONTAINS:
        const products = await prisma.product.findMany({
          where: {
            [filter.name]: {
              contains: filter.value,
            },
          },
          orderBy: {
            [sort.name]: sort.direction,
          },
          include: {
            categorie: true,
            reviews: true,
          },
        });
        return res.status(200).json(products);
      case Operator.GREATER_THAN:
        const productsGreaterThan = await prisma.product.findMany({
          where: {
            [filter.name]: {
                gte: filter.value,
            },
          },
          orderBy: {
            [sort.name]: sort.direction,
          },
          include: {
            categorie: true,
            reviews: true,
          },
        });
        return res.status(200).json(productsGreaterThan);
      case Operator.LESS_THAN:
        const productsLessThan = await prisma.product.findMany({
          where: {
            [filter.name]: {
              lte: filter.value,
            }
          },
          orderBy: {
            [sort.name]: sort.direction,
          },
          include: {
            categorie: true,
            reviews: true,
          },
        });
        return res.status(200).json(productsLessThan);
      default:
        return res.status(500).json({ error: "FILTER_ERROR" });
    }
  } catch {
    return res.status(500).json({ error: "Internal server error" });
  }
}

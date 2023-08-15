import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma";

const getProducts = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = req.body;

  if (req.method !== "POST") {
    return res.json({ message: "Not a POST method" });
  }

  if (!data) {
    return res.json({ message: "Issues with data" });
  }

  console.log(data);
  try {
    const prisma_response = await prisma.products.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        icon: data.icon,
        price: parseFloat(data.price),
        description: data.description,
        productType: data.productType,
      },
    });
    return res.json({ message: "Product updated" });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

export default getProducts;

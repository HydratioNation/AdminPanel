import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma";

const createNewProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.json({ message: "Not A POST" });
  }
  const data = req.body;

  try {
    const response = await prisma.products.create({
      data: {
        name: data.name,
        icon: data.icon,
        description: data.description,
        productType: data.productType,
        price: data.price,
      },
    });
    return res.status(200).json({ message: "Success" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err });
  }
};

export default createNewProduct;

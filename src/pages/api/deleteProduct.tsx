import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma";

const DeleteProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.json({ message: "Not A POST" });
  }
  const data = req.body;
  try {
    const response = await prisma.products.delete({
      where: {
        id: data,
      },
    });
    return res.status(200).json({ message: "Success" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err });
  }
};

export default DeleteProduct;

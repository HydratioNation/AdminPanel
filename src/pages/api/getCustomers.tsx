import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma";

const getCustomers = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.json({ message: "Not A POST" });
  }
  try {
    const data = await prisma.$queryRaw`select a.* , b.price
 from "Booking" a 
 left join "Products" b on a.product=b.name where a.name != 'admin'
`;
    return res.json(data);
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

export default getCustomers;

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma";

const getCustomersNSales = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.json({ message: "Not A POST" });
  }
  let date = new Date();
  let thisMonth = date.toLocaleString("en-US", {
    month: "long",
  });
  date.setMonth(date.getMonth() - 1);
  let previousMonth = date.toLocaleString("en-US", {
    month: "long",
  });

  try {
    const data =
      await prisma.$queryRaw`Select Sum(b.price) as sales, Count(a.id) as customers from "Booking" a left join "Products" b on a.product=b.name where a.date LIKE ${`%${thisMonth}%`} union all (select Sum(b.price)  , Count(a.id )  from "Booking" a left join "Products" b on a.product=b.name where a.date LIKE ${`%${previousMonth}%`}) `;

    return res.json(
      JSON.parse(
        JSON.stringify(
          data,
          (key, value) => (typeof value === "bigint" ? parseInt(value.toString()) : value) // return everything else unchanged
        )
      )
    );
  } catch (error) {
    return res.status(400).json({ error: error });
  }
  return res.json({ message: "ge" });
};

export default getCustomersNSales;

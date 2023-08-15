import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma";
import React, { useState } from "react";

const getStats = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.json({ message: "Not A POST" });
  }
  let date = new Date();
  let thisMonth = date.toLocaleString("en-US", {
    month: "long",
  });
  let thisYear = date.toLocaleString("en-US", {
    year: "numeric",
  });

  let findate = thisYear + "-" + thisMonth;

  let query = [
    {
      finalDate: findate,
      Month: thisMonth,
    },
  ];
  const queryCreate = () => {
    for (let i = 0; i < 6; i++) {
      date.setMonth(date.getMonth() - 1);
      thisMonth = date.toLocaleString("en-US", {
        month: "long",
      });
      thisYear = date.toLocaleString("en-US", {
        year: "numeric",
      });

      findate = thisYear + "-" + thisMonth;
      query.push({
        finalDate: findate,
        Month: thisMonth,
      });
    }
  };

  queryCreate();

  try {
    const data = await prisma.$queryRaw`Select  
  SUM(
    case
      when a.date like ${`%${query[0].finalDate}%`} then b.price
      else null
    end
  ) as Sales
  from
  "Booking" a
  left join "Products" b on a.product = b.name
  union all (
    Select  
  SUM(
    case
      when a.date like ${`%${query[1].finalDate}%`} then b.price
      else null
    end
  ) as Sales
  from
  "Booking" a
  left join "Products" b on a.product = b.name
  )
  union all(
    Select  
  SUM(
    case
      when a.date like ${`%${query[2].finalDate}%`} then b.price
      else null
    end
  ) as Sales
  from
  "Booking" a
  left join "Products" b on a.product = b.name
  )
    union all(
    Select  
  SUM(
    case
      when a.date like ${`%${query[3].finalDate}%`} then b.price
      else null
    end
  ) as Sales
  from
  "Booking" a
  left join "Products" b on a.product = b.name
  )
  union all(
    Select  
  SUM(
    case
      when a.date like ${`%${query[4].finalDate}%`} then b.price
      else null
    end
  ) as Sales
  from
  "Booking" a
  left join "Products" b on a.product = b.name
  )
    union all(
    Select  
  SUM(
    case
      when a.date like ${`%${query[5].finalDate}%`} then b.price
      else null
    end
  ) as Sales
  from
  "Booking" a
  left join "Products" b on a.product = b.name
  )
    union all(
    Select  
  SUM(
    case
      when a.date like ${`%${query[6].finalDate}%`} then b.price
      else null
    end
  ) as Sales
  from
  "Booking" a
  left join "Products" b on a.product = b.name
  ) `;

    return res.json({
      data: JSON.parse(
        JSON.stringify(
          data,
          (key, value) => (typeof value === "bigint" ? parseInt(value.toString()) : value) // return everything else unchanged
        )
      ),
      dates: query,
    });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
  return res.json({ message: queryCreate() });
};

export default getStats;

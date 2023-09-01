import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma";

interface booking {
  name: string;
  number: string;
  email: string;
  date: string;
  time: string;
  product: string;
  location: string;
}

const blockDays = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.json({ message: "Not A POST" });
  }
  const blockdates = req.body;
  let data: booking[] = [];
  blockdates.map((e: { date: string; time: string; number: number }) => {
    data.push({
      name: "Admin",
      number: "",
      email: "",
      date: e.date,
      time: e.time,
      product: "",
      location: "",
    });
  });
  console.log(data);
  try {
    const response = await prisma.booking.createMany({
      data: data,
    });
    return res.status(200).json({ message: "Success" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err });
  }
};

export default blockDays;

// const data = await prisma.booking.create({
//   data: {
//     name: "Admin",
//     email: "",
//     number: "",
//     date: e.date,
//     time: e.time,
//     product: "",
//     location: "",
//   },
// });

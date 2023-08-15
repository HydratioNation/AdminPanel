import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma";
import { hash } from "bcrypt-ts";

const ChangePass = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.json({ message: "Not A POST" });
  }

  const data = req.body;

  console.log(data);
  const resu = await hash(data.newpassword, 10);

  console.log(resu);

  try {
    const response = await prisma.admins.update({
      where: {
        id: data.id,
      },
      data: {
        password: resu,
      },
    });
  } catch (err) {
    return res.status(400).json({ message: err });
  }

  return res.json({ message: "Password Updated" });
};

export default ChangePass;

import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import prisma from "../db/prisma";
import { Request, Response } from "express";

export const updateUser = async (req: Request, res: Response) => {
  const { id: userId } = req.params;
  if (!userId) {
    return res.status(400).json({ error: "User not found" });
  }

  try {
    const { name, email, password } = req.body as Pick<
      User,
      "name" | "email" | "password"
    >;
    const hashedPassword = password && (await bcrypt.hash(password, 10));

    const updateUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(hashedPassword && { password: hashedPassword }),
      },
    });

    res.status(200).json({
      success: true,
      message: "User Updated Successfully",
      data: updateUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

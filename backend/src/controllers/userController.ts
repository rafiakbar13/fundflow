import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import prisma from "../db/prisma";
import { Request, Response } from "express";

export const getUser = async (req: Request, res: Response) => {
  const { id: userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: "User not found" });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      photo: true,
      goals: {
        select: {
          id: true,
          presentAmount: true,
          targetAmount: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      expenses: {
        select: {
          id: true,
          category: true,
          amount: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });

  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  res.status(200).json({
    success: true,
    data: user,
  });
};
export const updateUser = async (req: Request, res: Response) => {
  const { id: userId } = req.params;
  if (!userId) {
    return res.status(400).json({ error: "User not found" });
  }

  try {
    const { name, email, photo, phone } = req.body as User;
    // const hashedPassword = await bcrypt.hash(password, 10);
    const updateUser = await prisma.user.update({
      where: { email },
      data: {
        name,
        email,
        // password: hashedPassword,
        phone,
        photo,
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

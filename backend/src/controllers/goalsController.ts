import prisma from "../db/prisma";
import { Request, Response } from "express";

export const getGoals = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.params;

    const goal = await prisma.goals.findUnique({
      where: {
        id: userId,
      },
    });

    if (!goal) {
      return res.status(400).json({ status: false, message: "Goal not found" });
    }

    res.status(200).json({
      success: true,
      data: goal,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const createGoal = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.params;
    const goal = await prisma.goals.create({
      data: {
        ...req.body,
        userId,
      },
    });

    res.status(200).json({
      success: true,
      data: goal,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

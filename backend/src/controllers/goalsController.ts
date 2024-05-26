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
    const { dateRange, presentAmount, targetAmount } = req.body;

    if (!dateRange || !dateRange.from || !dateRange.to) {
      return res.status(400).json({ error: "Invalid date range" });
    }

    const goal = await prisma.goals.create({
      data: {
        from: new Date(dateRange.from),
        to: new Date(dateRange.to),
        presentAmount: parseInt(presentAmount, 10),
        targetAmount: parseInt(targetAmount, 10),
        userId: userId,
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

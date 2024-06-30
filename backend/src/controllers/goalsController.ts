import prisma from "../db/prisma";
import { Request, Response } from "express";

export const getGoals = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const goal = await prisma.goals.findUnique({
      where: {
        id: userId,
      },
    });

    console.log(goal);

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

    // Check if dateRange is provided and valid
    if (!dateRange || !dateRange.from || !dateRange.to) {
      return res.status(400).json({ error: "Invalid date range" });
    }

    // Convert presentAmount and targetAmount to integers
    const parsedPresentAmount = parseInt(presentAmount.replace(/\./g, ""), 10);
    const parsedTargetAmount = parseInt(targetAmount.replace(/\./g, ""), 10);

    if (isNaN(parsedPresentAmount) || isNaN(parsedTargetAmount)) {
      return res.status(400).json({ error: "Invalid amounts" });
    }

    // Create goal in the database
    const goal = await prisma.goals.create({
      data: {
        from: new Date(dateRange.from),
        to: new Date(dateRange.to),
        presentAmount: parsedPresentAmount,
        targetAmount: parsedTargetAmount,
        userId: userId,
      },
    });

    res.status(200).json({
      success: true,
      data: goal,
      message: "Goal created successfully",
    });
  } catch (error) {
    console.error("Error creating goal:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

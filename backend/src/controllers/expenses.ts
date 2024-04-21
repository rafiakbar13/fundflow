import prisma from "../db/prisma";
import { Request, Response } from "express";

export const getExpenses = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.params;
    const expenses = await prisma.expenses.findUnique({
      where: {
        id: userId,
      },
    });

    if (!expenses) {
      return res.status(400).json({
        success: false,
        message: "Expense not found",
      });
    }

    res.status(200).json({
      success: true,
      data: expenses,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const createExpenses = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.params;
    const expenses = await prisma.expenses.create({
      data: {
        ...req.body,
        userId,
      },
    });

    res.status(200).json({
      success: true,
      data: expenses,
    });

    console.log("Expenses created successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateExpenses = async (req: Request, res: Response) => {
  try {
    const { id: expensesId } = req.params;
    const expenses = await prisma.expenses.update({
      where: {
        id: expensesId,
      },
      data: {
        ...req.body,
      },
    });

    res.status(200).json({
      success: true,
      data: expenses,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

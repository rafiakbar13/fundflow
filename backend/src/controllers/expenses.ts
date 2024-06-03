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
    const { name, amount, category } = req.body;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if category exists
    const categoryExists = await prisma.category.findUnique({
      where: { id: category },
    });

    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Create the expense
    const expenses = await prisma.expenses.create({
      data: {
        name,
        amount: parseInt(amount, 10),
        userId,
        categoryId: categoryExists.id,
      },
    });

    res.status(200).json({
      success: true,
      data: expenses,
    });

    console.log("Expenses created successfully");
  } catch (error) {
    console.error("Error creating expense:", error);
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

export const getCategoryExpenses = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.params;
    const expenses = await prisma.expenses.findMany({
      where: {
        userId,
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

export const createCategoryExpenses = async (req: Request, res: Response) => {
  try {
    const { name, budget } = req.body;
    if (!name || !budget) {
      return res.status(400).json({
        success: false,
        message: "Please provide name and budget",
      });
    }

    const existingCategory = await prisma.category.findUnique({
      where: {
        name,
      },
    });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    const expenses = await prisma.category.create({
      data: {
        name,
        budget: parseInt(budget, 10),
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

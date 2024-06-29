import { parseCurrency } from "../utils";
import prisma from "../db/prisma";
import { Request, Response } from "express";

export const createExpenses = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.params;
    const { name, budget } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!name || !budget) {
      return res.status(400).json({
        success: false,
        message: "Please provide name and budget",
      });
    }

    const existingExpenses = await prisma.expenses.findUnique({
      where: {
        name,
      },
    });

    if (existingExpenses) {
      return res.status(400).json({
        success: false,
        message: "Expenses already exists",
      });
    }

    const expenses = await prisma.expenses.create({
      data: {
        name,
        budget: parseCurrency(budget),
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      data: expenses,
      message: "Expenses created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getExpenses = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }
    const expenses = await prisma.expenses.findMany({
      where: {
        userId,
      },
      include: {
        transactions: {
          where: {
            type: "expenses",
          },
        },
      },
    });
    if (!expenses) {
      return res.status(400).json({
        success: false,
        message: "expenses not found",
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

// export const createExpenses = async (req: Request, res: Response) => {
//   try {
//     const { id: userId } = req.params;
//     const { name, amount, category } = req.body;

//     // Check if user exists
//     const user = await prisma.user.findUnique({
//       where: { id: userId },
//     });

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // Check if category exists
//     const categoryExists = await prisma.category.findUnique({
//       where: { id: category },
//     });

//     if (!categoryExists) {
//       return res.status(404).json({
//         success: false,
//         message: "Category not found",
//       });
//     }

//     // Create the expense
//     const expenses = await prisma.expenses.create({
//       data: {
//         name,
//         amount: parseInt(amount, 10),
//         userId,
//         categoryId: categoryExists.id,
//       },
//     });

//     res.status(200).json({
//       success: true,
//       data: expenses,
//     });

//     console.log("Expenses created successfully");
//   } catch (error) {
//     console.error("Error creating expense:", error);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

export const updateExpenses = async (req: Request, res: Response) => {
  try {
    const { id: expensesId } = req.params;
    const { budget } = req.body;
    const expenses = await prisma.expenses.update({
      where: {
        id: expensesId,
      },
      data: {
        budget: parseCurrency(budget),
      },
    });

    res.status(200).json({
      success: true,
      data: expenses,
      message: "Expenses updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// export const getCategoryExpenses = async (req: Request, res: Response) => {
//   try {
//     const { id: userId } = req.params;
//     const category = await prisma.category.findMany({
//       where: {
//         id: userId,
//       },
//     });

//     res.status(200).json({
//       success: true,
//       data: category,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

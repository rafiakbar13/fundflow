import prisma from "../db/prisma";
import { Request, Response } from "express";

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const {
      description,
      amount,
      type,
      status,
      date,
      categoryId,
      paymentMethodId,
      accountId,
      userId,
    } = req.body;

    if (!description || !amount || !type || !status || !date) {
      return res.status(400).json({
        success: false,
        message: "Invalid data",
      });
    }

    const transaction = await prisma.transaction.create({
      data: {
        description,
        amount,
        type,
        status,
        date: new Date(date),
        categoryId,
        paymentMethodId,
        accountId,
        userId: req.params.id,
      },
    });

    res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }
    const transactions = await prisma.transaction.findMany({
      include: {
        category: true,
        paymentMethod: true,
        account: true,
        user: true,
      },
    });
    if (!transactions) {
      return res.status(400).json({
        success: false,
        message: "Transaction not found",
      });
    }
    res.status(200).json({
      success: true,
      data: transactions,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

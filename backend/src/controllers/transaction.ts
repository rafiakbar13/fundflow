import prisma from "../db/prisma";
import { Request, Response } from "express";
import { parseCurrency } from "../utils";
export const createTransaction = async (req: Request, res: Response) => {
  try {
    const {
      items,
      amount,
      type,
      status,
      date,
      paymentMethod,
      accountId,
      expensesId,
    } = req.body;

    console.log(req.body);

    const { id: userId } = req.params;
    if (
      !items ||
      !amount ||
      !type ||
      !status ||
      !date ||
      !paymentMethod ||
      !accountId ||
      !expensesId
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid data",
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const expensesExists = await prisma.expenses.findUnique({
      where: { id: expensesId },
    });

    if (!expensesExists) {
      return res.status(404).json({
        success: false,
        message: "expenses not found",
      });
    }

    const accountExists = await prisma.account.findUnique({
      where: { id: accountId },
    });

    if (!accountExists) {
      return res.status(404).json({
        success: false,
        message: "Account not found",
      });
    }

    const transaction = await prisma.transaction.create({
      data: {
        items,
        amount: parseCurrency(amount),
        type,
        status,
        paymentMethod,
        expensesId: expensesExists.id,
        date: new Date(date),
        accountId: accountExists.id,
        userId: user.id,
      },
    });

    console.log(transaction);

    res.status(200).json({
      success: true,
      data: transaction,
      message: "Transaction created successfully",
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
    const { type } = req.query;
    const { id: userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        type: type as string,
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

import prisma from "../db/prisma";
import { Request, Response } from "express";

export const createAccount = async (req: Request, res: Response) => {
  try {
    const { bankName, accountNumber, type, balance } = req.body;
    const { id: userId } = req.params;
    if (!bankName || !accountNumber || !type || !balance) {
      return res.status(400).json({
        success: false,
        message: "Invalid data",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const account = await prisma.account.create({
      data: {
        bankName,
        accountNumber,
        type,
        balance: parseFloat(balance),
        userId: user.id,
      },
    });

    res.status(200).json({
      success: true,
      data: account,
      message: "Account created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAccounts = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }

    const accounts = await prisma.account.findMany({
      where: {
        userId,
      },
    });

    console.log(accounts);

    res.status(200).json({
      status: true,
      data: accounts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateAccount = async (req: Request, res: Response) => {
  try {
    const { id: accountId } = req.params;
    const account = await prisma.account.update({
      where: {
        id: accountId,
      },
      data: {
        ...req.body,
      },
    });

    res.status(200).json({
      success: true,
      data: account,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAccount = async (req: Request, res: Response) => {
  try {
    const { id: accountId } = req.params;
    if (!accountId) {
      return res.status(400).json({
        success: false,
        message: "account not found",
      });
    }

    const account = await prisma.account.findUnique({
      where: {
        id: accountId,
      },
    });

    res.status(200).json({
      status: true,
      data: account,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

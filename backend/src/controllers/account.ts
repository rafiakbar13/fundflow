import prisma from "../db/prisma";
import { Request, Response } from "express";

export const createAccount = async (req: Request, res: Response) => {
  try {
    const { bankName, accountNumber, type, balance } = req.body;
    const { userId } = req.params;
    if (!bankName || !accountNumber || !type || !balance) {
      return res.status(400).json({
        success: false,
        message: "Invalid data",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const secureAccountNumber = (accountNumber: string) => {
      const start = accountNumber.substring(0, accountNumber.length - 3);
      const masked = accountNumber
        .substring(accountNumber.length - 3)
        .replace(/\d/g, "*");

      return `${start}${masked}`;
    };

    const parsedBalance = parseFloat(
      balance.replace(/,/g, "").replace(/\./g, "")
    );

    const account = await prisma.account.create({
      data: {
        bankName,
        accountNumber: secureAccountNumber(accountNumber),
        type,
        balance: parsedBalance,
        userId,
      },
    });

    res.status(201).json({
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
    const { userId } = req.params;
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
    const { bankName, accountNumber, type, balance } = req.body;

    const parsedBalance = parseFloat(
      balance.replace(/,/g, "").replace(/\./g, "")
    );

    const account = await prisma.account.update({
      where: {
        id: accountId,
      },
      data: {
        bankName,
        accountNumber,
        type,
        balance: parsedBalance,
      },
    });

    console.log(account);

    res.status(200).json({
      success: true,
      data: account,
      message: "Account updated successfully",
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
      include: {
        transactions: true,
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

export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const { id: accountId } = req.params;
    if (!accountId) {
      return res.status(400).json({
        success: false,
        message: "account not found",
      });
    }

    const account = await prisma.account.delete({
      where: {
        id: accountId,
      },
    });

    res.status(200).json({
      success: true,
      data: account,
      message: "Account deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    console.log(error);
  }
};

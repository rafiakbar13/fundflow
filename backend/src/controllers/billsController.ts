import prisma from "../db/prisma";
import { Request, Response } from "express";
import { parseCurrency } from "../utils";
export const createBills = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { name, amount, dueDate } = req.body;
    if (!name || !amount || !dueDate) {
      return res.status(400).json({
        success: false,
        message: "Invalid data",
      });
    }

    const bill = await prisma.bills.create({
      data: {
        name,
        amount: parseCurrency(amount),
        dueDate: new Date(dueDate),
        userId,
      },
    });

    res.status(200).json({
      success: true,
      data: bill,
      message: "Bill created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getBills = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }
    const bills = await prisma.bills.findMany({
      where: {
        userId,
      },
    });

    res.status(200).json({
      success: true,
      data: bills,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteBill = async (req: Request, res: Response) => {
  try {
    const { id: billId } = req.params;
    if (!billId) {
      return res.status(400).json({
        success: false,
        message: "bill not found",
      });
    }
    const bill = await prisma.bills.delete({
      where: {
        id: billId,
      },
    });

    res.status(200).json({
      success: true,
      data: bill,
      message: "Bill deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateBill = async (req: Request, res: Response) => {
  try {
    const { id: billId } = req.params;
    const { name, amount, dueDate } = req.body;

    if (!billId) {
      return res.status(400).json({
        success: false,
        message: "bill not found",
      });
    }
    const bill = await prisma.bills.update({
      where: {
        id: billId,
      },
      data: {
        name,
        amount: parseCurrency(amount),
        dueDate: new Date(dueDate),
      },
    });

    res.status(200).json({
      success: true,
      data: bill,
      message: "Bill updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

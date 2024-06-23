// import prisma from "../db/prisma";
// import { Request, Response } from "express";

// export const createRevenue = async (req: Request, res: Response) => {
//   try {
//     const { name, amount, categoryId, userId } = req.body;
//     if (!name || !amount || !categoryId || !userId) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid data",
//       });
//     }
//     const revenue = await prisma.revenue.create({
//       data: {
//         name,
//         amount,
//         categoryId,
//         userId: req.params.id,
//       },
//     });
//     res.status(201).json({
//       success: true,
//       data: revenue,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

// export const getRevenue = async (req: Request, res: Response) => {
//   try {
//     const { id: userId } = req.params;
//     const revenue = await prisma.revenue.findMany({
//       where: {
//         userId,
//       },
//     });
//     res.status(200).json({
//       success: true,
//       data: revenue,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

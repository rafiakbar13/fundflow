"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateExpenses = exports.getExpenses = exports.createExpenses = void 0;
const utils_1 = require("../utils");
const prisma_1 = __importDefault(require("../db/prisma"));
const createExpenses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: userId } = req.params;
        const { name, budget } = req.body;
        const user = yield prisma_1.default.user.findUnique({
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
        const existingExpenses = yield prisma_1.default.expenses.findUnique({
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
        const expenses = yield prisma_1.default.expenses.create({
            data: {
                name,
                budget: (0, utils_1.parseCurrency)(budget),
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
exports.createExpenses = createExpenses;
const getExpenses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: userId } = req.params;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "user not found",
            });
        }
        const expenses = yield prisma_1.default.expenses.findMany({
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
exports.getExpenses = getExpenses;
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
const updateExpenses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: expensesId } = req.params;
        const { budget } = req.body;
        const expenses = yield prisma_1.default.expenses.update({
            where: {
                id: expensesId,
            },
            data: {
                budget: (0, utils_1.parseCurrency)(budget),
            },
        });
        res.status(200).json({
            success: true,
            data: expenses,
            message: "Expenses updated successfully",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
exports.updateExpenses = updateExpenses;
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
//# sourceMappingURL=expenses.js.map
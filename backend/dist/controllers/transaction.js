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
exports.getTransactions = exports.createTransaction = void 0;
const prisma_1 = __importDefault(require("../db/prisma"));
const utils_1 = require("../utils");
const createTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { items, amount, type, status, date, paymentMethod, accountId, expensesId, } = req.body;
        console.log(req.body);
        const { id: userId } = req.params;
        if (!items ||
            !amount ||
            !type ||
            !status ||
            !date ||
            !paymentMethod ||
            !accountId ||
            !expensesId) {
            return res.status(400).json({
                success: false,
                message: "Invalid data",
            });
        }
        const user = yield prisma_1.default.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        const expensesExists = yield prisma_1.default.expenses.findUnique({
            where: { id: expensesId },
        });
        if (!expensesExists) {
            return res.status(404).json({
                success: false,
                message: "expenses not found",
            });
        }
        const accountExists = yield prisma_1.default.account.findUnique({
            where: { id: accountId },
        });
        if (!accountExists) {
            return res.status(404).json({
                success: false,
                message: "Account not found",
            });
        }
        const transaction = yield prisma_1.default.transaction.create({
            data: {
                items,
                amount: (0, utils_1.parseCurrency)(amount),
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
exports.createTransaction = createTransaction;
const getTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type } = req.query;
        const { id: userId } = req.params;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "user not found",
            });
        }
        const transactions = yield prisma_1.default.transaction.findMany({
            where: {
                userId,
                type: type,
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
exports.getTransactions = getTransactions;
//# sourceMappingURL=transaction.js.map
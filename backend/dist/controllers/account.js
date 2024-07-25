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
exports.deleteAccount = exports.getAccount = exports.updateAccount = exports.getAccounts = exports.createAccount = void 0;
const prisma_1 = __importDefault(require("../db/prisma"));
const createAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bankName, accountNumber, type, balance } = req.body;
        const { userId } = req.params;
        if (!bankName || !accountNumber || !type || !balance) {
            return res.status(400).json({
                success: false,
                message: "Invalid data",
            });
        }
        const user = yield prisma_1.default.user.findUnique({
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
        const secureAccountNumber = (accountNumber) => {
            const start = accountNumber.substring(0, accountNumber.length - 3);
            const masked = accountNumber
                .substring(accountNumber.length - 3)
                .replace(/\d/g, "*");
            return `${start}${masked}`;
        };
        const parsedBalance = parseFloat(balance.replace(/,/g, "").replace(/\./g, ""));
        const account = yield prisma_1.default.account.create({
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
exports.createAccount = createAccount;
const getAccounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "user not found",
            });
        }
        const accounts = yield prisma_1.default.account.findMany({
            where: {
                userId,
            },
        });
        res.status(200).json({
            status: true,
            data: accounts,
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
exports.getAccounts = getAccounts;
const updateAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: accountId } = req.params;
        const { bankName, accountNumber, type, balance } = req.body;
        const parsedBalance = parseFloat(balance.replace(/,/g, "").replace(/\./g, ""));
        const account = yield prisma_1.default.account.update({
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
        res.status(200).json({
            success: true,
            data: account,
            message: "Account updated successfully",
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
exports.updateAccount = updateAccount;
const getAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: accountId } = req.params;
        if (!accountId) {
            return res.status(400).json({
                success: false,
                message: "account not found",
            });
        }
        const account = yield prisma_1.default.account.findUnique({
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
exports.getAccount = getAccount;
const deleteAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: accountId } = req.params;
        if (!accountId) {
            return res.status(400).json({
                success: false,
                message: "account not found",
            });
        }
        const account = yield prisma_1.default.account.delete({
            where: {
                id: accountId,
            },
        });
        res.status(200).json({
            success: true,
            data: account,
            message: "Account deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
        console.log(error);
    }
});
exports.deleteAccount = deleteAccount;
//# sourceMappingURL=account.js.map
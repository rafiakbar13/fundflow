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
exports.updateBill = exports.deleteBill = exports.getBills = exports.createBills = void 0;
const prisma_1 = __importDefault(require("../db/prisma"));
const utils_1 = require("../utils");
const createBills = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { name, amount, dueDate } = req.body;
        if (!name || !amount || !dueDate) {
            return res.status(400).json({
                success: false,
                message: "Invalid data",
            });
        }
        const bill = yield prisma_1.default.bills.create({
            data: {
                name,
                amount: (0, utils_1.parseCurrency)(amount),
                dueDate: new Date(dueDate),
                userId,
            },
        });
        res.status(200).json({
            success: true,
            data: bill,
            message: "Bill created successfully",
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
exports.createBills = createBills;
const getBills = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: userId } = req.params;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "user not found",
            });
        }
        const bills = yield prisma_1.default.bills.findMany({
            where: {
                userId,
            },
        });
        res.status(200).json({
            success: true,
            data: bills,
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
exports.getBills = getBills;
const deleteBill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: billId } = req.params;
        if (!billId) {
            return res.status(400).json({
                success: false,
                message: "bill not found",
            });
        }
        const bill = yield prisma_1.default.bills.delete({
            where: {
                id: billId,
            },
        });
        res.status(200).json({
            success: true,
            data: bill,
            message: "Bill deleted successfully",
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
exports.deleteBill = deleteBill;
const updateBill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: billId } = req.params;
        const { name, amount, dueDate } = req.body;
        if (!billId) {
            return res.status(400).json({
                success: false,
                message: "bill not found",
            });
        }
        const bill = yield prisma_1.default.bills.update({
            where: {
                id: billId,
            },
            data: {
                name,
                amount: (0, utils_1.parseCurrency)(amount),
                dueDate: new Date(dueDate),
            },
        });
        res.status(200).json({
            success: true,
            data: bill,
            message: "Bill updated successfully",
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
exports.updateBill = updateBill;
//# sourceMappingURL=billsController.js.map
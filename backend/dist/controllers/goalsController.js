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
exports.createGoal = exports.getGoals = void 0;
const prisma_1 = __importDefault(require("../db/prisma"));
const getGoals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: userId } = req.params;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "user not found",
            });
        }
        const goals = yield prisma_1.default.goals.findMany({
            where: {
                userId,
            },
        });
        if (!goals) {
            return res.status(400).json({
                success: false,
                message: "goals not found",
            });
        }
        res.status(200).json({
            success: true,
            data: goals,
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
exports.getGoals = getGoals;
const createGoal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: userId } = req.params;
        const { dateRange, presentAmount, targetAmount } = req.body;
        // Check if dateRange is provided and valid
        if (!dateRange || !dateRange.from || !dateRange.to) {
            return res.status(400).json({ error: "Invalid date range" });
        }
        // Convert presentAmount and targetAmount to integers
        const parsedPresentAmount = parseInt(presentAmount.replace(/\./g, ""), 10);
        const parsedTargetAmount = parseInt(targetAmount.replace(/\./g, ""), 10);
        if (isNaN(parsedPresentAmount) || isNaN(parsedTargetAmount)) {
            return res.status(400).json({ error: "Invalid amounts" });
        }
        // Create goal in the database
        const goal = yield prisma_1.default.goals.create({
            data: {
                from: new Date(dateRange.from),
                to: new Date(dateRange.to),
                presentAmount: parsedPresentAmount,
                targetAmount: parsedTargetAmount,
                userId: userId,
            },
        });
        res.status(200).json({
            success: true,
            data: goal,
            message: "Goal created successfully",
        });
    }
    catch (error) {
        console.error("Error creating goal:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
exports.createGoal = createGoal;
//# sourceMappingURL=goalsController.js.map
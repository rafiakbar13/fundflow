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
exports.updateUser = exports.getUser = void 0;
const prisma_1 = __importDefault(require("../db/prisma"));
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: userId } = req.params;
    if (!userId) {
        return res.status(400).json({ error: "User not found" });
    }
    const user = yield prisma_1.default.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            photo: true,
            goals: {
                select: {
                    id: true,
                    presentAmount: true,
                    targetAmount: true,
                    createdAt: true,
                    updatedAt: true,
                },
            },
            expenses: {
                select: {
                    id: true,
                    name: true,
                    budget: true,
                    createdAt: true,
                    updatedAt: true,
                },
            },
        },
    });
    if (!user) {
        return res.status(400).json({ error: "User not found" });
    }
    res.status(200).json({
        success: true,
        data: user,
    });
});
exports.getUser = getUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: userId } = req.params;
    if (!userId) {
        return res.status(400).json({ error: "User not found" });
    }
    try {
        const { name, email, photo, phone } = req.body;
        // const hashedPassword = await bcrypt.hash(password, 10);
        const updateUser = yield prisma_1.default.user.update({
            where: { email },
            data: {
                name,
                email,
                // password: hashedPassword,
                phone,
                photo,
            },
        });
        res.status(200).json({
            success: true,
            message: "User Updated Successfully",
            data: updateUser,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});
exports.updateUser = updateUser;
//# sourceMappingURL=userController.js.map
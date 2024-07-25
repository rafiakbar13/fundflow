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
exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = __importDefault(require("../db/prisma"));
const validator_1 = __importDefault(require("validator"));
const generateToken = (user) => {
    return jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
    });
};
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!validator_1.default.isEmail(email)) {
        return res
            .status(400)
            .json({ success: false, message: "Please enter a valid email" });
    }
    if (password.length < 6) {
        return res.status(400).json({
            success: false,
            message: "Password must be at least 6 characters long",
        });
    }
    try {
        const existingUser = yield prisma_1.default.user.findUnique({
            where: {
                email,
            },
        });
        if (existingUser) {
            return res
                .status(400)
                .json({ success: false, message: "User already exists" });
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        const user = yield prisma_1.default.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        });
        res
            .status(201)
            .json({ success: true, message: "User Sucessfully created", data: user });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!validator_1.default.isEmail(email)) {
        return res
            .status(400)
            .json({ success: false, message: "Invalid email format" });
    }
    try {
        const user = yield prisma_1.default.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid credentials" });
        }
        const isPasswordCorrect = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid credentials" });
        }
        const token = generateToken(user);
        res.status(200).json({
            success: true,
            message: "Successfully Login",
            token,
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                photo: user.photo,
                phone: user.phone,
                createdAt: user.createdAt,
            },
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
exports.login = login;
//# sourceMappingURL=authController.js.map
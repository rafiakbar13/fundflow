"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const expenses_1 = require("../controllers/expenses");
const verifyToken_1 = require("../auth/verifyToken");
const router = express_1.default.Router();
router.get("/expenses/:id", verifyToken_1.authenticate, expenses_1.getExpenses);
router.post("/expenses/:id", verifyToken_1.authenticate, expenses_1.createExpenses);
router.patch("/expenses/:id", verifyToken_1.authenticate, expenses_1.updateExpenses);
exports.default = router;
//# sourceMappingURL=expenses.js.map
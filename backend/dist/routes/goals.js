"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const goalsController_1 = require("../controllers/goalsController");
const verifyToken_1 = require("../auth/verifyToken");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/goals/:id", verifyToken_1.authenticate, goalsController_1.getGoals);
router.post("/goals/:id", verifyToken_1.authenticate, goalsController_1.createGoal);
exports.default = router;
//# sourceMappingURL=goals.js.map
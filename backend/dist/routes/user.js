"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const verifyToken_1 = require("../auth/verifyToken");
const router = express_1.default.Router();
router.get("/:id", verifyToken_1.authenticate, userController_1.getUser);
router.patch("/:id", verifyToken_1.authenticate, userController_1.updateUser);
exports.default = router;
//# sourceMappingURL=user.js.map
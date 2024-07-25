"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const billsController_1 = require("../controllers/billsController");
const router = express_1.default.Router();
router.post("/bills/:userId", billsController_1.createBills);
router.get("/bills/:id", billsController_1.getBills);
router.delete("/bills/:id", billsController_1.deleteBill);
router.put("/bills/:id", billsController_1.updateBill);
exports.default = router;
//# sourceMappingURL=bills.js.map
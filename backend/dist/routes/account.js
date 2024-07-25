"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const account_1 = require("../controllers/account");
const router = express_1.default.Router();
// Create a new account for a user
router.post("/:userId/accounts", account_1.createAccount);
// Get all accounts for a specific user
router.get("/:userId/accounts", account_1.getAccounts);
// Get a specific account by account id
router.get("/accounts/:id", account_1.getAccount);
// Update a specific account by account id
router.patch("/accounts/:id", account_1.updateAccount);
// Delete a specific account by account id
router.delete("/accounts/:id", account_1.deleteAccount);
exports.default = router;
//# sourceMappingURL=account.js.map
import express from "express";
import {
  createAccount,
  getAccount,
  getAccounts,
  updateAccount,
  deleteAccount,
} from "../controllers/account";

const router = express.Router();

// Create a new account for a user
router.post("/:userId/accounts", createAccount);

// Get all accounts for a specific user
router.get("/:userId/accounts", getAccounts);

// Get a specific account by account id
router.get("/accounts/:id", getAccount);

// Update a specific account by account id
router.patch("/accounts/:id", updateAccount);

// Delete a specific account by account id
router.delete("/accounts/:id", deleteAccount);

export default router;

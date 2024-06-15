import express from "express";
import {
  createAccount,
  getAccount,
  getAccounts,
  updateAccount,
} from "../controllers/account";

const router = express.Router();

router.post("/:id", createAccount);
router.get("/:id", getAccount);
router.get("/:id", getAccounts);
router.patch("/:id", updateAccount);

export default router;

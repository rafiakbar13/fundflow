import express from "express";
import {
  getExpenses,
  createExpenses,
  updateExpenses,
} from "../controllers/expenses";
import { authenticate } from "../auth/verifyToken";

const router = express.Router();

router.get("/:id", authenticate, getExpenses);
router.post("/:id", authenticate, createExpenses);
router.patch("/:id", authenticate, updateExpenses);
export default router;

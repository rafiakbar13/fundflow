import express from "express";
import {
  getExpenses,
  createExpenses,
  updateExpenses,
} from "../controllers/expenses";
import { authenticate } from "../auth/verifyToken";

const router = express.Router();

router.get("/expenses/:id", authenticate, getExpenses);
router.post("/expenses/:id", authenticate, createExpenses);
router.patch("/expenses/:id", authenticate, updateExpenses);

export default router;

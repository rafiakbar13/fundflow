import { createGoal, getGoals } from "../controllers/goalsController";
import { authenticate } from "../auth/verifyToken";
import express from "express";

const router = express.Router();

router.get("/goals/:userId", authenticate, getGoals);
router.post("/goals/:id", authenticate, createGoal);

export default router;

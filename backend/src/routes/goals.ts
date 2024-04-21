import { createGoal, getGoals } from "../controllers/goalsController";
import { authenticate } from "../auth/verifyToken";
import express from "express";

const router = express.Router();

router.get("/:id", authenticate, getGoals);
router.post("/:id", authenticate, createGoal);

export default router;

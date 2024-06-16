import express from "express";
import { createBills, getBills } from "../controllers/billsController";

const router = express.Router();

router.post("/bills/:userId", createBills);
router.get("/bills/:id", getBills);

export default router;

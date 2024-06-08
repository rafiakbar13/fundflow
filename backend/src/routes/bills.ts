import express from "express";
import { createBill, getBills } from "../controllers/billsController";

const router = express.Router();

router.post("/:id", createBill);
router.get("/:id", getBills);

export default router;

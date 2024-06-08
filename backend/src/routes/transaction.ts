import express from "express";
import { createTransaction, getTransactions } from "../controllers/transaction";

const router = express.Router();

router.post("/:id", createTransaction);
router.get("/:id", getTransactions);

export default router;

import express from "express";
import { createTransaction, getTransactions } from "../controllers/transaction";

const router = express.Router();

router.post("/transactions/:id", createTransaction);
router.get("/transactions/:id", getTransactions);

export default router;

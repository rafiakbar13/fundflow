import express from "express";
import {
  createBills,
  getBills,
  deleteBill,
  updateBill,
} from "../controllers/billsController";

const router = express.Router();

router.post("/bills/:userId", createBills);
router.get("/bills/:id", getBills);
router.delete("/bills/:id", deleteBill);
router.put("/bills/:id", updateBill);

export default router;

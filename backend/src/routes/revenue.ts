import express from "express";
import { createRevenue, getRevenue } from "../controllers/revenue";

const router = express.Router();

router.post("/:id", createRevenue);
router.get("/:id", getRevenue);

export default router;

import express from "express";
import { updateUser } from "../controllers/UserController";
import { authenticate } from "../auth/verifyToken";
const router = express.Router();

router.put("/:id", authenticate, updateUser);

export default router;

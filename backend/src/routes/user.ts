import express from "express";
import { updateUser, getUser } from "../controllers/userController";
import { authenticate } from "../auth/verifyToken";
const router = express.Router();

router.get("/:id", authenticate, getUser);
router.patch("/:id", authenticate, updateUser);

export default router;

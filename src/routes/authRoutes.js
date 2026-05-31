import { Router } from "express";
import { signup, login, profile } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", authMiddleware, profile);

export default router;

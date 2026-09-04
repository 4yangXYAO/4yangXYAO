import { Router } from "express";
import rateLimit from "express-rate-limit";
import { login, logout, me } from "../controllers/authController";
import { protect } from "../middlewares/authMiddleware";

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Terlalu banyak percobaan login, coba lagi dalam 15 menit",
  },
});

const authRoutes = Router();

authRoutes.post("/login", loginLimiter, login);
authRoutes.get("/me", protect, me);
authRoutes.get("/logout", logout);

export default authRoutes;

import { Router } from "express";
import { login, logout, me } from "../controllers/authController";
import { protect } from "../middlewares/authMiddleware";

const authRoutes = Router();

authRoutes.post("/login", login);
authRoutes.get("/me", protect, me);
authRoutes.get("/logout", logout);

export default authRoutes;

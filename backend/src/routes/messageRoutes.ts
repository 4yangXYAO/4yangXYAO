import { Router } from "express";
import rateLimit from "express-rate-limit";
import * as messageController from "../controllers/messageController";
import { protect } from "../middlewares/authMiddleware";

const messageLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Terlalu banyak pesan terkirim, coba lagi dalam 15 menit",
  },
});

const messageRoutes = Router();

messageRoutes.get("/", protect, messageController.getMessages);
messageRoutes.post("/", messageLimiter, messageController.createMessage);
messageRoutes.patch("/:id/read", protect, messageController.markMessageAsRead);
messageRoutes.delete("/:id", protect, messageController.deleteMessage);

export default messageRoutes;

import { Router } from "express";
import * as messageController from "../controllers/messageController";
import { protect } from "../middlewares/authMiddleware";

const messageRoutes = Router();

messageRoutes.get("/", protect, messageController.getMessages);
messageRoutes.post("/", messageController.createMessage);
messageRoutes.patch("/:id/read", protect, messageController.markMessageAsRead);
messageRoutes.delete("/:id", protect, messageController.deleteMessage);

export default messageRoutes;

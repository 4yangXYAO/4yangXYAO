import type { Request, Response } from "express";
import { Message } from "../models/Message";
import { emailService } from "../utils/emailService";

export const getMessages = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json({ success: true, data: messages });
};

export const createMessage = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { name, email, message } = req.body as {
    name?: unknown;
    email?: unknown;
    message?: unknown;
  };

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    !name.trim() ||
    !email.trim() ||
    message.trim().length < 10
  ) {
    res.status(400).json({
      success: false,
      message: "Semua field wajib diisi, min 10 karakter",
    });
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    res.status(400).json({ success: false, message: "Format email tidak valid" });
    return;
  }
  if (name.length > 100 || message.length > 5000) {
    res.status(400).json({
      success: false,
      message: "Name max 100, message max 5000 karakter",
    });
    return;
  }

  const newMessage = await Message.create({
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
  });

  // Send email notification (asynchronously to not delay the response too much)
  emailService
    .sendContactEmail({
      name: newMessage.name,
      email: newMessage.email,
      message: newMessage.message,
    })
    .catch((err) => {
      console.error("Failed to send contact email:", err);
    });

  res.status(201).json({ success: true, data: newMessage });
};

export const markMessageAsRead = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const message = await Message.findByIdAndUpdate(
    req.params.id,
    { isRead: true },
    { new: true },
  );

  if (!message) {
    res.status(404).json({ success: false, message: "Message not found" });
    return;
  }

  res.json({ success: true, data: message });
};

export const deleteMessage = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const message = await Message.findByIdAndDelete(req.params.id);

  if (!message) {
    res.status(404).json({ success: false, message: "Message not found" });
    return;
  }

  res.json({ success: true, message: "Message deleted" });
};

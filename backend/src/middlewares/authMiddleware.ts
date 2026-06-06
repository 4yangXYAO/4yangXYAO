import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

type TokenPayload = {
  userId: string;
};

export const protect = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.cookies?.token;

  if (!token) {
    res.status(401).json({ success: false, message: "Not authorized" });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET is required");
    }

    const decoded = jwt.verify(token, secret) as TokenPayload;
    (req as Request & { userId?: string }).userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ success: false, message: "Not authorized" });
  }
};

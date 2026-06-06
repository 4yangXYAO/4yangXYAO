import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
};

const createToken = (userId: string): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is required");
  }

  return jwt.sign({ userId }, secret, { expiresIn: "7d" });
};

const sanitizeUser = (user: {
  _id: unknown;
  username: string;
  email: string;
  role: string;
}) => ({
  id: String(user._id),
  username: user.username,
  email: user.email,
  role: user.role,
});

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body as {
    username?: string;
    password?: string;
  };

  if (!username || !password) {
    res
      .status(400)
      .json({ success: false, message: "Username dan password wajib diisi" });
    return;
  }

  const user = await User.findOne({ username: username.trim() });

  if (!user) {
    res
      .status(401)
      .json({ success: false, message: "Username atau password salah" });
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    res
      .status(401)
      .json({ success: false, message: "Username atau password salah" });
    return;
  }

  const token = createToken(String(user._id));

  res.cookie("token", token, cookieOptions);
  res.json({ success: true, user: sanitizeUser(user) });
};

export const me = async (req: Request, res: Response): Promise<void> => {
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

    const payload = jwt.verify(token, secret) as { userId: string };
    const user = await User.findById(payload.userId);

    if (!user) {
      res.status(401).json({ success: false, message: "Not authorized" });
      return;
    }

    res.json({ success: true, user: sanitizeUser(user) });
  } catch {
    res.status(401).json({ success: false, message: "Not authorized" });
  }
};

export const logout = (_req: Request, res: Response): void => {
  res.clearCookie("token", cookieOptions);
  res.json({ success: true });
};

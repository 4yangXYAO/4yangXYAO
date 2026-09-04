import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import path from "path";
import { connectDB } from "./config/db";
import authRoutes from "./routes/authRoutes";
import projectRoutes from "./routes/projectRoutes";
import stackroutes from "./routes/StackRoutes";
import profileRoutes from "./routes/profileRoutes";
import messageRoutes from "./routes/messageRoutes";
import { errorHandler, notFound } from "./middlewares/errorMiddleware";

const app = express();
const port = Number(process.env.PORT || 5000);
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

// Behind Vercel/proxies so rate limiting sees the real client IP.
app.set("trust proxy", 1);
app.use(
  cors({
    origin: frontendUrl.split(",").map((item) => item.trim()),
    credentials: true,
  }),
);
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 200 }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static(path.resolve(process.cwd(), "uploads")));

app.get("/", (_req, res) => {
  res.json({ message: "API running" });
});

// All /api routes need Mongo. connectDB is a cached singleton, so after the
// first success this is a resolved-promise await (no per-request I/O).
// DB down => clear 503 instead of a 500 on every request.
app.use("/api", async (_req, res, next) => {
  try {
    await connectDB();
    next();
  } catch {
    res.status(503).json({ success: false, message: "Database unavailable" });
  }
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/messages", messageRoutes);
app.use("/api/v1/stacks", stackroutes);
app.use(notFound);
app.use(errorHandler);

export default app;

if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  // Listen immediately; the DB connects lazily on the first /api request.
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

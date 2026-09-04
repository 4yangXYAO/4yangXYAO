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
import { FALLBACK_PROJECTS } from "./data/projects";
import { FALLBACK_STACKS } from "./data/stacks";

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

// Mongo is optional until Fase 0. On a successful connect we just proceed.
// On failure, read endpoints for projects/stacks are served from static data
// so the site stays fully functional without a database; writes and other
// endpoints still return a clear 503.
// ponytail: single source of truth for this data once the DB is provisioned.
app.use("/api/v1", async (req, res, next) => {
  try {
    await connectDB();
    return next();
  } catch {
    // fall through to static fallback below
  }

  if (req.method === "GET") {
    const p = req.path;
    if (p === "/projects") {
      const featured = req.query.featured === "true";
      const data = featured
        ? FALLBACK_PROJECTS.filter((x) => x.featured)
        : FALLBACK_PROJECTS;
      return res.json({ success: true, data });
    }
    if (p.startsWith("/projects/")) {
      const slug = p.slice("/projects/".length);
      const project = FALLBACK_PROJECTS.find((x) => x.slug === slug);
      if (!project) {
        return res
          .status(404)
          .json({ success: false, message: "Project not found" });
      }
      return res.json({ success: true, data: project });
    }
    if (p === "/stacks") {
      return res.json({ success: true, data: FALLBACK_STACKS });
    }
  }

  return res
    .status(503)
    .json({ success: false, message: "Database unavailable" });
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

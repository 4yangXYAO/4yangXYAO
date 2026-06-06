import { Router } from "express";
import * as projectController from "../controllers/projectController";
import { protect } from "../middlewares/authMiddleware";
import { upload } from "../middlewares/uploadMiddleware";

const projectRoutes = Router();

projectRoutes.get("/", projectController.getProjects);
projectRoutes.get("/:slug", projectController.getProjectBySlug);
projectRoutes.post(
  "/",
  protect,
  upload.single("image"),
  projectController.createProject,
);
projectRoutes.put(
  "/:id",
  protect,
  upload.single("image"),
  projectController.updateProject,
);
projectRoutes.delete("/:id", protect, projectController.deleteProject);

export default projectRoutes;

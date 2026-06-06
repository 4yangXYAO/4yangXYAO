import { Router } from "express";
import * as profileController from "../controllers/profileController";
import { protect } from "../middlewares/authMiddleware";
import { upload } from "../middlewares/uploadMiddleware";

const profileRoutes = Router();

profileRoutes.get("/", profileController.getProfile);
profileRoutes.put(
  "/",
  protect,
  upload.single("avatar"),
  profileController.updateProfile,
);

export default profileRoutes;

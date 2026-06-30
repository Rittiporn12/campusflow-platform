import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import healthRoutes from "./health.routes.js";

const router = Router();

router.use("/health", healthRoutes);
router.use("/api/auth", authRoutes);

export default router;

import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import ticketRoutes from "../modules/tickets/ticket.routes.js";
import healthRoutes from "./health.routes.js";

const router = Router();

router.use("/health", healthRoutes);
router.use("/api/auth", authRoutes);
router.use("/api", ticketRoutes);

export default router;

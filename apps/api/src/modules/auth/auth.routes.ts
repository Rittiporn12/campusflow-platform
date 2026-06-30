import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { authController } from "./auth.controller.js";

const router = Router();

router.post("/register", (req, res, next) => {
  authController.register(req, res).catch(next);
});

router.post("/login", (req, res, next) => {
  authController.login(req, res).catch(next);
});

router.get("/me", requireAuth, (req, res, next) => {
  authController.me(req, res).catch(next);
});

export default router;
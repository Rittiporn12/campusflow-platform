import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { assetController } from "./asset.controller.js";

const router = Router();

router.get(
  "/asset-categories",
  requireAuth,
  asyncHandler(assetController.getAssetCategories),
);

export default router;

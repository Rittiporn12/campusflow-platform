import { Router } from "express";
import {
  requireAuth,
  requireRoles,
} from "../../middlewares/auth.middleware.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { assetController } from "./asset.controller.js";

const router = Router();

router.get(
  "/asset-categories",
  requireAuth,
  asyncHandler(assetController.getAssetCategories),
);

router.post(
  "/assets",
  requireAuth,
  requireRoles("ADMIN"),
  asyncHandler(assetController.createAsset),
);

router.get(
  "/assets",
  requireAuth,
  requireRoles("ADMIN", "MANAGER", "TECHNICIAN"),
  asyncHandler(assetController.getAssets),
);

router.get(
  "/assets/:id",
  requireAuth,
  requireRoles("ADMIN", "MANAGER", "TECHNICIAN"),
  asyncHandler(assetController.getAssetById),
);

router.patch(
  "/assets/:id/status",
  requireAuth,
  requireRoles("ADMIN"),
  asyncHandler(assetController.updateAssetStatus),
);

router.patch(
  "/assets/:id",
  requireAuth,
  requireRoles("ADMIN"),
  asyncHandler(assetController.updateAsset),
);

export default router;

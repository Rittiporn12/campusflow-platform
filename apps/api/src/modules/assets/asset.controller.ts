import type { Request, Response } from "express";
import { HttpError } from "../../utils/http-error.js";
import { assetService } from "./asset.service.js";
import {
  assetListQuerySchema,
  createAssetSchema,
  updateAssetSchema,
  updateAssetStatusSchema,
} from "./asset.validation.js";

const getCurrentUser = (req: Request) => {
  if (!req.user) {
    throw new HttpError(401, "Authentication required.");
  }

  return {
    id: req.user.id,
    role: req.user.role,
  };
};

const getRouteParam = (req: Request, paramName: string) => {
  const value = req.params[paramName];

  if (typeof value !== "string" || value.trim().length === 0) {
    throw new HttpError(400, `Route parameter "${paramName}" is required.`);
  }

  return value;
};

export const assetController = {
  async getAssetCategories(_req: Request, res: Response) {
    const categories = await assetService.getAssetCategories();

    return res.status(200).json({
      success: true,
      message: "Asset categories retrieved successfully.",
      data: {
        categories,
      },
    });
  },

  async createAsset(req: Request, res: Response) {
    const result = createAssetSchema.safeParse(req.body);

    if (!result.success) {
      throw new HttpError(
        400,
        "Invalid create asset input.",
        result.error.flatten(),
      );
    }

    const asset = await assetService.createAsset(result.data);

    return res.status(201).json({
      success: true,
      message: "Asset created successfully.",
      data: {
        asset,
      },
    });
  },

  async getAssets(req: Request, res: Response) {
    const result = assetListQuerySchema.safeParse(req.query);

    if (!result.success) {
      throw new HttpError(
        400,
        "Invalid asset list query.",
        result.error.flatten(),
      );
    }

    const data = await assetService.getAssets(result.data);

    return res.status(200).json({
      success: true,
      message: "Assets retrieved successfully.",
      data,
    });
  },

  async getAssetById(req: Request, res: Response) {
    const assetId = getRouteParam(req, "id");

    const asset = await assetService.getAssetById(assetId);

    return res.status(200).json({
      success: true,
      message: "Asset detail retrieved successfully.",
      data: {
        asset,
      },
    });
  },

  async updateAsset(req: Request, res: Response) {
    const result = updateAssetSchema.safeParse(req.body);

    if (!result.success) {
      throw new HttpError(
        400,
        "Invalid update asset input.",
        result.error.flatten(),
      );
    }

    const assetId = getRouteParam(req, "id");

    const asset = await assetService.updateAsset(assetId, result.data);

    return res.status(200).json({
      success: true,
      message: "Asset updated successfully.",
      data: {
        asset,
      },
    });
  },

  async updateAssetStatus(req: Request, res: Response) {
    const currentUser = getCurrentUser(req);

    const result = updateAssetStatusSchema.safeParse(req.body);

    if (!result.success) {
      throw new HttpError(
        400,
        "Invalid update asset status input.",
        result.error.flatten(),
      );
    }

    const assetId = getRouteParam(req, "id");

    const asset = await assetService.updateAssetStatus(
      assetId,
      result.data,
      currentUser,
    );

    return res.status(200).json({
      success: true,
      message: "Asset status updated successfully.",
      data: {
        asset,
      },
    });
  },
};

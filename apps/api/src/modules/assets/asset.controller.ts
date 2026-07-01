import type { Request, Response } from "express";
import { HttpError } from "../../utils/http-error.js";
import { assetService } from "./asset.service.js";
import { createAssetSchema } from "./asset.validation.js";

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
};

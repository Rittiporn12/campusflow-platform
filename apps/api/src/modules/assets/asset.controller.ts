import type { Request, Response } from "express";
import { assetService } from "./asset.service.js";

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
};

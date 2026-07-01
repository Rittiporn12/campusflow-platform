import { prisma } from "../../lib/prisma.js";

export const assetService = {
  async getAssetCategories() {
    return prisma.assetCategory.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        name: "asc",
      },
    });
  },
};

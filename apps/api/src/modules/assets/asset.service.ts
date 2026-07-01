import { prisma } from "../../lib/prisma.js";
import { HttpError } from "../../utils/http-error.js";
import type { CreateAssetInput } from "./asset.validation.js";

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

  async createAsset(input: CreateAssetInput) {
    const existingAsset = await prisma.asset.findUnique({
      where: {
        assetCode: input.assetCode,
      },
    });

    if (existingAsset) {
      throw new HttpError(409, "Asset code is already in use.");
    }

    const category = await prisma.assetCategory.findUnique({
      where: {
        id: input.categoryId,
      },
    });

    if (!category || !category.isActive) {
      throw new HttpError(400, "Invalid asset category.");
    }

    if (input.organizationId) {
      const organization = await prisma.organization.findUnique({
        where: {
          id: input.organizationId,
        },
      });

      if (!organization) {
        throw new HttpError(400, "Invalid organization.");
      }
    }

    if (input.departmentId) {
      const department = await prisma.department.findUnique({
        where: {
          id: input.departmentId,
        },
      });

      if (!department) {
        throw new HttpError(400, "Invalid department.");
      }
    }

    if (input.locationId) {
      const location = await prisma.location.findUnique({
        where: {
          id: input.locationId,
        },
      });

      if (!location) {
        throw new HttpError(400, "Invalid location.");
      }
    }

    return prisma.asset.create({
      data: {
        assetCode: input.assetCode,
        name: input.name,
        description: input.description,
        categoryId: input.categoryId,
        status: input.status,
        organizationId: input.organizationId,
        departmentId: input.departmentId,
        locationId: input.locationId,
        serialNumber: input.serialNumber,
        brand: input.brand,
        model: input.model,
        notes: input.notes,
      },
      include: {
        category: true,
        organization: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
        department: {
          select: {
            id: true,
            name: true,
          },
        },
        location: true,
      },
    });
  },
};

import { prisma } from "../../lib/prisma.js";
import { HttpError } from "../../utils/http-error.js";
import type {
  AssetListQueryInput,
  CreateAssetInput,
  UpdateAssetInput,
  UpdateAssetStatusInput,
} from "./asset.validation.js";

const assetListInclude = {
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
};

const assetDetailInclude = {
  ...assetListInclude,
  statusLogs: {
    orderBy: {
      createdAt: "asc" as const,
    },
    include: {
      changedBy: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
  },
};

type CurrentUser = {
  id: string;
  role: "USER" | "TECHNICIAN" | "ADMIN" | "MANAGER";
};

const validateAssetCategory = async (categoryId: string) => {
  const category = await prisma.assetCategory.findUnique({
    where: {
      id: categoryId,
    },
  });

  if (!category || !category.isActive) {
    throw new HttpError(400, "Invalid asset category.");
  }
};

const validateAssetDepartment = async (departmentId: string) => {
  const department = await prisma.department.findUnique({
    where: {
      id: departmentId,
    },
  });

  if (!department) {
    throw new HttpError(400, "Invalid department.");
  }
};

const validateAssetLocation = async (locationId: string) => {
  const location = await prisma.location.findUnique({
    where: {
      id: locationId,
    },
  });

  if (!location) {
    throw new HttpError(400, "Invalid location.");
  }
};

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

    await validateAssetCategory(input.categoryId);

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
      await validateAssetDepartment(input.departmentId);
    }

    if (input.locationId) {
      await validateAssetLocation(input.locationId);
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
        ...assetListInclude,
      },
    });
  },

  async getAssets(query: AssetListQueryInput) {
    const page = query.page;
    const limit = query.limit;
    const skip = (page - 1) * limit;

    const where = {
      ...(query.status ? { status: query.status } : {}),
      ...(query.categoryId ? { categoryId: query.categoryId } : {}),
      ...(query.search
        ? {
            OR: [
              {
                name: {
                  contains: query.search,
                  mode: "insensitive" as const,
                },
              },
              {
                assetCode: {
                  contains: query.search,
                  mode: "insensitive" as const,
                },
              },
              {
                description: {
                  contains: query.search,
                  mode: "insensitive" as const,
                },
              },
              {
                serialNumber: {
                  contains: query.search,
                  mode: "insensitive" as const,
                },
              },
            ],
          }
        : {}),
    };

    const [total, assets] = await Promise.all([
      prisma.asset.count({
        where,
      }),
      prisma.asset.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        include: assetListInclude,
      }),
    ]);

    return {
      items: assets,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async getAssetById(assetId: string) {
    const asset = await prisma.asset.findUnique({
      where: {
        id: assetId,
      },
      include: {
        ...assetDetailInclude,
      },
    });

    if (!asset) {
      throw new HttpError(404, "Asset not found.");
    }

    return asset;
  },

  async updateAsset(assetId: string, input: UpdateAssetInput) {
    const existingAsset = await prisma.asset.findUnique({
      where: {
        id: assetId,
      },
      select: {
        id: true,
      },
    });

    if (!existingAsset) {
      throw new HttpError(404, "Asset not found.");
    }

    if (input.categoryId) {
      await validateAssetCategory(input.categoryId);
    }

    if (input.departmentId) {
      await validateAssetDepartment(input.departmentId);
    }

    if (input.locationId) {
      await validateAssetLocation(input.locationId);
    }

    return prisma.asset.update({
      where: {
        id: assetId,
      },
      data: {
        name: input.name,
        description: input.description,
        categoryId: input.categoryId,
        departmentId: input.departmentId,
        locationId: input.locationId,
        serialNumber: input.serialNumber,
        brand: input.brand,
        model: input.model,
        notes: input.notes,
      },
      include: assetListInclude,
    });
  },

  async updateAssetStatus(
    assetId: string,
    input: UpdateAssetStatusInput,
    currentUser: CurrentUser,
  ) {
    const existingAsset = await prisma.asset.findUnique({
      where: {
        id: assetId,
      },
      select: {
        id: true,
        status: true,
      },
    });

    if (!existingAsset) {
      throw new HttpError(404, "Asset not found.");
    }

    const updatedAsset = await prisma.$transaction(async (tx) => {
      await tx.asset.update({
        where: {
          id: assetId,
        },
        data: {
          status: input.status,
        },
      });

      if (existingAsset.status !== input.status) {
        await tx.assetStatusLog.create({
          data: {
            assetId,
            fromStatus: existingAsset.status,
            toStatus: input.status,
            changedById: currentUser.id,
            note: input.note,
          },
        });
      }

      return tx.asset.findUniqueOrThrow({
        where: {
          id: assetId,
        },
        include: assetDetailInclude,
      });
    });

    return updatedAsset;
  },
};

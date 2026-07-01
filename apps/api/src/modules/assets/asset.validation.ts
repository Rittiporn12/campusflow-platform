import { z } from "zod";

export const assetStatusSchema = z.enum([
  "AVAILABLE",
  "IN_USE",
  "UNDER_MAINTENANCE",
  "RETIRED",
  "LOST",
]);

export const createAssetSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Asset name must be at least 2 characters long.")
    .max(150, "Asset name must be less than 150 characters."),

  assetCode: z
    .string()
    .trim()
    .min(2, "Asset code must be at least 2 characters long.")
    .max(80, "Asset code must be less than 80 characters."),

  description: z
    .string()
    .trim()
    .max(1000, "Description must be less than 1000 characters.")
    .optional(),

  categoryId: z.string().trim().min(1, "Category is required."),

  status: assetStatusSchema.default("AVAILABLE"),

  organizationId: z.string().trim().min(1).optional(),
  departmentId: z.string().trim().min(1).optional(),
  locationId: z.string().trim().min(1).optional(),

  serialNumber: z
    .string()
    .trim()
    .max(120, "Serial number must be less than 120 characters.")
    .optional(),

  brand: z
    .string()
    .trim()
    .max(100, "Brand must be less than 100 characters.")
    .optional(),

  model: z
    .string()
    .trim()
    .max(100, "Model must be less than 100 characters.")
    .optional(),

  notes: z
    .string()
    .trim()
    .max(2000, "Notes must be less than 2000 characters.")
    .optional(),
});

export type CreateAssetInput = z.infer<typeof createAssetSchema>;

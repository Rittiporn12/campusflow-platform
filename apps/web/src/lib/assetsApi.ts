import { api } from "./api";
import { getAuthToken } from "./auth";

export type AssetStatus =
  | "AVAILABLE"
  | "IN_USE"
  | "UNDER_MAINTENANCE"
  | "RETIRED"
  | "LOST";

export type AssetCategory = {
  id: string;
  name: string;
  description: string | null;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

type AssetOrganization = {
  id: string;
  name: string;
  code?: string;
} | null;

type AssetDepartment = {
  id: string;
  name: string;
} | null;

type AssetLocation = {
  id: string;
  name: string;
  building: string | null;
  floor: string | null;
  room: string | null;
  description?: string | null;
} | null;

type AssetStatusLogUser = {
  id: string;
  name: string;
  email: string;
  role: "USER" | "TECHNICIAN" | "ADMIN" | "MANAGER";
};

export type AssetStatusLog = {
  id: string;
  assetId: string;
  fromStatus: AssetStatus | null;
  toStatus: AssetStatus;
  changedById: string;
  note: string | null;
  createdAt: string;
  changedBy: AssetStatusLogUser;
};

export type AssetListItem = {
  id: string;
  assetCode: string;
  name: string;
  description: string | null;
  status: AssetStatus;
  categoryId: string;
  organizationId: string | null;
  departmentId: string | null;
  locationId: string | null;
  serialNumber: string | null;
  brand: string | null;
  model: string | null;
  notes: string | null;
  category: AssetCategory | null;
  organization: AssetOrganization;
  department: AssetDepartment;
  location: AssetLocation;
  createdAt: string;
  updatedAt: string;
};

export type AssetDetail = AssetListItem & {
  statusLogs?: AssetStatusLog[];
};

type AssetListPayload = {
  assets?: AssetListItem[];
  items?: AssetListItem[];
  data?: {
    assets?: AssetListItem[];
    items?: AssetListItem[];
  };
};

type AssetDetailPayload = {
  asset?: AssetDetail;
  data?: {
    asset?: AssetDetail;
  };
};

type AssetCategoriesPayload = {
  categories?: AssetCategory[];
  data?: {
    categories?: AssetCategory[];
  };
};

type AssetMutationPayload = {
  success: boolean;
  message: string;
  asset?: AssetDetail;
  data?: {
    asset?: AssetDetail;
  };
};

export type CreateAssetInput = {
  assetCode: string;
  name: string;
  categoryId: string;
  description?: string;
  brand?: string;
  model?: string;
  serialNumber?: string;
  notes?: string;
};

export type UpdateAssetInput = {
  name?: string;
  categoryId?: string;
  description?: string;
  brand?: string;
  model?: string;
  serialNumber?: string;
  notes?: string;
};

export type UpdateAssetStatusInput = {
  status: AssetStatus;
  note?: string;
};

function getAuthHeaders() {
  const token = getAuthToken();

  if (!token) {
    throw new Error("Authentication token is missing.");
  }

  return {
    Authorization: `Bearer ${token}`,
  };
}

function normalizeAssets(payload: AssetListPayload) {
  return (
    payload.assets ??
    payload.items ??
    payload.data?.assets ??
    payload.data?.items ??
    []
  );
}

function normalizeAsset(payload: AssetDetailPayload) {
  return payload.asset ?? payload.data?.asset ?? null;
}

function normalizeCategories(payload: AssetCategoriesPayload) {
  return payload.categories ?? payload.data?.categories ?? [];
}

function normalizeMutation(payload: AssetMutationPayload) {
  return {
    success: payload.success,
    message: payload.message,
    asset: payload.asset ?? payload.data?.asset ?? null,
  };
}

function removeEmptyOptionalFields<T extends Record<string, string>>(input: T) {
  return Object.fromEntries(
    Object.entries(input).filter(([, value]) => value.trim().length > 0),
  ) as Partial<T>;
}

export async function getAssets() {
  const response = await api.get<AssetListPayload>("/api/assets", {
    headers: getAuthHeaders(),
  });

  return normalizeAssets(response.data);
}

export async function getAssetById(assetId: string) {
  const response = await api.get<AssetDetailPayload>(`/api/assets/${assetId}`, {
    headers: getAuthHeaders(),
  });

  return normalizeAsset(response.data);
}

export async function getAssetCategories() {
  const response = await api.get<AssetCategoriesPayload>("/api/asset-categories", {
    headers: getAuthHeaders(),
  });

  return normalizeCategories(response.data);
}

export async function createAsset(input: CreateAssetInput) {
  const payload = {
    assetCode: input.assetCode.trim(),
    name: input.name.trim(),
    categoryId: input.categoryId,
    ...removeEmptyOptionalFields({
      description: input.description ?? "",
      brand: input.brand ?? "",
      model: input.model ?? "",
      serialNumber: input.serialNumber ?? "",
      notes: input.notes ?? "",
    }),
  };

  const response = await api.post<AssetMutationPayload>("/api/assets", payload, {
    headers: getAuthHeaders(),
  });

  return normalizeMutation(response.data);
}

export async function updateAsset(assetId: string, input: UpdateAssetInput) {
  const payload = removeEmptyOptionalFields({
    name: input.name ?? "",
    categoryId: input.categoryId ?? "",
    description: input.description ?? "",
    brand: input.brand ?? "",
    model: input.model ?? "",
    serialNumber: input.serialNumber ?? "",
    notes: input.notes ?? "",
  });

  const response = await api.patch<AssetMutationPayload>(
    `/api/assets/${assetId}`,
    payload,
    {
      headers: getAuthHeaders(),
    },
  );

  return normalizeMutation(response.data);
}

export async function updateAssetStatus(
  assetId: string,
  input: UpdateAssetStatusInput,
) {
  const payload = {
    status: input.status,
    ...removeEmptyOptionalFields({
      note: input.note ?? "",
    }),
  };

  const response = await api.patch<AssetMutationPayload>(
    `/api/assets/${assetId}/status`,
    payload,
    {
      headers: getAuthHeaders(),
    },
  );

  return normalizeMutation(response.data);
}

export async function archiveAsset(assetId: string) {
  const response = await api.patch<AssetMutationPayload>(
    `/api/assets/${assetId}/archive`,
    {},
    {
      headers: getAuthHeaders(),
    },
  );

  return normalizeMutation(response.data);
}

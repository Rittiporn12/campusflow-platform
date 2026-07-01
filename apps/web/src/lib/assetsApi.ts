import { api } from "./api";
import { getAuthToken } from "./auth";

export type AssetStatus =
  | "AVAILABLE"
  | "IN_USE"
  | "UNDER_MAINTENANCE"
  | "RETIRED"
  | "LOST";

type AssetCategory = {
  id: string;
  name: string;
  description: string | null;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
} | null;

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
  category: AssetCategory;
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

import { api } from "./api";
import { getAuthToken } from "./auth";

type UserRole = "USER" | "TECHNICIAN" | "ADMIN" | "MANAGER";
type UserStatus = "ACTIVE" | "INACTIVE";

type UserOrganization = {
  id: string;
  name: string;
  code: string;
} | null;

type UserDepartment = {
  id: string;
  name: string;
} | null;

type UserLocation = {
  id: string;
  name: string;
  building: string | null;
  floor: string | null;
  room: string | null;
} | null;

export type CurrentUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  organization: UserOrganization;
  department: UserDepartment;
  location: UserLocation;
  createdAt: string;
  updatedAt: string;
};

type CurrentUserResponse = {
  success: boolean;
  message: string;
  data: {
    user: CurrentUser;
  };
};

export async function getCurrentUser() {
  const token = getAuthToken();

  if (!token) {
    throw new Error("Authentication token is missing.");
  }

  const response = await api.get<CurrentUserResponse>("/api/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data.user;
}

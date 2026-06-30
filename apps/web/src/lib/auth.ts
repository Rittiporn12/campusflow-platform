import { api } from "./api";

const AUTH_TOKEN_STORAGE_KEY = "campusflow_access_token";

type UserRole = "USER" | "TECHNICIAN" | "ADMIN" | "MANAGER";
type UserStatus = "ACTIVE" | "INACTIVE";

export type LoginResponse = {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      role: UserRole;
      status: UserStatus;
      createdAt: string;
      updatedAt: string;
    };
    accessToken?: string;
  };
};

export type LoginRequest = {
  email: string;
  password: string;
};

export async function login(input: LoginRequest) {
  const response = await api.post<LoginResponse>("/api/auth/login", input);

  return response.data;
}

export function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
}

export function setAuthToken(token: string) {
  localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
}

export function clearAuthToken() {
  localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
}

export function isAuthenticated() {
  return Boolean(getAuthToken());
}

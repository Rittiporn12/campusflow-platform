import { api } from "./api";

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

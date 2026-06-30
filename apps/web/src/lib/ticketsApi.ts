import { api } from "./api";
import { getAuthToken } from "./auth";

type TicketStatus =
  | "PENDING"
  | "ASSIGNED"
  | "IN_PROGRESS"
  | "WAITING_PARTS"
  | "COMPLETED"
  | "CANCELLED";

type TicketPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

type TicketLocation = {
  id: string;
  name: string;
  building: string | null;
  floor: string | null;
  room: string | null;
} | null;

export type TicketListItem = {
  id: string;
  title: string;
  status: TicketStatus;
  priority: TicketPriority;
  location: TicketLocation;
  createdAt: string;
};

type TicketListResponse = {
  success: boolean;
  message: string;
  data: {
    items: TicketListItem[];
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
};

export async function getTickets() {
  const token = getAuthToken();

  if (!token) {
    throw new Error("Authentication token is missing.");
  }

  const response = await api.get<TicketListResponse>("/api/tickets", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
}

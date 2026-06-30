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

type TicketUser = {
  id: string;
  name: string;
  email: string;
  role: "USER" | "TECHNICIAN" | "ADMIN" | "MANAGER";
};

type TicketCategory = {
  id: string;
  name: string;
  description: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

type TicketLocation = {
  id: string;
  name: string;
  organizationId?: string;
  building: string | null;
  floor: string | null;
  room: string | null;
  description?: string | null;
  createdAt?: string;
  updatedAt?: string;
} | null;

export type TicketListItem = {
  id: string;
  title: string;
  status: TicketStatus;
  priority: TicketPriority;
  location: TicketLocation;
  createdAt: string;
};

export type TicketComment = {
  id: string;
  ticketId: string;
  userId: string;
  message: string;
  isInternal: boolean;
  createdAt: string;
  updatedAt: string;
  user: TicketUser;
};

export type TicketStatusLog = {
  id: string;
  ticketId: string;
  oldStatus: TicketStatus | null;
  newStatus: TicketStatus;
  changedById: string;
  note: string | null;
  createdAt: string;
  changedBy: TicketUser;
};

export type TicketDetail = TicketListItem & {
  description: string;
  categoryId: string;
  createdById: string;
  assignedToId: string | null;
  locationId: string | null;
  category: TicketCategory;
  createdBy: TicketUser;
  assignedTo: TicketUser | null;
  comments: TicketComment[];
  statusLogs: TicketStatusLog[];
  updatedAt: string;
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

type TicketDetailResponse = {
  success: boolean;
  message: string;
  data: {
    ticket: TicketDetail;
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

export async function getTicketById(ticketId: string) {
  const token = getAuthToken();

  if (!token) {
    throw new Error("Authentication token is missing.");
  }

  const response = await api.get<TicketDetailResponse>(
    `/api/tickets/${ticketId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data.data.ticket;
}

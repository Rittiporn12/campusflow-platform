import { api } from "./api";
import { getAuthToken } from "./auth";

export type TicketStatus =
  | "PENDING"
  | "ASSIGNED"
  | "IN_PROGRESS"
  | "WAITING_PARTS"
  | "COMPLETED"
  | "CANCELLED";

export type TicketPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

type TicketUser = {
  id: string;
  name: string;
  email: string;
  role: "USER" | "TECHNICIAN" | "ADMIN" | "MANAGER";
};

export type TicketCategory = {
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

type TicketCategoriesResponse = {
  success: boolean;
  message: string;
  data: {
    categories: TicketCategory[];
  };
};

export type CreateTicketInput = {
  title: string;
  description: string;
  categoryId: string;
  priority: TicketPriority;
};

type CreateTicketResponse = {
  success: boolean;
  message: string;
  data: {
    ticket: TicketDetail;
  };
};

export type UpdateTicketStatusInput = {
  status: TicketStatus;
};

type UpdateTicketStatusResponse = {
  success: boolean;
  message: string;
  data: {
    ticket: unknown;
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

export async function getTickets() {
  const response = await api.get<TicketListResponse>("/api/tickets", {
    headers: getAuthHeaders(),
  });

  return response.data.data;
}

export async function getTicketById(ticketId: string) {
  const response = await api.get<TicketDetailResponse>(
    `/api/tickets/${ticketId}`,
    {
      headers: getAuthHeaders(),
    },
  );

  return response.data.data.ticket;
}

export async function getTicketCategories() {
  const response = await api.get<TicketCategoriesResponse>(
    "/api/ticket-categories",
    {
      headers: getAuthHeaders(),
    },
  );

  return response.data.data.categories;
}

export async function createTicket(input: CreateTicketInput) {
  const payload: CreateTicketInput = {
    title: input.title.trim(),
    description: input.description.trim(),
    categoryId: input.categoryId,
    priority: input.priority,
  };

  const response = await api.post<CreateTicketResponse>(
    "/api/tickets",
    payload,
    {
      headers: getAuthHeaders(),
    },
  );

  return response.data;
}

export async function updateTicketStatus(
  ticketId: string,
  input: UpdateTicketStatusInput,
) {
  const response = await api.patch<UpdateTicketStatusResponse>(
    `/api/tickets/${ticketId}/status`,
    input,
    {
      headers: getAuthHeaders(),
    },
  );

  return response.data;
}

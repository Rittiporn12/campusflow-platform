import type { AssetStatus } from "./assetsApi";
import type { TicketPriority, TicketStatus } from "./ticketsApi";

type UserRole = "USER" | "TECHNICIAN" | "ADMIN" | "MANAGER";

const ticketStatusLabels: Record<TicketStatus, string> = {
  PENDING: "Pending",
  ASSIGNED: "Assigned",
  IN_PROGRESS: "In Progress",
  WAITING_PARTS: "Waiting Parts",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

const ticketPriorityLabels: Record<TicketPriority, string> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  CRITICAL: "Critical",
};

const assetStatusLabels: Record<AssetStatus, string> = {
  AVAILABLE: "Available",
  IN_USE: "In Use",
  UNDER_MAINTENANCE: "Under Maintenance",
  RETIRED: "Retired",
  LOST: "Lost",
};

const userRoleLabels: Record<UserRole, string> = {
  USER: "User",
  TECHNICIAN: "Technician",
  ADMIN: "Admin",
  MANAGER: "Manager",
};

export function formatEnumLabel(value: string | null | undefined) {
  if (!value) {
    return "Not provided";
  }

  return value
    .toLowerCase()
    .split("_")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatTicketStatus(status: TicketStatus | null | undefined) {
  return status ? ticketStatusLabels[status] : formatEnumLabel(status);
}

export function formatTicketPriority(priority: TicketPriority | null | undefined) {
  return priority ? ticketPriorityLabels[priority] : formatEnumLabel(priority);
}

export function formatAssetStatus(status: AssetStatus | null | undefined) {
  return status ? assetStatusLabels[status] : formatEnumLabel(status);
}

export function formatUserRole(role: string | null | undefined) {
  return role && role in userRoleLabels
    ? userRoleLabels[role as UserRole]
    : formatEnumLabel(role);
}

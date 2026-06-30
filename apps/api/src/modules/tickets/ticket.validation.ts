import { z } from "zod";

export const ticketPrioritySchema = z.enum([
  "LOW",
  "MEDIUM",
  "HIGH",
  "CRITICAL",
]);

export const ticketStatusSchema = z.enum([
  "PENDING",
  "ASSIGNED",
  "IN_PROGRESS",
  "WAITING_PARTS",
  "COMPLETED",
  "CANCELLED",
]);

export const createTicketSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters long.")
    .max(150, "Title must be less than 150 characters."),

  description: z
    .string()
    .trim()
    .min(5, "Description must be at least 5 characters long.")
    .max(5000, "Description must be less than 5000 characters."),

  categoryId: z.string().trim().min(1, "Category is required."),

  priority: ticketPrioritySchema.default("MEDIUM"),

  locationId: z.string().trim().min(1).optional(),
});

export const ticketListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),

  status: ticketStatusSchema.optional(),
  priority: ticketPrioritySchema.optional(),
  categoryId: z.string().trim().min(1).optional(),
  assignedToId: z.string().trim().min(1).optional(),
  search: z.string().trim().min(1).max(100).optional(),
});

export const updateTicketStatusSchema = z.object({
  status: ticketStatusSchema,

  note: z
    .string()
    .trim()
    .max(1000, "Note must be less than 1000 characters.")
    .optional(),
});

export const assignTicketSchema = z.object({
  technicianId: z.string().trim().min(1, "Technician is required."),
});

export const createTicketCommentSchema = z.object({
  message: z
    .string()
    .trim()
    .min(1, "Comment message is required.")
    .max(2000, "Comment message must be less than 2000 characters."),

  isInternal: z.boolean().optional().default(false),
});

export type CreateTicketInput = z.infer<typeof createTicketSchema>;
export type TicketListQueryInput = z.infer<typeof ticketListQuerySchema>;
export type UpdateTicketStatusInput = z.infer<typeof updateTicketStatusSchema>;
export type AssignTicketInput = z.infer<typeof assignTicketSchema>;
export type CreateTicketCommentInput = z.infer<
  typeof createTicketCommentSchema
>;

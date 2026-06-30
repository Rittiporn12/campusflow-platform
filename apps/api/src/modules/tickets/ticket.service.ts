import { prisma } from "../../lib/prisma.js";
import { HttpError } from "../../utils/http-error.js";
import type {
  AssignTicketInput,
  CreateTicketCommentInput,
  CreateTicketInput,
  TicketListQueryInput,
  UpdateTicketStatusInput,
} from "./ticket.validation.js";

type CurrentUser = {
  id: string;
  role: "USER" | "TECHNICIAN" | "ADMIN" | "MANAGER";
};

const isAdmin = (user: CurrentUser) => user.role === "ADMIN";
const isManager = (user: CurrentUser) => user.role === "MANAGER";
const isTechnician = (user: CurrentUser) => user.role === "TECHNICIAN";
const isUser = (user: CurrentUser) => user.role === "USER";

const canViewTicket = (
  user: CurrentUser,
  ticket: {
    createdById: string;
    assignedToId: string | null;
  },
) => {
  if (isAdmin(user) || isManager(user)) {
    return true;
  }

  if (isTechnician(user)) {
    return ticket.assignedToId === user.id;
  }

  if (isUser(user)) {
    return ticket.createdById === user.id;
  }

  return false;
};

const canUpdateTicketStatus = (
  user: CurrentUser,
  ticket: {
    assignedToId: string | null;
  },
) => {
  if (isAdmin(user)) {
    return true;
  }

  if (isTechnician(user)) {
    return ticket.assignedToId === user.id;
  }

  return false;
};

export const ticketService = {
  async getTicketCategories() {
    return prisma.ticketCategory.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        name: "asc",
      },
    });
  },

  async createTicket(input: CreateTicketInput, currentUser: CurrentUser) {
    const category = await prisma.ticketCategory.findUnique({
      where: {
        id: input.categoryId,
      },
    });

    if (!category || !category.isActive) {
      throw new HttpError(400, "Invalid ticket category.");
    }

    if (input.locationId) {
      const location = await prisma.location.findUnique({
        where: {
          id: input.locationId,
        },
      });

      if (!location) {
        throw new HttpError(400, "Invalid location.");
      }
    }

    const ticket = await prisma.$transaction(async (tx) => {
      const createdTicket = await tx.ticket.create({
        data: {
          title: input.title,
          description: input.description,
          categoryId: input.categoryId,
          priority: input.priority,
          locationId: input.locationId,
          createdById: currentUser.id,
        },
        include: {
          category: true,
          location: true,
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            },
          },
          assignedTo: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            },
          },
        },
      });

      await tx.ticketStatusLog.create({
        data: {
          ticketId: createdTicket.id,
          oldStatus: null,
          newStatus: createdTicket.status,
          changedById: currentUser.id,
          note: "Ticket created.",
        },
      });

      return createdTicket;
    });

    return ticket;
  },

  async getTickets(query: TicketListQueryInput, currentUser: CurrentUser) {
    const page = query.page;
    const limit = query.limit;
    const skip = (page - 1) * limit;

    const roleWhere =
      currentUser.role === "USER"
        ? {
            createdById: currentUser.id,
          }
        : currentUser.role === "TECHNICIAN"
          ? {
              assignedToId: currentUser.id,
            }
          : {};

    const where = {
      ...roleWhere,
      ...(query.status ? { status: query.status } : {}),
      ...(query.priority ? { priority: query.priority } : {}),
      ...(query.categoryId ? { categoryId: query.categoryId } : {}),
      ...(query.assignedToId && (isAdmin(currentUser) || isManager(currentUser))
        ? { assignedToId: query.assignedToId }
        : {}),
      ...(query.search
        ? {
            OR: [
              {
                title: {
                  contains: query.search,
                  mode: "insensitive" as const,
                },
              },
              {
                description: {
                  contains: query.search,
                  mode: "insensitive" as const,
                },
              },
            ],
          }
        : {}),
    };

    const [total, tickets] = await Promise.all([
      prisma.ticket.count({
        where,
      }),
      prisma.ticket.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          category: true,
          location: true,
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            },
          },
          assignedTo: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            },
          },
          _count: {
            select: {
              comments: true,
              statusLogs: true,
            },
          },
        },
      }),
    ]);

    return {
      items: tickets,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async getTicketById(ticketId: string, currentUser: CurrentUser) {
    const ticket = await prisma.ticket.findUnique({
      where: {
        id: ticketId,
      },
      include: {
        category: true,
        location: true,
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        comments: {
          orderBy: {
            createdAt: "asc",
          },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true,
              },
            },
          },
        },
        statusLogs: {
          orderBy: {
            createdAt: "asc",
          },
          include: {
            changedBy: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true,
              },
            },
          },
        },
      },
    });

    if (!ticket) {
      throw new HttpError(404, "Ticket not found.");
    }

    if (!canViewTicket(currentUser, ticket)) {
      throw new HttpError(
        403,
        "You do not have permission to view this ticket.",
      );
    }

    return ticket;
  },

  async updateTicketStatus(
    ticketId: string,
    input: UpdateTicketStatusInput,
    currentUser: CurrentUser,
  ) {
    const existingTicket = await prisma.ticket.findUnique({
      where: {
        id: ticketId,
      },
      select: {
        id: true,
        status: true,
        assignedToId: true,
      },
    });

    if (!existingTicket) {
      throw new HttpError(404, "Ticket not found.");
    }

    if (!canUpdateTicketStatus(currentUser, existingTicket)) {
      throw new HttpError(
        403,
        "You do not have permission to update this ticket status.",
      );
    }

    const updatedTicket = await prisma.$transaction(async (tx) => {
      const ticket = await tx.ticket.update({
        where: {
          id: ticketId,
        },
        data: {
          status: input.status,
        },
        include: {
          category: true,
          location: true,
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            },
          },
          assignedTo: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            },
          },
        },
      });

      await tx.ticketStatusLog.create({
        data: {
          ticketId,
          oldStatus: existingTicket.status,
          newStatus: input.status,
          changedById: currentUser.id,
          note: input.note,
        },
      });

      return ticket;
    });

    return updatedTicket;
  },

  async assignTicket(
    ticketId: string,
    input: AssignTicketInput,
    currentUser: CurrentUser,
  ) {
    const existingTicket = await prisma.ticket.findUnique({
      where: {
        id: ticketId,
      },
      select: {
        id: true,
        status: true,
      },
    });

    if (!existingTicket) {
      throw new HttpError(404, "Ticket not found.");
    }

    const technician = await prisma.user.findUnique({
      where: {
        id: input.technicianId,
      },
      select: {
        id: true,
        role: true,
        status: true,
      },
    });

    if (!technician || technician.role !== "TECHNICIAN") {
      throw new HttpError(400, "Selected user is not a valid technician.");
    }

    if (technician.status !== "ACTIVE") {
      throw new HttpError(400, "Selected technician is inactive.");
    }

    const nextStatus =
      existingTicket.status === "PENDING" ? "ASSIGNED" : existingTicket.status;

    const updatedTicket = await prisma.$transaction(async (tx) => {
      const ticket = await tx.ticket.update({
        where: {
          id: ticketId,
        },
        data: {
          assignedToId: input.technicianId,
          status: nextStatus,
        },
        include: {
          category: true,
          location: true,
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            },
          },
          assignedTo: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            },
          },
        },
      });

      if (nextStatus !== existingTicket.status) {
        await tx.ticketStatusLog.create({
          data: {
            ticketId,
            oldStatus: existingTicket.status,
            newStatus: nextStatus,
            changedById: currentUser.id,
            note: "Ticket assigned to technician.",
          },
        });
      }

      return ticket;
    });

    return updatedTicket;
  },

  async addComment(
    ticketId: string,
    input: CreateTicketCommentInput,
    currentUser: CurrentUser,
  ) {
    const ticket = await prisma.ticket.findUnique({
      where: {
        id: ticketId,
      },
      select: {
        id: true,
        createdById: true,
        assignedToId: true,
      },
    });

    if (!ticket) {
      throw new HttpError(404, "Ticket not found.");
    }

    if (!canViewTicket(currentUser, ticket)) {
      throw new HttpError(
        403,
        "You do not have permission to comment on this ticket.",
      );
    }

    if (input.isInternal && currentUser.role === "USER") {
      throw new HttpError(403, "General users cannot create internal notes.");
    }

    const comment = await prisma.ticketComment.create({
      data: {
        ticketId,
        userId: currentUser.id,
        message: input.message,
        isInternal: input.isInternal,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

    return comment;
  },
};

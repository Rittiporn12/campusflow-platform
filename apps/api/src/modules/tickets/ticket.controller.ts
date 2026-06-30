import type { Request, Response } from "express";
import { HttpError } from "../../utils/http-error.js";
import { ticketService } from "./ticket.service.js";
import {
  assignTicketSchema,
  createTicketCommentSchema,
  createTicketSchema,
  ticketListQuerySchema,
  updateTicketStatusSchema,
} from "./ticket.validation.js";

const getCurrentUser = (req: Request) => {
  if (!req.user) {
    throw new HttpError(401, "Authentication required.");
  }

  return {
    id: req.user.id,
    role: req.user.role,
  };
};

const getRouteParam = (req: Request, paramName: string) => {
  const value = req.params[paramName];

  if (typeof value !== "string" || value.trim().length === 0) {
    throw new HttpError(400, `Route parameter "${paramName}" is required.`);
  }

  return value;
};

export const ticketController = {
  async getTicketCategories(_req: Request, res: Response) {
    const categories = await ticketService.getTicketCategories();

    return res.status(200).json({
      success: true,
      message: "Ticket categories retrieved successfully.",
      data: {
        categories,
      },
    });
  },

  async createTicket(req: Request, res: Response) {
    const currentUser = getCurrentUser(req);

    const result = createTicketSchema.safeParse(req.body);

    if (!result.success) {
      throw new HttpError(
        400,
        "Invalid create ticket input.",
        result.error.flatten(),
      );
    }

    const ticket = await ticketService.createTicket(result.data, currentUser);

    return res.status(201).json({
      success: true,
      message: "Ticket created successfully.",
      data: {
        ticket,
      },
    });
  },

  async getTickets(req: Request, res: Response) {
    const currentUser = getCurrentUser(req);

    const result = ticketListQuerySchema.safeParse(req.query);

    if (!result.success) {
      throw new HttpError(
        400,
        "Invalid ticket list query.",
        result.error.flatten(),
      );
    }

    const data = await ticketService.getTickets(result.data, currentUser);

    return res.status(200).json({
      success: true,
      message: "Tickets retrieved successfully.",
      data,
    });
  },

  async getTicketById(req: Request, res: Response) {
    const currentUser = getCurrentUser(req);

    const ticketId = getRouteParam(req, "id");

    const ticket = await ticketService.getTicketById(ticketId, currentUser);

    return res.status(200).json({
      success: true,
      message: "Ticket detail retrieved successfully.",
      data: {
        ticket,
      },
    });
  },

  async updateTicketStatus(req: Request, res: Response) {
    const currentUser = getCurrentUser(req);

    const result = updateTicketStatusSchema.safeParse(req.body);

    if (!result.success) {
      throw new HttpError(
        400,
        "Invalid update ticket status input.",
        result.error.flatten(),
      );
    }

    const ticketId = getRouteParam(req, "id");

    const ticket = await ticketService.updateTicketStatus(
      ticketId,
      result.data,
      currentUser,
    );

    return res.status(200).json({
      success: true,
      message: "Ticket status updated successfully.",
      data: {
        ticket,
      },
    });
  },

  async assignTicket(req: Request, res: Response) {
    const currentUser = getCurrentUser(req);

    const result = assignTicketSchema.safeParse(req.body);

    if (!result.success) {
      throw new HttpError(
        400,
        "Invalid assign ticket input.",
        result.error.flatten(),
      );
    }

    const ticketId = getRouteParam(req, "id");

    const ticket = await ticketService.assignTicket(
      ticketId,
      result.data,
      currentUser,
    );

    return res.status(200).json({
      success: true,
      message: "Ticket assigned successfully.",
      data: {
        ticket,
      },
    });
  },

  async addComment(req: Request, res: Response) {
    const currentUser = getCurrentUser(req);

    const result = createTicketCommentSchema.safeParse(req.body);

    if (!result.success) {
      throw new HttpError(
        400,
        "Invalid ticket comment input.",
        result.error.flatten(),
      );
    }

    const ticketId = getRouteParam(req, "id");

    const comment = await ticketService.addComment(
      ticketId,
      result.data,
      currentUser,
    );

    return res.status(201).json({
      success: true,
      message: "Ticket comment added successfully.",
      data: {
        comment,
      },
    });
  },
};

import { Router } from "express";
import {
  requireAuth,
  requireRoles,
} from "../../middlewares/auth.middleware.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { ticketController } from "./ticket.controller.js";

const router = Router();

router.get(
  "/ticket-categories",
  requireAuth,
  asyncHandler(ticketController.getTicketCategories),
);

router.post(
  "/tickets",
  requireAuth,
  asyncHandler(ticketController.createTicket),
);

router.get("/tickets", requireAuth, asyncHandler(ticketController.getTickets));

router.get(
  "/tickets/:id",
  requireAuth,
  asyncHandler(ticketController.getTicketById),
);

router.patch(
  "/tickets/:id/status",
  requireAuth,
  asyncHandler(ticketController.updateTicketStatus),
);

router.patch(
  "/tickets/:id/assign",
  requireAuth,
  requireRoles("ADMIN"),
  asyncHandler(ticketController.assignTicket),
);

router.post(
  "/tickets/:id/comments",
  requireAuth,
  asyncHandler(ticketController.addComment),
);

export default router;

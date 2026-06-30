import type { Request, Response } from "express";
import { env } from "../config/env.js";

export const getHealth = (_req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: "CampusFlow API is healthy.",
    data: {
      status: "ok",
      environment: env.NODE_ENV,
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    },
  });
};

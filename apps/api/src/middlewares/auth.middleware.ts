import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import { env } from "../config/env.js";
import { prisma } from "../lib/prisma.js";
import { HttpError } from "../utils/http-error.js";

type JwtPayload = {
  userId: string;
};

type Role = "USER" | "TECHNICIAN" | "ADMIN" | "MANAGER";

export const requireAuth = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new HttpError(401, "Authentication required.");
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new HttpError(401, "Authentication token is missing.");
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

    if (!decoded.userId) {
      throw new HttpError(401, "Invalid authentication token.");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
      },
    });

    if (!user) {
      throw new HttpError(401, "Authenticated user not found.");
    }

    if (user.status !== "ACTIVE") {
      throw new HttpError(403, "This account is inactive.");
    }

    req.user = user;

    next();
  } catch (error) {
    if (error instanceof HttpError) {
      next(error);
      return;
    }

    next(new HttpError(401, "Invalid or expired authentication token."));
  }
};

export const requireRoles = (...roles: Role[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      next(new HttpError(401, "Authentication required."));
      return;
    }

    if (!roles.includes(req.user.role)) {
      next(
        new HttpError(
          403,
          "You do not have permission to access this resource.",
        ),
      );
      return;
    }

    next();
  };
};

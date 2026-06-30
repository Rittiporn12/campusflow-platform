import type { ErrorRequestHandler } from "express";
import { env } from "../config/env.js";
import { HttpError } from "../utils/http-error.js";

export const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  const isHttpError = err instanceof HttpError;

  const statusCode = isHttpError ? err.statusCode : 500;

  const message = isHttpError
    ? err.message
    : env.NODE_ENV === "production"
      ? "Internal server error."
      : err.message || "Internal server error.";

  return res.status(statusCode).json({
    success: false,
    message,
    ...(isHttpError && err.errors ? { errors: err.errors } : {}),
  });
};

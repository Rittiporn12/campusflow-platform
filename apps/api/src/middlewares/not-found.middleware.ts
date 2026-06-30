import type { NextFunction, Request, Response } from "express";
import { HttpError } from "../utils/http-error.js";

export const notFoundMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  next(new HttpError(404, `Route ${req.originalUrl} not found.`));
};

import type { Request, Response } from "express";
import { HttpError } from "../../utils/http-error.js";
import { authService } from "./auth.service.js";
import { loginSchema, registerSchema } from "./auth.validation.js";

export const authController = {
  async register(req: Request, res: Response) {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
      throw new HttpError(
        400,
        "Invalid register input.",
        result.error.flatten(),
      );
    }

    const data = await authService.register(result.data);

    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      data,
    });
  },

  async login(req: Request, res: Response) {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      throw new HttpError(400, "Invalid login input.", result.error.flatten());
    }

    const data = await authService.login(result.data);

    return res.status(200).json({
      success: true,
      message: "User logged in successfully.",
      data,
    });
  },

  async me(req: Request, res: Response) {
    if (!req.user) {
      throw new HttpError(401, "Authentication required.");
    }

    const user = await authService.getCurrentUser(req.user.id);

    return res.status(200).json({
      success: true,
      message: "Current user profile retrieved successfully.",
      data: {
        user,
      },
    });
  },
};

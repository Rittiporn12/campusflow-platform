import bcrypt from "bcrypt";
import jwt, { type SignOptions } from "jsonwebtoken";
import { env } from "../../config/env.js";
import { prisma } from "../../lib/prisma.js";
import { HttpError } from "../../utils/http-error.js";
import type { LoginInput, RegisterInput } from "./auth.validation.js";

const SALT_ROUNDS = 10;

const createAccessToken = (userId: string) => {
  const options: SignOptions = {
    expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
  };

  return jwt.sign({ userId }, env.JWT_SECRET, options);
};

const sanitizeUser = (user: {
  id: string;
  name: string;
  email: string;
  role: "USER" | "TECHNICIAN" | "ADMIN" | "MANAGER";
  status: "ACTIVE" | "INACTIVE";
  createdAt: Date;
  updatedAt: Date;
}) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export const authService = {
  async register(input: RegisterInput) {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: input.email,
      },
    });

    if (existingUser) {
      throw new HttpError(409, "Email is already registered.");
    }

    const passwordHash = await bcrypt.hash(input.password, SALT_ROUNDS);

    const user = await prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        passwordHash,
        role: "USER",
        status: "ACTIVE",
      },
    });

    const accessToken = createAccessToken(user.id);

    return {
      user: sanitizeUser(user),
      accessToken,
    };
  },

  async login(input: LoginInput) {
    const user = await prisma.user.findUnique({
      where: {
        email: input.email,
      },
    });

    if (!user) {
      throw new HttpError(401, "Invalid email or password.");
    }

    if (user.status !== "ACTIVE") {
      throw new HttpError(403, "This account is inactive.");
    }

    const isPasswordValid = await bcrypt.compare(
      input.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new HttpError(401, "Invalid email or password.");
    }

    const accessToken = createAccessToken(user.id);

    return {
      user: sanitizeUser(user),
      accessToken,
    };
  },

  async getCurrentUser(userId: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        organization: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
        department: {
          select: {
            id: true,
            name: true,
          },
        },
        location: {
          select: {
            id: true,
            name: true,
            building: true,
            floor: true,
            room: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new HttpError(404, "Current user not found.");
    }

    return user;
  },
};

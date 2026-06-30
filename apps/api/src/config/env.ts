import dotenv from "dotenv";

dotenv.config();

const toNumber = (value: string | undefined, fallback: number) => {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? fallback : parsed;
};

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: toNumber(process.env.PORT, 4000),
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? "http://localhost:5173",
  JWT_SECRET: process.env.JWT_SECRET ?? "local-dev-campusflow-secret",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? "1d",
};
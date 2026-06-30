export {};

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        name: string;
        email: string;
        role: "USER" | "TECHNICIAN" | "ADMIN" | "MANAGER";
        status: "ACTIVE" | "INACTIVE";
      };
    }
  }
}

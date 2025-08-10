import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: { status?: number; message?: string },
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
};

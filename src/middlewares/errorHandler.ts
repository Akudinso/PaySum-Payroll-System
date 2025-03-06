import { Request, Response, NextFunction } from "express";
import { BaseError } from "../utils/errors"; // Import our custom error class

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof BaseError) {
    // Handle custom errors
    return res.status(err.statusCode).json({ error: err.message });
  }

  console.error("Unexpected Error:", err); // Log full error for debugging

  // Generic internal server error
  return res.status(500).json({ error: "Something went wrong. Please try again later." });
};
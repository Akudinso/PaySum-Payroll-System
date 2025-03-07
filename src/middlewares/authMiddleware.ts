import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Extend Express Request type to include "user"
interface CustomRequest extends Request {
    user?: any;
  }
  


export const authMiddleware = (req: Request, res: Response, next: NextFunction):void => {
  const token = req.header("Authorization")?.split(" ")[1];
  
    if (!token) {
        res.status(401).json({ error: "Access denied. No token provided." });
        return;
    }
    

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token." });
  }
};

export const isAdmin = (req: CustomRequest, res: Response, next: NextFunction): void => {
    if (!req.user || req.user.role !== "admin") {
        res.status(403).json({ error: "Access denied. Admins only." });
        return;
    }
    next();
};

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authMiddleware = async (
  req: Request ,
  res: Response,
  next: NextFunction
): Promise<any> => {
  console.log('Auth middleware - cookies:', req.cookies);
  console.log('Auth middleware - headers:', req.headers.cookie);
  
  const token = req.cookies.token;
  if (!token) {
    console.log('No token found in cookies');
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    console.log('Token verified, user ID:', payload.id);
    
    const user = await prisma.user.findUnique({ where: { id: payload.id } });
    if (!user) {
      console.log('User not found in database');
      return res.status(401).json({ message: "Unauthorized" });
    }

    console.log('User authenticated:', user.email);
    req.user = user;
    next();
  } catch (error) {
    console.log('Token verification failed:', error);
    res.status(401).json({ message: "Invalid token" });
  }
};

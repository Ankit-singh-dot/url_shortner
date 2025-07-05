import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!;

const createToken = (id: string) =>
  jwt.sign({ id }, JWT_SECRET, { expiresIn: "7d" });

export const signup = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;
  console.log("gieabsibgr")
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(400).json({ message: "Email in use" });

  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hash },
  });

  const token = createToken(user.id);
  res.cookie("token", token, { 
    httpOnly: true,
    secure: false, // Set to false for localhost
    sameSite: 'lax'
  });
  res.json({ user: { id: user.id, email: user.email } });
};

export const login = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;
  console.log("login")
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Invalid credentials" });

  const token = createToken(user.id);
  res.cookie("token", token, { 
    httpOnly: true,
    secure: false, // Set to false for localhost
    sameSite: 'lax'
  });
  res.json({ user: { id: user.id, email: user.email } });
};

export const getMe = async (req: Request, res: Response): Promise<any> => {
  const user = req.user;
  res.json({ user });
};

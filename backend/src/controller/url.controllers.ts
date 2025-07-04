import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";


const prisma = new PrismaClient();

export const shortenUrl = async (req: Request, res: Response): Promise<any> => {
  const { longUrl } = req.body;
  const shortCode = crypto.randomBytes(4).toString("hex");

  const url = await prisma.url.create({
    data: {
      longUrl,
      shortCode,
      userId: req.user.id,
    },
  });

  res.json({ shortUrl: `/api/url/${url.shortCode}` });
};

export const getMyUrls = async (req: Request, res: Response): Promise<any> => {
  const urls = await prisma.url.findMany({
    where: { userId: req.user?.id },
  });
  res.json(urls);
};

export const redirectUrl = async (req: Request, res: Response): Promise<any> => {
  const { shortCode } = req.params;
  const url = await prisma.url.findUnique({ where: { shortCode } });
  if (!url) return res.status(404).send("Not found");
  res.redirect(url.longUrl);
};

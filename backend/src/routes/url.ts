import express from "express";
import {
  shortenUrl,
  getMyUrls,
  redirectUrl,
} from "../controller/url.controllers";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", authMiddleware, shortenUrl);
router.get("/me", authMiddleware, getMyUrls);
router.get("/:shortCode", redirectUrl);

export default router;

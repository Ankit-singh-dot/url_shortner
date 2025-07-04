import express from "express";
import { signup, login, getMe } from "../controller/auth.controllers";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();
console.log("eghjosijfo")
router.post("/signup", signup);
router.post("/login", login);
router.get("/me", authMiddleware, getMe);
router.post("/test", (req, res) => {
  res.json({ message: "It works!" });
});
export default router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controllers_1 = require("../controller/auth.controllers");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
console.log("eghjosijfo");
router.post("/signup", auth_controllers_1.signup);
router.post("/login", auth_controllers_1.login);
router.get("/me", auth_middleware_1.authMiddleware, auth_controllers_1.getMe);
router.post("/test", (req, res) => {
    res.json({ message: "It works!" });
});
exports.default = router;

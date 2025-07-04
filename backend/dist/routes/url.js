"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const url_controllers_1 = require("../controller/url.controllers");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.post("/", auth_middleware_1.authMiddleware, url_controllers_1.shortenUrl);
router.get("/me", auth_middleware_1.authMiddleware, url_controllers_1.getMyUrls);
router.get("/:shortCode", url_controllers_1.redirectUrl);
exports.default = router;

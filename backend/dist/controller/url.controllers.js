"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirectUrl = exports.getMyUrls = exports.shortenUrl = void 0;
const client_1 = require("@prisma/client");
const crypto_1 = __importDefault(require("crypto"));
const prisma = new client_1.PrismaClient();
const shortenUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { longUrl } = req.body;
    const shortCode = crypto_1.default.randomBytes(4).toString("hex");
    const url = yield prisma.url.create({
        data: {
            longUrl,
            shortCode,
            userId: req.user.id,
        },
    });
    res.json({ shortUrl: `/api/url/${url.shortCode}` });
});
exports.shortenUrl = shortenUrl;
const getMyUrls = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const urls = yield prisma.url.findMany({
        where: { userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id },
    });
    res.json(urls);
});
exports.getMyUrls = getMyUrls;
const redirectUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { shortCode } = req.params;
    const url = yield prisma.url.findUnique({ where: { shortCode } });
    if (!url)
        return res.status(404).send("Not found");
    res.redirect(url.longUrl);
});
exports.redirectUrl = redirectUrl;

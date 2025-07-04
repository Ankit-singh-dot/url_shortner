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
exports.getMe = exports.login = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;
const createToken = (id) => jsonwebtoken_1.default.sign({ id }, JWT_SECRET, { expiresIn: "7d" });
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log("gieabsibgr");
    const existing = yield prisma.user.findUnique({ where: { email } });
    if (existing)
        return res.status(400).json({ message: "Email in use" });
    const hash = yield bcrypt_1.default.hash(password, 10);
    const user = yield prisma.user.create({
        data: { email, password: hash },
    });
    const token = createToken(user.id);
    res.cookie("token", token, { httpOnly: true });
    res.json({ user: { id: user.id, email: user.email } });
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield prisma.user.findUnique({ where: { email } });
    if (!user)
        return res.status(400).json({ message: "Invalid credentials" });
    const match = yield bcrypt_1.default.compare(password, user.password);
    if (!match)
        return res.status(400).json({ message: "Invalid credentials" });
    const token = createToken(user.id);
    res.cookie("token", token, { httpOnly: true });
    res.json({ user: { id: user.id, email: user.email } });
});
exports.login = login;
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    res.json({ user });
});
exports.getMe = getMe;

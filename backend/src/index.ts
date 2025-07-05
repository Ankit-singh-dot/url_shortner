import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth";
import urlRoutes from "./routes/url";
import cors from "cors";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

console.log("fgwhisohg");
app.use("/api/auth", authRoutes);
app.use("/api/url", urlRoutes);

const PORT = process.env.PORT || 4000;

// Only start the server if this file is run directly
if (require.main === module) {
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
}

export default app;

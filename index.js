import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import userRoutes from "./routes/user.route.js";
import { connectWithDB } from "./utils/connectWithDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./socket/socket.js";
import path from "path";
dotenv.config();
const __dirname = path.resolve();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.ALLOWED_URL || `http://localhost:${port}`,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/client/dist")));
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

server.listen(port, async () => {
  console.log(`Listening on port http://localhost:${port}...`);
  await connectWithDB();
});

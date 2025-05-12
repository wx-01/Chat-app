import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_LINK,
  credentials: true,
})); 
const PORT = process.env.PORT || 8081;
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.listen(PORT, () => {
  console.log("Server is running");
  connectDB()
});

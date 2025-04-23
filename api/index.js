import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

import authRoutes from "../routes/auth.route.js";
import userRoutes from "../routes/user.route.js";
import postRoutes from "../routes/post.route.js";
import notificationRoutes from "../routes/notification.route.js";

// Load environment variables
dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
    origin: [
        "http://localhost", 
        "http://localhost:80", 
        "http://localhost:3000",
        "https://blaze-f.onrender.com",
        process.env.FRONTEND_URL
    ].filter(Boolean),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Handle favicon.ico requests
app.get('/favicon.ico', (req, res) => {
    res.status(204).end();
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ 
        error: "Internal Server Error",
        message: process.env.NODE_ENV === "development" ? err.message : undefined
    });
});

// 404 handler
app.use((req, res) => {
    console.log('404 for path:', req.path);
    res.status(404).json({ error: "Not Found" });
});

// Vercel serverless function handler
export default app; 
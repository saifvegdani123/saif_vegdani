import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import dotenv from "dotenv";
import programmeRoutes from "./routes/programmeRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware
app.use(helmet());

// Cross-Origin Resource Sharing
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((s) => s.trim())
  : ["http://localhost:5173", "http://localhost:3000", "http://localhost:5000"];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== "production") {
        return callback(null, true);
      }
      return callback(new Error("CORS policy: Not allowed by CORS origin"));
    },
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// Rate Limiter for general endpoints
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  message: {
    success: false,
    message: "Too many requests from this IP. Please try again after 15 minutes."
  },
  standardHeaders: true,
  legacyHeaders: false
});
app.use(generalLimiter);

// Specific stricter limiter for enquiry form submissions
const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: {
    success: false,
    message: "Too many enquiries submitted from this IP. Please try again later or contact directly via WhatsApp."
  }
});

// Body parsers with payload size limits
app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ extended: true, limit: "50kb" }));

// Root info
app.get("/", (req, res) => {
  res.json({
    name: "Saif Barkat Vegdani — Tuition Academy API",
    status: "Active",
    version: "1.0.0",
    educator: "Saif Barkat Vegdani (B.Com, B.Ed)",
    experience: "8 Years",
    batchWindow: "4:30 PM – 8:00 PM",
    endpoints: {
      health: "/api/health",
      programmes: "/api/programmes",
      enquiries: "/api/enquiries"
    }
  });
});

// Health Check Endpoint
app.get("/api/health", (req, res) => {
  const mongoStatus =
    mongoose.connection.readyState === 1
      ? "Connected"
      : mongoose.connection.readyState === 2
      ? "Connecting"
      : "Disconnected (Operating in Resilient In-Memory Mode)";

  res.status(200).json({
    status: "Healthy",
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    database: mongoStatus,
    environment: process.env.NODE_ENV || "development"
  });
});

// API Routes
app.use("/api/programmes", programmeRoutes);
app.use("/api/enquiries", enquiryLimiter, enquiryRoutes);

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Requested API endpoint does not exist"
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

// Optional MongoDB Connection (Resilient: app runs smoothly even if Mongo is not running)
const MONGO_URI = process.env.MONGODB_URI;
if (MONGO_URI) {
  mongoose
    .connect(MONGO_URI, {
      serverSelectionTimeoutMS: 3000
    })
    .then(() => {
      console.log("Connected to MongoDB successfully");
    })
    .catch((err) => {
      console.warn(
        "MongoDB connection unavailable (" +
          err.message +
          "). Server running seamlessly in In-Memory fallback mode."
      );
    });
} else {
  console.log("No MONGODB_URI provided. Running in resilient In-Memory development mode.");
}

// Start Server
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Tuition Academy Backend Server running on port ${PORT}`);
  });
}

export default app;

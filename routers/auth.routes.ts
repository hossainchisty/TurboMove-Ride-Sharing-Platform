import express from "express";
import rateLimit from "express-rate-limit";
import { register, login, verifyOTP } from "../controllers/auth.controller";
import protect from "../middleware/auth.middleware";

const authRouters = express.Router();

// Apply rate limiting middleware
const otpRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // Allow a maximum of 5 requests per minute
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

authRouters.post("/register", register);
authRouters.post("/verify-otp", otpRateLimiter, protect, verifyOTP);
authRouters.post("/login", login);

export default authRouters;

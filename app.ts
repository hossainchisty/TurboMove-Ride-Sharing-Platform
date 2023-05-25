import express, { Request, Response } from "express";
import connectDB from "./config/_db";
connectDB();

import authRouters from "./routers/auth.routers";
import riderRouters from "./routers/rider.routers";

const app = express();

app.use(express.json()); // Parsing JSON bodies

// Rotuers implementation
app.use("/api/v1/auth", authRouters);
app.use("/api/v1/rider", riderRouters);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

// Undefined Route Implement
app.use("*", (req, res) => {
  res.status(404).json({ status: "fail", data: "Not Found" });
});

export default app;

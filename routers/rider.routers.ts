import express from "express";
import { createTrack } from "../controllers/rider.controller";
import protect from "../middleware/auth.middleware";

const riderRouters = express.Router();

riderRouters.post("/add/truck", protect, createTrack);

export default riderRouters;

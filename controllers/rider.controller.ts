import { Request, Response } from "express";
import Track, { ITrack } from "../models/trackModel";
import User from "../models/userModel";
import type { AuthenticatedRequest } from "../middleware/auth.middleware";

export const createTrack = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const {
      truck_number,
      serial,
      model,
      reference,
      license_number,
      document,
      track_image,
    } = req.body;

    if (!truck_number) {
      return res.status(400).json({
        status: 400,
        message: "Validation error",
        errors: [
          {
            field: "truck_number",
            message: "Truck number is required",
          },
        ],
      });
    }

    if (!serial) {
      return res.status(400).json({ error: "Serial number is required" });
    }

    if (!model) {
      return res.status(400).json({ error: "Model is required" });
    }

    if (!license_number) {
      return res.status(400).json({ error: "License number is required" });
    }

    if (!document) {
      return res.status(400).json({ error: "Document is required" });
    }

    if (!track_image) {
      return res.status(400).json({ error: "Track image is required" });
    }

    // Get the logged-in user
    const userId = req.user!.id; // Add "!" to assert that req.user is not undefined
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create the track
    const track: ITrack = new Track({
      owner: user._id, // Set the owner as the user ID
      truck_number,
      serial,
      model,
      reference,
      license_number,
      document,
      track_image,
    });

    // Save the track
    await track.save();

    // Update the user's track field
    user.track = track._id;
    await user.save();

    res.status(201).json({ track });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

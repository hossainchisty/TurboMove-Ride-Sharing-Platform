import mongoose, { Schema, Document, Types } from "mongoose";
import { IUser } from "./userModel";

export interface IRide extends Document {
  driver: Types.ObjectId | IUser;
  passengers: Types.ObjectId[] | IUser[];
  startLocation: string;
  endLocation: string;
  startTime: Date;
  endTime: Date;
  createdAt: Date;
  updatedAt: Date;
}

const rideSchema: Schema = new Schema(
  {
    driver: { type: Schema.Types.ObjectId, ref: "User" },
    passengers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    startLocation: { type: String, required: true },
    endLocation: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
  },
  { versionKey: false, timestamps: true }
);

const Ride = mongoose.model<IRide>("Ride", rideSchema);
export default Ride;

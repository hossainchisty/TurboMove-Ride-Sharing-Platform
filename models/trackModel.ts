import mongoose, { Schema, Document, Types } from "mongoose";
import { IUser } from "./userModel";

export interface ITrack extends Document {
  truck_number: string;
  serial: string;
  model: string;
  referance: string;
  license_number: string;
  document: string;
  track_image: string;
  price: number;
  isAvailable: boolean;
  owner: Types.ObjectId | IUser;
}

const trackSchema: Schema = new Schema(
  {
    truck_number: { type: String, required: true },
    serial: { type: String, required: true },
    model: { type: String, required: true },
    referance: { type: String, required: false },
    license_number: { type: String, required: true },
    document: { type: String, required: true },
    track_image: { type: String, required: true },
    price: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const TrackModel = mongoose.model<ITrack>("Track", trackSchema);

export default TrackModel;

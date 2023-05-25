import mongoose, { Schema, Document } from "mongoose";
import { ITrack } from "./trackModel";

export interface IUser extends Document {
  name: string;
  phone_number: number;
  password: string;
  isVerfied: boolean;
  otp: string;
  track: ITrack | null;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    phone_number: { type: Number, required: true },
    password: { type: String, required: true },
    isVerfied: { type: Boolean, required: false },
    otp: { type: String, required: false },
    track: { type: Schema.Types.ObjectId, ref: "Track", default: null },
  },
  { versionKey: false, timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;

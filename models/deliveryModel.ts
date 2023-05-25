import mongoose, { Schema, Document, Types } from "mongoose";
import { IUser } from "./userModel";

export interface IDelivery extends Document {
  driver: Types.ObjectId | IUser;
  sender: Types.ObjectId | IUser;
  recipient: Types.ObjectId | IUser;
  pickupLocation: string;
  dropoffLocation: string;
  pickupTime: Date;
  deliveredTime: Date;
  createdAt: Date;
  updatedAt: Date;
}

const deliverySchema: Schema = new Schema(
  {
    driver: { type: Schema.Types.ObjectId, ref: "User" },
    sender: { type: Schema.Types.ObjectId, ref: "User" },
    recipient: { type: Schema.Types.ObjectId, ref: "User" },
    pickupLocation: { type: String, required: true },
    dropoffLocation: { type: String, required: true },
    pickupTime: { type: Date, required: true },
    deliveredTime: { type: Date },
  },
  { versionKey: false, timestamps: true }
);

const Delivery = mongoose.model<IDelivery>("Delivery", deliverySchema);

export default Delivery;

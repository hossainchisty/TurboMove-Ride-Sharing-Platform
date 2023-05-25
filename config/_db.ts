import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL as string);
    console.log(`MongoDB Connected: ${connect.connection.host}`);
  } catch (error) {
    console.info(error);
    process.exit(1);
  }
};

export default connectDB;

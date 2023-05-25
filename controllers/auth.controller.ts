import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import generateToken from "../services/generateToken.service";
import User, { IUser } from "../models/userModel";
import { generateOTP } from "../services/otp.service";

/**
 * @desc    Register new user
 * @route   /api/v1/auth/register
 * @method  POST
 * @access  Public
 */

export const register = async (req: Request, res: Response) => {
  try {
    const { name, phone_number, password, role } = req.body;

    if (!name || !phone_number || !password || !role) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    // Check if user with the same phone number already exists
    const existingUser = await User.findOne({ phone_number });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this phone number already exists" });
    }

    // Generate OTP
    const otp = generateOTP();

    // Log the OTP on the console
    console.log(
      `Generated OTP for user with phone number ${phone_number}: ${otp}`
    );

    // Create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: IUser = new User({
      name,
      phone_number,
      otp,
      role,
      password: hashedPassword,
    });
    await newUser.save();

    // Generate a JWT token
    const token = generateToken(newUser._id);

    res.status(201).json({
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * @desc Verifies the OTP (One-Time Password) provided by the user.
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 * @returns A response indicating the success or failure of OTP verification.
 */

export const verifyOTP = async (req: Request, res: Response) => {
  try {
    const { phone_number, otp } = req.body;

    if (!phone_number || !otp) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    // Find the user with the provided phone number
    const user = await User.findOne({ phone_number });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerfied) {
      return res.status(400).json({ message: "User is already verified" });
    }

    // Compare the user's OTP with the input OTP
    if (user.otp !== otp.toString()) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Update the user's verification status
    user.isVerfied = true;
    await user.save();

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * @desc    Authenticate a user
 * @route   /api/v1/auth/login
 * @method  POST
 * @access  Public
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { phone_number, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ phone_number });
    if (!user) {
      return res.status(401).json({ message: "Invalid phone number" });
    }

    // Check if the user's mobile number is verified
    if (!user.isVerfied) {
      return res.status(400).json({
        message:
          "Please verify your mobile number before logging in. We have sent a verification code to your phone. Check your messages and enter the code to complete the verification process.",
      });
    }

    // Check user role
    if (user.role !== "rider" && user.role !== "shipper") {
      return res.status(403).json({ message: "Unauthorized user role" });
    }

    // Check if the provided password matches the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate a JWT token
    const token = generateToken(user._id);

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * @desc    Logs out the currently logged-in user by invalidating the JWT token.
 * @route   /api/v1/auth/logout
 * @method  POST
 * @access  Private
 * @requires Logged User
 * @returns {string} 200 OK: Returns a success message indicating successful logout.
 */

// export const logout = async (req: Request, res: Response): Promise<void> => {
//   try {
//     // Assuming you have an authentication middleware that populates the 'user' property
//     const { user } = req;

//     if (user) {
//       // Update the user's token to invalidate it
//       user.token = "";

//       // Save the updated user document
//       await user.save();

//       res.status(200).json({ message: "Logged out successfully" });
//     } else {
//       res.status(401).json({ message: "Unauthorized" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error logging out user" });
//   }
// };

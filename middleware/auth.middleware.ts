import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel";

interface AuthenticatedRequest extends Request {
  user?: any;
}

const protect = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, "your-secret-key") as { userId: string };
    req.user = decoded;
    // Retrieve user information from the database based on the decoded user ID
    const userId = decoded.userId;
    const user = User.findById(userId);

    // Add the user object to the request for further processing
    req.user = user;
    // Call the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid token" });
  }
};

export default protect;

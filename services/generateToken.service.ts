import jwt from "jsonwebtoken";

// Generate JWT token
const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, "your-secret-key", { expiresIn: "7d" });
};

export default generateToken;

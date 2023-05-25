/**
 * Generates a random OTP (One-Time Password) code.
 * @returns The generated OTP code as a string.
 */

export const generateOTP = (): string => {
  const otpLength = 4; // Length of the OTP code
  const otpDigits = "0123456789"; // Possible digits for the OTP code
  let otp = "";

  for (let i = 0; i < otpLength; i++) {
    const randomIndex = Math.floor(Math.random() * otpDigits.length);
    otp += otpDigits[randomIndex];
  }

  return otp;
};

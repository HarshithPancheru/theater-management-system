import User from "./auth.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

/* ---------------- REGISTER ---------------- */
export const registerUser = async (data) => {
  const { name, email, password, role, theaterId } = data;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already registered");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    passwordHash,
    role: role || "USER",
    theaterId,
    profilePhoto: data.profilePhoto
  });

  return user;
};

/* ---------------- LOGIN ---------------- */
export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  if (user.status === "BLOCKED") {
    throw new Error("Account is blocked");
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
      theaterId: user.theaterId
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    name:user.name,
    token:token,
    role:user.role
  };
};

/* ---------------- PROFILE ---------------- */
export const getProfile = async (userId) => {
  return User.findById(userId).select("-passwordHash");
};


/* ---------------- SEND RESET EMAIL ---------------- */
export const sendResetPasswordEmail = async (email) => {
  const user = await User.findOne({ email });
  if (!user) return; // silent fail for security

  const token = crypto.randomBytes(32).toString("hex");

  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 mins
  await user.save();

  const resetLink = `${process.env.REACTJS_URL}/reset-password/${token}`;

  // TODO: console log instead of email
  console.log("Reset password link:", resetLink);

  // later: integrate nodemailer / SES / SendGrid
};

/* ---------------- RESET PASSWORD ---------------- */
export const resetPassword = async (token, newPassword) => {
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() }
  });

  if (!user) {
    throw new Error("Invalid or expired token");
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);

  user.passwordHash = passwordHash;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();
};
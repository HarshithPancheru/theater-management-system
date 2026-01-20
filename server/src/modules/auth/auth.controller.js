import * as authService from "./auth.service.js";

// ➡️ Register new user
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    if (req.file) {
      req.body.profilePhoto = req.file.path; // ✅ store uploaded profile photo path
    }

    const user = await authService.registerUser(req.body);
    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

// ➡️ Login user
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Missing credentials" });
    }

    const token = await authService.loginUser(email, password);
    res.json({ success: true, token });
  } catch (err) {
    next(err);
  }
};

// ➡️ Get logged-in user profile
export const getProfile = async (req, res, next) => {
  try {
    const user = await authService.getProfile(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

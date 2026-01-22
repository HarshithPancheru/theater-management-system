import * as authService from "./auth.service.js";

/* ---------------- REGISTER ---------------- */
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    if (req.file) {
      req.body.profilePhoto = req.file.path;
    }

    const user = await authService.registerUser(req.body);

    res.status(201).json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
};

/* ---------------- LOGIN ---------------- */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing credentials"
      });
    }

    const result = await authService.loginUser(email, password);

    res.json({
      success: true,
      token: result.token,
      name:result.name,
      role:result.role
    });
  } catch (err) {
    next(err);
  }
};

/* ---------------- PROFILE ---------------- */
export const getProfile = async (req, res, next) => {
  try {
    const user = await authService.getProfile(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
};



/* ---------------- FORGOT PASSWORD ---------------- */
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    await authService.sendResetPasswordEmail(email);

    res.json({
      success: true,
      message: "Reset link sent to your email"
    });
  } catch (err) {
    next(err);
  }
};

/* ---------------- RESET PASSWORD ---------------- */
export const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required"
      });
    }

    await authService.resetPassword(token, password);

    res.json({
      success: true,
      message: "Password reset successful"
    });
  } catch (err) {
    next(err);
  }
};

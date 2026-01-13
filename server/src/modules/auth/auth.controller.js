export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    // TODO: authService.registerUser(...)
    return res.json({
      success: true,
      message: "Register controller reached",
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing credentials"
      });
    }

    // TODO: authService.loginUser(...)
    return res.json({
      success: true,
      message: "Login controller reached",
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    // TODO: fetch profile using req.user
    return res.json({
      success: true,
      message: "Profile controller reached",
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

const roleMiddleware = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied"
      });
    }
    next();
  };
};

export default roleMiddleware;



/*
router.get(
  "/admin/bookings",
  authMiddleware,
  roleMiddleware(["SUPER_ADMIN"]),
  controller.getAllBookings
);


router.post(
  "/shows",
  authMiddleware,
  roleMiddleware(["THEATER_MANAGER", "STAFF"]),
  controller.createShow
);




router.get(
  "/profile",
  authMiddleware,
  controller.getProfile
);

*/
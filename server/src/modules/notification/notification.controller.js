export const getNotifications = async (req, res, next) => {
  try {
    // TODO: notificationService.getNotifications(...)
    return res.json({
      success: true,
      message: "Get notifications controller reached",
      data: []
    });
  } catch (err) {
    next(err);
  }
};

export const markAsRead = async (req, res, next) => {
  try {
    // TODO: notificationService.markAsRead(...)
    return res.json({
      success: true,
      message: "Mark notification as read controller reached"
    });
  } catch (err) {
    next(err);
  }
};

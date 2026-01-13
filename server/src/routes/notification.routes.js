import express from "express";
import {
  getNotifications,
  markAsRead
} from "../modules/notification/notification.controller.js";

const router = express.Router();

router.get("/", getNotifications);
router.patch("/:notificationId/read", markAsRead);

export default router;

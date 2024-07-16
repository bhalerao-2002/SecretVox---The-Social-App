import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { deleteNotifications, getNotifications, deleteNotification, getUnreadNotificationsCount } from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/", protectRoute, getNotifications);
router.delete("/", protectRoute, deleteNotifications);
router.delete("/:notificationId", protectRoute, deleteNotification);
router.get("/unread-count", protectRoute, getUnreadNotificationsCount); // New route for unread count

export default router;

import Notification from "../models/notification.model.js";

export const getNotifications = async (req, res) => {
	try {
	  const userId = req.user._id;
	  const { markAsRead } = req.query;
  
	  // Fetch notifications for the current user and populate 'from' field with 'username' and 'profileImg'
	  const notifications = await Notification.find({ to: userId }).populate({
		path: "from",
		select: "username profileImg",
	  });
  
	  // If markAsRead query parameter is 'true', update all unread notifications to be read
	  if (markAsRead === 'true') {
		await Notification.updateMany({ to: userId, read: false }, { read: true });
	  }
  
	  // Send the fetched notifications as JSON response
	  res.status(200).json(notifications);
	} catch (error) {
	  // Handle any errors that occur during the process
	  console.log("Error in getNotifications function", error.message);
	  res.status(500).json({ error: "Internal Server Error" });
	}
  };
  

export const deleteNotifications = async (req, res) => {
  try {
    const userId = req.user._id;

    await Notification.deleteMany({ to: userId });

    res.status(200).json({ message: "Notifications deleted successfully" });
  } catch (error) {
    console.log("Error in deleteNotifications function", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const userId = req.user._id;

    const notification = await Notification.findOneAndDelete({ _id: notificationId, to: userId });

    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    console.log("Error in deleteNotification function", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUnreadNotificationsCount = async (req, res) => {
  try {
    const userId = req.user._id;
    const count = await Notification.countDocuments({ to: userId, read: false });
    res.status(200).json({ count });
  } catch (error) {
    console.log("Error in getUnreadNotificationsCount function", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

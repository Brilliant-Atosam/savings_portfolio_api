import User from "./models/User.js";
import moment from "moment";
// console.log(User.find());
const updateNotifications = async () => {
  try {
    const users = await User.find();
    const batchSize = 100;
    for (let i = 0; i < users.length; i += batchSize) {
      const batch = users.slice(i, i + batchSize);
      //   Update notifications for each user in the batch
      const updatePromises = batch.map((user) => {
        const newNotification = {
          title: moment().subtract(4, "months").format("MM/YYYY"),
          read: false,
        };
        const notification = user.notifications.find((notification) =>
          Object.entries(newNotification).every(
            ([key, value]) => notification[key] === value
          )
        );
        !notification && user.notifications.push(newNotification);
        // user.notifications.splice(0, user.notifications.length);
        return user.save();
      });

      // Wait for all updates in the current batch to complete
      await Promise.all(updatePromises);
    }
  } catch (err) {
    console.error("Error updating notifications:", err);
  }
};
export default updateNotifications;

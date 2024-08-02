import User from "./models/User.js";
import moment from "moment";
const updateNotifications = async () => {
  try {
    const users = await User.find();
    const batchSize = 100;
    for (let i = 0; i < users.length; i += batchSize) {
      const batch = users.slice(i, i + batchSize);
      //   Update notifications for each user in the batch
      const updatePromises = batch.map((user) => {
        const newNotification = {
          title: moment().subtract(1, "months").format("MM/YYYY"),
          read: false,
        };
        const notification = user.notifications.find((notification) =>
          Object.entries(newNotification).every(
            ([key, value]) => notification[key] === value
          )
        );
        !notification && user.notifications.push(newNotification);

        return user.save();
      });

      // Wait for all updates in the current batch to complete
      await Promise.all(updatePromises);
    }
  } catch (err) {
  }
  
};
export default updateNotifications;

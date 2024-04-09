import express from "express";
import User from "../models/User.js";
import verify from "../verification.js";
import bcrypt from "bcryptjs";
const router = express.Router();
// update user
router.put("/", verify, async (req, res) => {
  try {
    await User.findOneAndUpdate({ id: req.query.id }, { ...req.body });
    res.json("Operation succeeded!");
  } catch (err) {
    res.status(500).json("Something went wrong. Try again later");
  }
});
// update user password
router.put("/password", verify, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const { userId } = req.query;
  try {
    const user = await User.findOne({ userId });
    if (!user) {
      res.status(404).json("User not found");
    } else {
      const correctPassword = await bcrypt.compare(oldPassword, user.password);
      if (!correctPassword) {
        res.status(401).json("Incorrect password");
      } else {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await user.updateOne({ $set: { password: hashedPassword } });
        res.status(200).json("Password has been changed successfully");
      }
    }
  } catch (err) {
    res.status(500).json("Something went wrong. Try again later");
  }
});
// update user basic info
router.put("/info", verify, async (req, res) => {
  const { password, email, phone, name } = req.body;
  try {
    const user = await User.findOne({ id: req.query.id });
    if (!user) {
      res.status(404).json("User not found!");
    } else {
      const passed = await bcrypt.compare(password, user.password);
      if (!passed) {
        res.status(401).json("Invalid login password!");
      } else {
        await user.updateOne({ $set: { email, phone, name } });
        res.status(200).json("Update done successfully!");
      }
    }
  } catch (err) {
    res.status(500).json("Server error!");
  }
});
// add new portfolio
router.put("/portfolio/add", verify, async (req, res) => {
  const { id } = req.query;
  try {
    await User.findOneAndUpdate(
      { id },
      {
        $push: { portfolio: req.body },
        $inc: { total_percentage: req.body.percentage },
      }
    );
    res.status(200).json("Portfolio added successfully");
  } catch (err) {
    res.status(500).json("Something went wrong. Try again later");
  }
});
// change subscription status
router.put("/status", verify, async (req, res) => {
  console.log("received");
  try {
    const user = await User.findOne({ id: req.query.id });
    if (user) {
      await user.updateOne({ tier: "premium" });
      res
        .status(200)
        .json("You have successfully unlocked premium features. Enjoy!");
    } else {
      res.status(404).json("No user found");
    }
  } catch (err) {}
});
export default router;

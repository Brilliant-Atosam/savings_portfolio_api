import express from "express";
import verify from "../verification.js";
import Expenses from "../models/Expenses.js";
import User from "../models/User.js";
const router = express.Router();
router.post("/", verify, async (req, res) => {
  try {
    const newExpense = new Expenses({ ...req.body });
    await newExpense.save();
    await User.updateOne(
      { id: req.body.userId },
      { $set: { total_expense: req.body.total_cost } }
    );
    res.send("Operation was successful");
  } catch (err) {
    res.status(500).json("Server error!");
  }
});

router.get("/", async (req, res) => {
  const { userId } = req.query;
  try {
    const expenses = await Expenses.find({ userId });
    res.json(expenses);
  } catch (err) {
    res.status(500).json("Server error!");
  }
});

router.delete("/", verify, async (req, res) => {
  const { id } = req.query;
  try {
    await Expenses.findOneAndDelete({ id });
    res.json("Operation succeeded!");
  } catch (err) {
    res.status(500).json("Server error!");
  }
});
export default router;

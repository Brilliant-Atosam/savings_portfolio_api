import express from "express";
import verify from "../verification.js";
import Budget from "../models/Budget.js";
const router = express.Router();
router.get("/", verify, async (req, res) => {
  const { userId } = req.query;
  try {
    const budgets = await Budget.find({ userId });
    res.json(budgets);
  } catch (err) {
    res.status(500).json("Server error!");
  }
});
router.post("/", verify, async (req, res) => {
  try {
    const newBudget = new Budget(req.body);
    await newBudget.save();
    res.json("Budget created successfully");
  } catch (err) {
    res.status(500).json("Server error!");
  }
});
export default router;

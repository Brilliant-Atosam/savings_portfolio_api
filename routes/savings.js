import { Router } from "express";
import Savings from "../models/Savings.js";
import verify from "../verification.js";
const router = Router();
// get savings
router.get("/", async (req, res) => {
  try {
    const savings = await Savings.find({ userId: req.query.userId });
    res.status(200).json(savings);
  } catch (err) {
    res.status(500).json("Something went wrong. Please try again later");
  }
});
// add savings
router.post("/", verify, async (req, res) => {
  try {
    const newSavings = await new Savings({ ...req.body.savings });
    await newSavings.save();
    res.json("Savings added");
  } catch (err) {
    res.status(500).json("Something went wrong. Try again later");
  }
});
// delete income
router.delete("/", verify, async (req, res) => {
  const { id } = req.query;
  try {
    await Savings.findOneAndDelete({ id });
    res.json("Operation is successful");
  } catch (err) {
    res.status(500).json("Something went wrong. Try again later");
  }
});
export default router;

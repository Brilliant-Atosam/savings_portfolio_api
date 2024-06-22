import { Router } from "express";
import User from "../models/User.js";
import Loan from "../models/Loan.js";
import verify from "../verification.js";
import Lend from "../models/Lend.js";
import Borrow from "../models/Borrow.js";
const router = Router();
// get borrowed
router.get("/borrowed", verify, async (req, res) => {
  try {
    const borrowed = await Borrow.find({ user_id: req.query.userId });
    res.json(borrowed);
  } catch (err) {
    res.status(500).json("Server error.");
  }
});
// get lent
router.get("/lent", verify, async (req, res) => {
  try {
    const lent = await Lend.find({ user_id: req.query.userId });
    res.json(lent);
  } catch (err) {
    res.status(500).json("Server error.");
  }
});
router.post("/", verify, async (req, res) => {
  const { user, loanDetails } = req.body;
  try {
    const userData = await User.findOne({ id: req.query.userId });
    const newLoan = new Loan({ ...loanDetails });
    await newLoan.save();
    await userData.updateOne(user);
    res.send("Your advance has been successful. ");
  } catch (err) {
    res.status(500).json("Server error.");
  }
});
// lend money
router.post("/lend", verify, async (req, res) => {
  try {
    const newLend = new Lend(req.body);
    await newLend.save();
    res.status(200).json("Operation succeeded!");
  } catch (err) {
    res.status(500).json("Server error.");
    console.log(err);
  }
});
// borrow money
router.post("/borrow", verify, async (req, res) => {
  try {
    const newBorrow = new Borrow(req.body);
    await newBorrow.save();
    res.status(200).json("Operation succeeded!");
  } catch (err) {
    res.status(500).json("Server error.");
  }
});
// get loan history
router.get("/", verify, async (req, res) => {
  const { userId } = req.query;
  try {
    const loans = await Loan.find({ userId });
    res.status(200).json(loans);
  } catch (err) {
    res.status(500).json("Server error.");
  }
});
export default router;

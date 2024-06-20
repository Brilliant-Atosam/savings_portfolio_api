import { Router } from "express";
import User from "../models/User.js";
import Loan from "../models/Loan.js";
import verify from "../verification.js";
const router = Router();

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

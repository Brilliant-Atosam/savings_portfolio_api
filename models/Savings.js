import mongoose from "mongoose";
const savingsSchema = new mongoose.Schema({
  userId: String,
  amount: Number,
  details: [],
  createdAt: String,
  saved: Number,
  balance: Number,
  id: String,
  source: String,
});
const Savings = mongoose.model("Savings", savingsSchema);
export default Savings;

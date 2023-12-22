import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  id: String,
  createdAt: String,
  portfolio: [],
  password: String,
  // total_amount_earned: Number,
  total_amount_saved: { type: Number, default: 0 },
  total_advance: { type: Number, default: 0 },
  settled_advance: { type: Number, default: 0 },
  advance_balance: { type: Number, default: 0 },
  repayment_history: [],
  reset_code: String,
});
const User = mongoose.model("User", userSchema);
export default User;
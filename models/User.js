import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  id: String,
  createdAt: String,
  portfolio: [],
  sources_of_income: [],
  total_income: { type: Number, default: 0 },
  password: String,
  total_amount_saved: { type: Number, default: 0 },
  total_advance: { type: Number, default: 0 },
  settled_advance: { type: Number, default: 0 },
  advance_balance: { type: Number, default: 0 },
  repayment_history: [],
  total_percentage: { type: Number, default: 0 },
  reset_code: String,
  total_expense: { type: Number, default: 0 },
});
const User = mongoose.model("User", userSchema);
export default User;

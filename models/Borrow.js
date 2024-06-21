import mongoose from "mongoose";
const schema = new mongoose.Schema({
  user_id: String,
  id: String,
  lender: String,
  amount: String,
  reason: String,
  date: String,
  repayment_date: String,
  repayment_history: [],
});
const Borrow = mongoose.model("Borrow", schema);
export default Borrow;

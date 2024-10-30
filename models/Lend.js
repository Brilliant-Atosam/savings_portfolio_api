import mongoose from "mongoose";
const schema = new mongoose.Schema({
  user_id: String,
  id: String,
  borrower: String,
  amount: Number,
  reason: String,
  date: String,
  repayment_date: String,
  repayment_history: [],
  repayment_amount: Number,
  interest_type: String,
  interest_rate: Number,
});
const Lend = mongoose.model("Lend", schema);
export default Lend;

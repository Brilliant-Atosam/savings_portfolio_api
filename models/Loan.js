import mongoose from "mongoose";
const loanSchema = new mongoose.Schema({
  id: String,
  userId: String,
  createdAt: String,
  amount: Number,
  reason: String,
  urgency: String,
  importance: String,
  repayment_date: String,
});
const Loan = mongoose.model("Loan", loanSchema);
export default Loan;

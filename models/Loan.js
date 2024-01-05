import mongoose from "mongoose";
const loanSchema = new mongoose.Schema({
  id: String,
  userId: String,
  createdAt: String,
  amount: Number,
  reason: String,
  repayment_date: String,
  borrowed_from: String,
});
const Loan = mongoose.model("Loan", loanSchema);
export default Loan;

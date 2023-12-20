import mongoose from "mongoose";
const expensesSchema = new mongoose.Schema({
  userId: String,
  createdAt: String,
  details: Object,
});
const Expenses = mongoose.model("Expenses", expensesSchema);
export default Expenses;

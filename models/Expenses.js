import mongoose from "mongoose";
const expensesSchema = new mongoose.Schema({
  userId: String,
  created_at: String,
  item: String,
  quantity: Number,
  total_cost: Number,
  unit_price: Number,
  id: String,
  category: String,
});
const Expenses = mongoose.model("Expenses", expensesSchema);
export default Expenses;

import mongoose from "mongoose";
const budgetSchema = new mongoose.Schema({
  month: String,
  userId: String,
  total_budget: String,
  categories: [],
  created_at: String,
  id: String,
});
const Budget = mongoose.model("Budget", budgetSchema);
export default Budget;

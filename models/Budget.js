import mongoose from "mongoose";
const budgetSchema = new mongoose.Schema({
  month: String,
  userId: String,
  total_budget: Number,
  estimated_budget: Number,
  categories: [],
  created_at: String,
  id: String,
  userId: String,
});
const Budget = mongoose.model("Budget", budgetSchema);
export default Budget;

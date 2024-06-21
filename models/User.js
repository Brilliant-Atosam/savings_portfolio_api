import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  tier: { type: String, default: "basic" },
  name: String,
  email: String,
  phone: String,
  id: String,
  createdAt: String,
  portfolio: [],
  sources_of_income: [],
  password: String,
  notifications: [],
  reset_code: String,
  currency: {
    type: Object,
    default: {
      name: "cedis",
      locale: "en-GH",
      currency: "GHS",
    },
  },
});
const User = mongoose.model("User", userSchema);
export default User;

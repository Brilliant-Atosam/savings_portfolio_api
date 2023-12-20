import mongoose from "mongoose";
mongoose
  .connect("mongodb://127.0.0.1:27017/savings_portfolio")
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

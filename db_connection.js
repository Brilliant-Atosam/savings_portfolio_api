import mongoose from "mongoose";
mongoose
  .connect(process.env.mongodb_uri)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

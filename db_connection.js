import mongoose from "mongoose";
import { mongo_uri } from "./config.js";
mongoose
  .connect(mongo_uri)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

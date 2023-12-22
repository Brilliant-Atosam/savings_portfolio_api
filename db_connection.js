import mongoose from "mongoose";
import { mongo_uri } from "./config.js";
console.log(mongo_uri);
mongoose
  .connect(mongo_uri)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

import "dotenv/config.js";
import "./db_connection.js";
import express from "express";
import auth from "./routes/auth.js";
import user from "./routes/user.js";
// import User from "./models/User.js";
import savings from "./routes/savings.js";
import expenses from "./routes/expenses.js";
import loan from "./routes/loan.js";
import budget from "./routes/budget.js";
import cors from "cors";
// import bcrypt from 'bcryptjs'
import cron from "node-cron";
import updateNotifications from "./notifications.js";
const app = express();
app.use(cors());
cron.schedule("0 0 1 * *", () => updateNotifications());
// app.get("/", async (req, res) => {
//   // await updateNotifications();
//   // const users = await User.find();
//   res.json("The work is done");
// });
app.use(express.json());
app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/savings", savings);
app.use("/api/loan", loan);
app.use("/api/budget", budget);
app.use("/api/expenses", expenses);
app.listen(9000, () => console.log("App is running"));

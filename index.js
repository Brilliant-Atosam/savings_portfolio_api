import "dotenv/config.js";
import "./db_connection.js";
import express from "express";
import auth from "./routes/auth.js";
import user from "./routes/user.js";
import User from "./models/User.js";
import savings from "./routes/savings.js";
import expenses from "./routes/expenses.js";
import loan from "./routes/loan.js";
import cors from "cors";
import cron from "node-cron";
import updateNotifications from "./notifications.js";
const app = express();

app.use(cors());
cron.schedule("58 13 * * *", () => updateNotifications());
updateNotifications()
app.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});
app.use(express.json());
app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/savings", savings);
app.use("/api/loan", loan);
app.use("/api/expenses", expenses);
app.listen(9000, () => console.log("App is running"));

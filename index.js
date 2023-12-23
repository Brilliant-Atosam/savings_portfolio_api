import env from "dotenv";
env.config();
import "./db_connection.js";
import express from "express";
import auth from "./routes/auth.js";
import user from "./routes/user.js";
import savings from "./routes/savings.js";
import loan from "./routes/loan.js";
import cors from "cors";
const app = express();
app.use(
  cors({
    origin: ["https://cashlens.netlify.app/", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/savings", savings);
app.use("/api/loan", loan);
app.listen(9000, () => console.log("App is running"));

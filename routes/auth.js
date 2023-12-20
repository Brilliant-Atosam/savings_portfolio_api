import { Router } from "express";
import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { VERIFICATION_TOKEN } from "../config.js";
import emails from "../emails.js";
const router = Router();
const { mailOptions, transporter } = emails();

// reset password request
router.post("/reset", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json("User does not exist.");
    } else {
      const reset_code = Math.floor(
        Math.random() * Math.random() * 99999
      ).toString();
      await user.updateOne({ $set: { reset_code } }, { new: true });
      transporter.sendMail(
        mailOptions(
          email,
          "RESET PASSWORD",
          user,
          `http://localhost:3000/password/reset?reset_code=${reset_code}`
        ),
        (err) => {
          if (err) {
            console.log(err);
            res.json(err.message);
          } else {
            res
              .status(200)
              .json(
                "A password reset link has been sent to your inbox. I f you don't the email, check your spam"
              );
          }
        }
      );
    }
  } catch (err) {
    res.status(500).json("Server error");
  }
});
// reset user password
router.put("/reset", async (req, res) => {
  const { password, reset_code } = req.body;
  try {
    const user = await User.findOne({ reset_code });
    console.log(user);
    if (!user) {
      res.status(404).json("User not found");
    } else {
      const hashedPassword = await bcryptjs.hash(password, 10);
      await user.updateOne({
        $set: { password: hashedPassword, reset_code: "" },
      });
      res.status(200).json("Password reset was successful");
    }
  } catch (err) {
    res.status(500).json("Server error!");
  }
});
// create user
router.post("/", async (req, res) => {
  const { email, phone, password } = req.body;
  try {
    const user = await User.findOne({ email, phone });
    if (user) {
      res.status(409).json("User with email or phone exist");
    } else {
      const hashedPassword = await bcryptjs.hash(password, 10);
      const newUser = new User({ ...req.body, password: hashedPassword });
      await newUser.save();
      res
        .status(201)
        .json("Account has been created. Redirecting to login page");
    }
  } catch (err) {
    res.status(500).json("Server error! Try again later.");
  }
});

// login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const compared = await bcryptjs.compare(password, user?.password);
      if (compared) {
        const access_token = await jwt.sign(
          { id: user.id },
          VERIFICATION_TOKEN,
          {
            expiresIn: "1d",
          }
        );
        const { password, _v, ...userInfo } = user._doc;
        res.status(200).json({ access_token, ...userInfo });
      } else {
        res.status(401).json("Invalid login password");
      }
    } else {
      res.status(404).json("Invalid login credentials");
    }
  } catch (err) {
    res.status(500).json("Server error! Try again later.");
    console.log(err.message);
  }
});
export default router;

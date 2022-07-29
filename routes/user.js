const express = require("express");
const router = express.Router();
const UserSchema = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyUser = require("../utils/verifyUser");

/********************
 Register
********************/
router.post("/register", async (req, res) => {
  const { email, plainPassword, confPassword } = req.body;

  // Handling the errors
  if (!email) {
    return res.json({ status: "Error", error: "Invalid Email." });
  }
  if (!plainPassword || !confPassword) {
    return res.json({ status: "Error", error: "Invalid Password." });
  }
  if (plainPassword !== confPassword) {
    return res.json({ status: "Error", error: "Password doesn't matched." });
  }
  if (plainPassword?.length < 6) {
    return res.json({ status: "Error", error: "Password is too short." });
  }
  // Hashing the password for security
  const password = await bcrypt.hash(plainPassword, 10);

  // Inserting the users data to the database
  try {
    const createdUser = await UserSchema.create({
      email,
      password,
    });
    res.json({
      status: "ok",
      message: "register successful.",
      registered: true,
    });
  } catch (error) {
    if (error.code === 1100) {
      return res.json({ status: "Error", error: "Email is already used." });
    } else {
      return res.json({ status: "Error", error: error.message, existed: true });
    }
  }
});

/********************
Login
********************/
router.post("/login", async (req, res) => {
  const { email, plainPassword } = req.body;
  if (!email || !plainPassword) {
    return res.json({
      status: "error",
      message: "Invalid email and password.",
    });
  }
  // trying to findout
  UserSchema.findOne({ email: email }, (err, result) => {
    if (err) {
      res.json({ status: "error", message: err.message });
    }
    if (result) {
      bcrypt.compare(plainPassword, result.password, (err, response) => {
        if (err) {
          res.json({
            status: "Error",
            message: "No user found using this email and password.",
          });
        }
        if (response) {
          try {
            const payload = {
              email: result.email,
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET);
            res.json({
              status: "ok",
              message: "log in successful.",
              logged: true,
              token: token,
            });
          } catch (err) {
            console.log(err.message);
          }
        } else {
          res.json({ status: "error", message: "Password not matched." });
        }
      });
    } else {
      res.json({
        status: "error",
        message: "No user found using this email and password.",
      });
    }
  });
});

module.exports = router;

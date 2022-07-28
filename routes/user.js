const express = require("express");
const router = express.Router();
const UserSchema = require("../models/User");
const bcrypt = require("bcryptjs");

// register
router.post("/register", async (req, res) => {
  const { email, inputtedPassword } = req.body;

  // Handling the errors
  if (!email) {
    return res.json({ status: "Error", error: "Invalid Email" });
  }
  if (inputtedPassword.length < 6) {
    return res.json({ status: "Error", error: "Password is too short." });
  }
  // Hashing the password for security
  const password = await bcrypt.hash(inputtedPassword, 10);

  // Inserting the users data to the database
  try {
    const createdUser = await UserSchema.create({
      email,
      password,
    });
    res.json({ status: "ok", message: "register successful." });
  } catch (error) {
    if (error.code === 1100) {
      return res.json({ status: "Error", error: "Email is already used." });
    } else {
      return res.json({ status: "Error", error: error.message });
    }
  }
});

// login
router.post("/login", async (req, res) => {
  const { email, inputtedPassword } = req.body;
  if (!email || !inputtedPassword) {
    return res.json({
      status: "error",
      message: "Invalid email and password.",
    });
  }
  // trying to find
  UserSchema.findOne({ email: email }, (err, result) => {
    if (err) {
      res.json({ status: "error", message: err.message });
    }
    if (result) {
      bcrypt.compare(inputtedPassword, result.password, (err, response) => {
        if (err) {
          console.log(err.message);
          res.json({
            status: "Error",
            message: "No user found using this email and password.",
          });
        }
        if (response) {
          res.json({ status: "ok", message: "logged in." });
        } else {
          res.json({ status: "error", message: "User not found." });
        }
      });
    } else {
      res.json({ status: "error", message: "User not found." });
    }
  });
});

module.exports = router;

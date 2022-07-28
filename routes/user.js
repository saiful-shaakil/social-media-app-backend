const express = require("express");
const router = express.Router();
const UserSchema = require("../models/User");
const bcrypt = require("bcryptjs");
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
  } catch (error) {
    if (error.code === 1100);
    return res.json({ status: "Error", error: "Email is already used." });
  }
});

module.exports = router;

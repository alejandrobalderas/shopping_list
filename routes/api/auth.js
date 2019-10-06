const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("dotenv").config().parsed;
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

// Item Model
const User = require("../../models/User");

// @route POST api/auth
// @desc Register new user
// @access Public
router.post("/", (req, res) => {
  const { name, password } = req.body;

  // Simple validation
  if (!name || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing user
  User.findOne({ name }).then(user => {
    if (!user) {
      return res.status(400).json({ msg: "User does not exists" });
    }
    // Validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
      jwt.sign(
        { id: user.id },
        config.JWTSECRET,
        {
          expiresIn: 10000
        },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email
            }
          });
        }
      );
    });
  });
});

// @route GET api/auth/user
// @desc Get user data
// @access Private
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user));
});

module.exports = router;
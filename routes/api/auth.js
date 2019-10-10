const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("dotenv").config().parsed;
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

// Item Model
const User = require("../../models/User");

// @route POST api/auth
// @desc Login user
// @access Public
router.post("/", (req, res) => {
  const { username, password } = req.body;

  // Simple validation
  if (!username || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  // Check for existing user
  User.findOne({ username })
    .then(user => {
      if (!username) {
        return res.status(400).json({ msg: "User does not exists" });
      }
      // Validate password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (!isMatch)
          return res.status(400).json({ msg: "Invalid credentials" });
        jwt.sign(
          { id: user.id },
          config.JWTSECRET,
          {
            // expiresIn: 10000
          },
          (err, token) => {
            if (err) throw err;
            res.json({
              token,
              user: {
                id: user.id,
                username: user.username,
                email: user.email
              }
            });
          }
        );
      });
    })
    .catch(err => console.log(err));
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

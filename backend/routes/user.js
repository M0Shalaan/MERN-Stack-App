const express = require("express");
const rateLimit = require("express-rate-limit");

// controller functions
const { loginUser, signupUser } = require("../controllers/userController");

// rate limiter for login route
const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // Limit each IP to 5 requests per windowMs
  message: "Too many login attempts from this IP, please try again after a minute",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const router = express.Router();

// login route
router.post("/login", loginLimiter, loginUser);

// signup route
router.post("/signup", signupUser);

module.exports = router;




const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const loginLimiter = require("../middlewares/auth.middleware.js");

const loginController = (req, res) => {
  const { username, password } = req.body;

  if (username === "tung" && password === "tung123") {
    const payload = {
      userId: "64a7c9f8e4b0",
      role: "user",
    };

    const accessSecret = process.env.JWT_ACCESS_SECRET;
    const refreshSecret = process.env.JWT_REFRESH_SECRET;

    const accessToken = jwt.sign(payload, accessSecret, {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
    });

    const refreshToken = jwt.sign(payload, refreshSecret, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
    });

    return res.status(200).json({
      status: 200,
      message: "LOGIN_SUCCESSFUL",
      data: {
        accessToken: `Bearer ${accessToken}`,
        refreshToken: `Bearer ${refreshToken}`,
      },
    });
  }

  return res.status(401).json({
    status: 401,
    message: "Sai tài khoản hoặc mật khẩu",
  });
};

router.post("/login", loginLimiter, loginController);

module.exports = router;

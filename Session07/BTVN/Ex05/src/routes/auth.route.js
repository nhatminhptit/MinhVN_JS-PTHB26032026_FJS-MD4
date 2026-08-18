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

const refreshTokenController = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({
      status: 401,
      message: "REFRESH_TOKEN_REQUIRED",
    });
  }

  const tokenString = refreshToken.startsWith("Bearer ")
    ? refreshToken.split(" ")[1]
    : refreshToken;

  try {
    const refreshSecret = process.env.JWT_REFRESH_SECRET;
    const decoded = jwt.verify(tokenString, refreshSecret);

    const payload = {
      userId: decoded.userId,
      role: decoded.role,
    };

    const accessSecret = process.env.JWT_ACCESS_SECRET;
    const newAccessToken = jwt.sign(payload, accessSecret, {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
    });

    return res.status(200).json({
      status: 200,
      message: "SUCCESS",
      data: {
        accessToken: `Bearer ${newAccessToken}`,
      },
    });
  } catch (error) {
    return res.status(403).json({
      status: 403,
      message: "INVALID_OR_EXPIRED_REFRESH_TOKEN",
    });
  }
};

router.post("/login", loginLimiter, loginController);
router.post("/refresh-token", refreshTokenController);

module.exports = router;

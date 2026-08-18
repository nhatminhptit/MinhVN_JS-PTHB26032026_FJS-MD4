const express = require("express");
const router = express.Router();
const loginLimiter = require("../middlewares/auth.middleware.js");

const loginController = (req, res) => {
  res.json({ message: "Đăng nhập thành công" });
};

router.post("/login", loginLimiter, loginController);

module.exports = router;

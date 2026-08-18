const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken.middleware.js");

const userController = (req, res) => {
  console.log("ID của user đang truy cập:", req.user.userId);

  res.status(200).json({
    status: 200,
    message: "Lấy danh sách người dùng thành công",
    data: [
      { id: 1, name: "Admin" },
      { id: 2, name: "User" },
    ],
  });
};

router.get("/", verifyToken, userController);

module.exports = router;

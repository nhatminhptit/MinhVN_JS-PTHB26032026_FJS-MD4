const express = require("express");
const orders = require("./data/orders");

const app = express();
const PORT = 3000;

const validUserIds = [1, 2, 3];

app.get("/api/v1/users/:userId/orders", (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const { status, limit } = req.query;

  if (!validUserIds.includes(userId)) {
    return res.status(404).json({
      success: false,
      code: "USER_NOT_FOUND",
      message: "Không tìm thấy người dùng này.",
    });
  }

  let userOrders = orders.filter((order) => order.userId === userId);

  if (status) {
    userOrders = userOrders.filter((order) => order.status === status);
  }

  const parsedLimit = limit ? parseInt(limit, 10) : 5;
  const paginatedOrders = userOrders.slice(0, parsedLimit);

  res.json({
    success: true,
    data: paginatedOrders,
    meta: {
      total: userOrders.length, 
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});

const express = require("express");
const AppError = require("./utils/AppError");

const app = express();
app.use(express.json());

const users = [{ id: 1, name: "Nguyen Van A", email: "a@gmail.com" }];

app.get("/users/secret", (req, res, next) => {
  if (!req.headers.authorization) {
    return next(new AppError("Chưa xác thực", 401));
  }
  res.json({ success: true, message: "Truy cập thành công" });
});

app.get("/users/:id", (req, res, next) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    return next(new AppError("Không tìm thấy user", 404));
  }
  res.json({ success: true, data: user });
});

app.post("/users", (req, res, next) => {
  if (!req.body.email) {
    return next(new AppError("Thiếu trường email", 400));
  }
  const newUser = {
    id: users.length + 1,
    email: req.body.email,
    name: req.body.name || "Unknown",
  };
  users.push(newUser);
  res.status(201).json({ success: true, data: newUser });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message,
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

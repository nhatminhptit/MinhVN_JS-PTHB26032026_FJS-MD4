const express = require("express");
const multer = require("multer");
const employeeRoutes = require("./routes/employeeRoutes");
const AppError = require("./utils/AppError");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use("/api/employees", employeeRoutes);

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      err = new AppError("File vượt quá dung lượng tối đa (2MB)", 400);
    } else {
      err = new AppError(err.message, 400);
    }
  }

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

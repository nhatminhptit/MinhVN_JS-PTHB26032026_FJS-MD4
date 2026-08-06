const express = require("express");
const multer = require("multer");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const AppError = require("./utils/AppError");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      err = new AppError("File vượt quá dung lượng cho phép (2MB)", 400);
    } else {
      err = new AppError(err.message, 400);
    }
  }

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Lỗi server",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

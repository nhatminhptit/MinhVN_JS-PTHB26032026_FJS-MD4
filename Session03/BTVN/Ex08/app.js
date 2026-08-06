const express = require("express");
const multer = require("multer");
const fs = require("fs");

const app = express();

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("INVALID_TYPE"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: fileFilter,
});

app.post("/upload/avatar", (req, res) => {
  const uploadAvatar = upload.single("avatar");

  uploadAvatar(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res
          .status(400)
          .json({ message: "File vượt quá dung lượng cho phép (2MB)" });
      }
      return res.status(400).json({ message: err.message });
    } else if (err) {
      if (err.message === "INVALID_TYPE") {
        return res
          .status(400)
          .json({ message: "Chỉ chấp nhận file ảnh JPEG/PNG/WEBP" });
      }
      return res.status(500).json({ message: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Vui lòng đính kèm file" });
    }

    res.json({
      message: "Upload thành công",
      filename: req.file.filename,
      size: req.file.size,
    });
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

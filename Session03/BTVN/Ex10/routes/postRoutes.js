const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const { authenticate, authorize } = require("../middlewares/auth");
const upload = require("../middlewares/upload");

router.get("/", postController.getAllPosts);
router.post("/", upload.single("thumbnail"), postController.createPost);
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  postController.deletePost,
);

module.exports = router;

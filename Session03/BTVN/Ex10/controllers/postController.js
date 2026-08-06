const Post = require("../models/Post");
const Comment = require("../models/Comment");
const AppError = require("../utils/AppError");

const getAllPosts = (req, res, next) => {
  try {
    const data = Post.getAll();
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const createPost = (req, res, next) => {
  try {
    const { title, content } = req.body;
    let thumbnailUrl = null;
    if (req.file) {
      thumbnailUrl = `/uploads/${req.file.filename}`;
    }

    const newPost = Post.create({ title, content, thumbnailUrl });
    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    next(error);
  }
};

const deletePost = (req, res, next) => {
  try {
    const postId = req.params.id;
    const deleted = Post.deleteById(postId);

    if (!deleted) {
      throw new AppError("Không tìm thấy bài viết", 404);
    }

    Comment.deleteByPostId(postId);

    res.json({
      success: true,
      message: "Xóa bài viết và các comment liên quan thành công",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPosts,
  createPost,
  deletePost,
};

const express = require("express");
const {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", protect, adminOnly, createBlog);
router.get("/", getBlogs);
router.get("/:id", getBlogById);
router.put("/:id", protect, adminOnly, updateBlog);
router.delete("/:id", protect, adminOnly, deleteBlog);

module.exports = router;

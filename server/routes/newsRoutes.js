const express = require("express");
const {
  createNews,
  getNews,
  getNewsById,
  updateNews,
  deleteNews,
} = require("../controllers/newsController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", protect, adminOnly, createNews);
router.get("/", getNews);
router.get("/:id", getNewsById);
router.put("/:id", protect, adminOnly, updateNews);
router.delete("/:id", protect, adminOnly, deleteNews);

module.exports = router;

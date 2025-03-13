const express = require("express");
const {
  getProfile,
  updateProfile,
  listUsers,
  deleteUser,
  banUser,
} = require("../controllers/userController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/me", protect, getProfile);
router.put("/update", protect, updateProfile);
router.get("/", protect, adminOnly, listUsers);
router.delete("/:id", protect, adminOnly, deleteUser);
router.patch("/ban/:id", protect, adminOnly, banUser);

module.exports = router;

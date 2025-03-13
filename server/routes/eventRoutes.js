const express = require("express");
const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  registerForEvent,
} = require("../controllers/eventController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", protect, adminOnly, createEvent);
router.get("/", getEvents);
router.get("/:id", getEventById);
router.put("/:id", protect, adminOnly, updateEvent);
router.delete("/:id", protect, adminOnly, deleteEvent);
router.post("/register/:id", protect, registerForEvent);

module.exports = router;

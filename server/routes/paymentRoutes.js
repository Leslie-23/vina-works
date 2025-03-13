const express = require("express");
const {
  initializePayment,
  verifyPayment,
  handleWebhook,
} = require("../controllers/paymentController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/initialize", protect, initializePayment);
router.get("/verify/:reference", protect, verifyPayment);
router.post("/webhook", handleWebhook); // No auth needed (Paystack sends data)

module.exports = router;

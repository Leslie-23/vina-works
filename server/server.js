require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const newsRoutes = require("./routes/newsRoutes");
const eventRoutes = require("./routes/eventRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })); // 100 requests per 15 mins

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/payments", paymentRoutes);

// home route
app.get("/", (req, res) => {
  res.json({
    message: "API is running",
    version: "1.0.0",
    owner: "Valuable women",
    createdBy: "Leslie-23",
    contact: "https://github.com/Leslie-23/vina",
    license: "MIT",
    apiDocs: "https://still-to-come",
    frontend: "https://github.com/Leslie-23/vina/client",
    backend: "https://github.com/Leslie-23/vina/server",
    status: "under development",
  });
});
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

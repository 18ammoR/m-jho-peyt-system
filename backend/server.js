const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Core middleware
app.use(cors());
app.use(express.json());

// Logging middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};
app.use(logger);

// Routes
const taskRoutes = require("./routes/tasks");
app.use("/api/tasks", taskRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Backend running ✅");
});

// Error handling middleware (must be AFTER routes)
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Server error" });
};
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
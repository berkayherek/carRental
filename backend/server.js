require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

// Import routes
const authRoutes = require("./routes/authRoutes");
const carRoutes = require("./routes/carRoutes");
const officeRoutes = require("./routes/officeRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5000", credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/offices", officeRoutes);
app.use("/api/bookings", bookingRoutes);

// Serve Frontend (React Build)
app.use(express.static(path.join(__dirname, "build"))); // ✅ Updated Path

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html")); // ✅ Updated Path
});

// Global Error Handling Middleware
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

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

// ✅ Fixed CORS Policy
app.use(cors({
<<<<<<< HEAD
    origin: 'https://carrental-1-eulj.onrender.com', // Replace with your frontend URL
    methods: ['GET', 'POST'],
    credentials: true,
  }));
=======
  origin: 'https://carrental-1-eulj.onrender.com', // Replace with your frontend URL
  methods: ['GET', 'POST'],
  credentials: true,
}));
>>>>>>> 5467314ce0cdf6a3d16ad79bc0137a7ec43c41b2

app.use(express.json());
app.use(morgan("dev"));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/offices", officeRoutes);
app.use("/api/bookings", bookingRoutes);

// ✅ Serve React Frontend (If deployed)
app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Global Error Handling Middleware
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

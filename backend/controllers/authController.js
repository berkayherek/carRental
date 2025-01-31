const bcrypt = require("bcryptjs"); // Use bcryptjs instead of bcrypt
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register User
const registerUser = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ email, password: hashedPassword, name });
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate email and password
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Return the expected structure
    res.status(200).json({
      session: { $id: token }, // Mock session ID
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { registerUser, loginUser }; // Export the functions
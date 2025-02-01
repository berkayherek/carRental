const { Client, Account, ID } = require("node-appwrite");
const jwt = require("jsonwebtoken");

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const account = new Account(client); // Add this line

// Register User
const registerUser = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    // Create a new user in Appwrite
    const user = await account.create(ID.unique(), email, password, name);

    // Generate JWT token (optional)
    const token = jwt.sign({ userId: user.$id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Return the user details
    res.status(201).json({
      user: { id: user.$id, name: user.name, email: user.email },
      token, // Include the JWT token if needed
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Registration failed", error: error.message });
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

    // Authenticate user with Appwrite
    const session = await account.createSession(email, password);

    // Generate JWT token (optional)
    const token = jwt.sign({ userId: session.userId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Return the session and user details
    res.status(200).json({
      session,
      user: { id: session.userId, email: session.email },
      token, // Include the JWT token if needed
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

module.exports = { registerUser, loginUser };
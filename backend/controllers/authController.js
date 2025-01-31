const authService = require("../services/authService");

exports.registerUser = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);
    
    // ✅ Ensure we return a valid user ID
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { session, user } = await authService.loginUser(email, password);
    
    // ✅ Ensure valid user ID (not too long)
    if (!user.$id || user.$id.length > 36) {
      throw new Error("Invalid user ID format.");
    }

    res.json({ message: "Login successful", session, user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

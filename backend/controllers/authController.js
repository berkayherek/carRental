const { Client, Account, Databases, ID } = require("node-appwrite");

const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const account = new Account(client);
const databases = new Databases(client);

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;
const COLLECTION_USERS = process.env.APPWRITE_COLLECTION_USERS;

// Register User
const registerUser = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    // Create a new user in Appwrite's authentication system
    const user = await account.create(ID.unique(), email, password, name);

    // Store the user in your custom database
    await databases.createDocument(DATABASE_ID, COLLECTION_USERS, ID.unique(), {
      appwriteUserId: user.$id, // Store Appwrite's userId
      name: user.name,
      email: user.email,
    });

    // Return the user details
    res.status(201).json({
      user: { id: user.$id, name: user.name, email: user.email },
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
      console.log("Received login request with:", { email, password }); // Log the request payload
  
      // Authenticate user with Appwrite
      const session = await account.createSession(email, password);
      console.log("Appwrite session created:", session); // Log the session
  
      // Fetch user details from your custom database
      const user = await databases.listDocuments(DATABASE_ID, COLLECTION_USERS, [
        `appwriteUserId=${session.userId}`,
      ]);
      console.log("User data from custom database:", user); // Log the user data
  
      // Return the session and user details
      res.status(200).json({
        session,
        user: user.documents[0], // Return user data from your custom database
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Login failed", error: error.message });
    }
  };

module.exports = { registerUser, loginUser };
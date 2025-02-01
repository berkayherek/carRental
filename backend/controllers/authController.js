const { Client, Account, Databases, ID } = require("node-appwrite");

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT) // Your Appwrite endpoint
  .setProject(process.env.APPWRITE_PROJECT_ID) // Your Appwrite project ID
  .setKey(process.env.APPWRITE_API_KEY); // Your Appwrite API key

const account = new Account(client);
const databases = new Databases(client);

// Load environment variables
const DATABASE_ID = process.env.APPWRITE_DATABASE_ID; // Your Appwrite database ID
const COLLECTION_USERS = process.env.APPWRITE_COLLECTION_USERS; // Your Appwrite users collection ID

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
    // Authenticate user with Appwrite
    const session = await account.createSession(email, password);

    // Fetch user details from your custom database
    const user = await databases.listDocuments(DATABASE_ID, COLLECTION_USERS, [
      `appwriteUserId=${session.userId}`,
    ]);

    // Log the response before sending it
    console.log("Backend response:", {
      session: {
        $id: session.$id,
        userId: session.userId,
      },
      user: user.documents[0],
    });

    // Return the session and user details
    res.status(200).json({
      session: {
        $id: session.$id,
        userId: session.userId,
      },
      user: user.documents[0], // Return user data from your custom database
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

module.exports = { registerUser, loginUser };
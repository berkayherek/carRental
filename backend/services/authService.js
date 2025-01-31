const { Client, Account, ID } = require("node-appwrite");

const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const account = new Account(client);

/**
 * Register a new user using Appwrite Authentication
 */
exports.registerUser = async ({ email, password, name }) => {
  try {
    // ✅ Ensure user ID is valid (max 36 chars)
    const user = await account.create(ID.unique(), email, password, name);
    return user;
  } catch (error) {
    throw new Error(error.message || "Registration failed");
  }
};

/**
 * Log in user using Appwrite Authentication
 */
exports.loginUser = async (email, password) => {
  try {
    // ✅ Create a session for authentication
    const session = await account.createSession(email, password);
    
    // ✅ Fetch user details to verify correct user ID
    const user = await account.get();
    
    return { session, user };
  } catch (error) {
    throw new Error(error.message || "Invalid email or password");
  }
};

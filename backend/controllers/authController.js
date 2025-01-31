const { Client, Databases, ID, Query } = require("node-appwrite");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 */
const registerUser = async (req, res) => {
    try {
        const { email, password, name, country, city, phone } = req.body;

        if (!email || !password || !name || !country || !city || !phone) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = ID.unique();

        // Create user in Appwrite
        const newUser = await databases.createDocument(
            process.env.APPWRITE_DATABASE_ID,
            process.env.APPWRITE_COLLECTION_USERS,
            userId,
            {
                email,
                password: hashedPassword, // Storing hashed password
                name,
                country,
                city,
                phone,
                created: new Date().toISOString(),
            }
        );

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ error: "Registration failed", details: error.message });
    }
};

/**
 * @route POST /api/auth/login
 * @desc Authenticate user and return token
 */
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Query Appwrite database for user
        const users = await databases.listDocuments(
            process.env.APPWRITE_DATABASE_ID,
            process.env.APPWRITE_COLLECTION_USERS,
            [Query.equal("email", email)]
        );

        if (users.total === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const user = users.documents[0];

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.$id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.json({ message: "Login successful", token, user });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Login failed", details: error.message });
    }
};

/**
 * @route GET /api/auth/me
 * @desc Get user details
 */
const getUser = async (req, res) => {
    try {
        const userId = req.user.userId; // Retrieved from JWT middleware

        const user = await databases.getDocument(
            process.env.APPWRITE_DATABASE_ID,
            process.env.APPWRITE_COLLECTION_USERS,
            userId
        );

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error("Get user error:", error);
        res.status(500).json({ error: "Failed to retrieve user", details: error.message });
    }
};

module.exports = { registerUser, loginUser, getUser };

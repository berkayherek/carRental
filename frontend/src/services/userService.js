import { Client, Account } from "appwrite";

const API_ENDPOINT = process.env.REACT_APP_APPWRITE_ENDPOINT;
const PROJECT_ID = process.env.REACT_APP_APPWRITE_PROJECT_ID;

const client = new Client().setEndpoint(API_ENDPOINT).setProject(PROJECT_ID);
const account = new Account(client);

// ✅ Get Logged-in User Info
export const getUser = async () => {
    try {
        const user = await account.get();
        return user;
    } catch (error) {
        console.error("❌ Get user error:", error.message);
        return null;
    }
};

// ✅ Logout User
export const logout = async () => {
    try {
        await account.deleteSession("current");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        console.log("✅ Logged out successfully.");
    } catch (error) {
        console.error("❌ Logout error:", error.message);
    }
};

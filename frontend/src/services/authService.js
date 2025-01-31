import { Client, Account, ID } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Update if using a self-hosted Appwrite
  .setProject("your-appwrite-project-id"); // Replace with your actual Appwrite Project ID

const account = new Account(client);

export const login = async (email, password) => {
  try {
    await account.createEmailSession(email, password);
    return await account.get();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const register = async (name, email, password) => {
  try {
    await account.create(ID.unique(), email, password, name);
    return await login(email, password);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const loginWithGoogle = async () => {
  try {
    await account.createOAuth2Session("google");
  } catch (error) {
    throw new Error(error.message);
  }
};

export const logout = async () => {
  try {
    await account.deleteSession("current");
  } catch (error) {
    throw new Error(error.message);
  }
};

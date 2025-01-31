const { databases, DATABASE_ID, COLLECTION_OFFICES } = require("../config/appwrite");

exports.getOffices = async (req, res) => {
  try {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_OFFICES);
    res.json(response.documents);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

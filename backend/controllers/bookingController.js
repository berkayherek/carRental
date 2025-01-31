const { databases, DATABASE_ID, COLLECTION_BOOKINGS, ID } = require("../config/appwrite");

exports.createBooking = async (req, res) => {
  try {
    const booking = await databases.createDocument(DATABASE_ID, COLLECTION_BOOKINGS, ID.unique(), req.body);
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_BOOKINGS, [Query.equal("userId", req.params.userId)]);
    res.json(response.documents);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

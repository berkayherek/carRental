const { databases, DATABASE_ID, COLLECTION_CARS } = require("../config/appwrite");
const { Query } = require("node-appwrite");

const searchCars = async (req, res) => {
  try {
    const { make, transmission, minPrice, maxPrice } = req.query;

    let filters = [];
    if (make) filters.push(Query.equal("make", make));
    if (transmission) filters.push(Query.equal("transmission", transmission));
    if (minPrice) filters.push(Query.greaterThanOrEqual("costPerDay", parseFloat(minPrice)));
    if (maxPrice) filters.push(Query.lessThanOrEqual("costPerDay", parseFloat(maxPrice)));

    const cars = await databases.listDocuments(DATABASE_ID, COLLECTION_CARS, filters);
    
    res.json({ results: cars.documents });
  } catch (error) {
    res.status(500).json({ error: "Car search failed", details: error.message });
  }
};

module.exports = { searchCars };

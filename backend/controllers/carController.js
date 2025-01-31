const { databases, DATABASE_ID, COLLECTION_CARS, ID } = require("../config/appwrite");

// ✅ Get all cars
const getCars = async (req, res) => {
    try {
        const cars = await databases.listDocuments(DATABASE_ID, COLLECTION_CARS);
        res.json(cars.documents);
    } catch (error) {
        console.error("Error fetching cars:", error);
        res.status(500).json({ error: "Failed to fetch cars." });
    }
};

// ✅ Create a car
const createCar = async (req, res) => {
    try {
        console.log("Received request to create car:", req.body);

        const { make, model, year, transmission, mileage, deposit, ageRequirement, costPerDay, rentalOfficeId, available } = req.body;

        if (!make || !model || !year || !transmission || !mileage || !deposit || !ageRequirement || !costPerDay || !rentalOfficeId || available === undefined) {
            console.log("Validation failed: Missing fields");
            return res.status(400).json({ error: "All fields are required." });
        }

        const newCar = await databases.createDocument(DATABASE_ID, COLLECTION_CARS, ID.unique(), {
            make,
            model,
            year: parseInt(year),
            transmission,
            mileage: parseInt(mileage),
            deposit: parseFloat(deposit),
            ageRequirement: parseInt(ageRequirement),
            costPerDay: parseFloat(costPerDay),
            rentalOfficeId,
            available: Boolean(available),
        });

        console.log("Car created successfully:", newCar);
        res.status(201).json(newCar);
    } catch (error) {
        console.error("Error creating car:", error);
        res.status(500).json({ error: "Failed to create car.", details: error.message });
    }
};

// ✅ Ensure functions are correctly exported
module.exports = { createCar, getCars };

require("dotenv").config();
const { Client, Databases } = require("node-appwrite");

// Initialize Appwrite Client
const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT) // Appwrite API Endpoint
  .setProject(process.env.APPWRITE_PROJECT_ID) // Project ID
  .setKey(process.env.APPWRITE_API_KEY); // API Key (Must have database permissions)

const databases = new Databases(client);
const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;

// Function to create a collection
async function createCollection(collectionId, name) {
  try {
    await databases.createCollection(DATABASE_ID, collectionId, name);
    console.log(`✅ Collection '${name}' created`);
  } catch (error) {
    console.error(`❌ Error creating collection '${name}':`, error.message);
  }
}

// Function to add attributes to a collection
async function addAttributes(collectionId, attributes) {
  for (const attr of attributes) {
    try {
      switch (attr.type) {
        case "string":
          await databases.createStringAttribute(DATABASE_ID, collectionId, attr.id, attr.size, attr.required);
          break;
        case "integer":
          await databases.createIntegerAttribute(DATABASE_ID, collectionId, attr.id, attr.required);
          break;
        case "float":
          await databases.createFloatAttribute(DATABASE_ID, collectionId, attr.id, attr.required);
          break;
        case "boolean":
          await databases.createBooleanAttribute(DATABASE_ID, collectionId, attr.id, attr.required);
          break;
        case "enum":
          await databases.createEnumAttribute(DATABASE_ID, collectionId, attr.id, attr.values, attr.required);
          break;
        default:
          console.error(`❌ Unsupported attribute type '${attr.type}' for '${attr.id}'`);
          continue;
      }
      console.log(`✅ Attribute '${attr.id}' added to ${collectionId}`);
    } catch (error) {
      console.error(`❌ Error adding attribute '${attr.id}':`, error.message);
    }
  }
}

// Function to create indexes
async function createIndexes(collectionId, indexes) {
  for (const index of indexes) {
    try {
      await databases.createIndex(DATABASE_ID, collectionId, index.id, index.type, index.attributes);
      console.log(`✅ Index '${index.id}' created in ${collectionId}`);
    } catch (error) {
      console.error(`❌ Error creating index '${index.id}':`, error.message);
    }
  }
}

// Main function to create database schema
async function setupDatabase() {
  try {
    console.log("🚀 Setting up database...");

    // Create Rental Offices Collection
    const RENTAL_OFFICES_ID = process.env.APPWRITE_COLLECTION_OFFICES;
    await createCollection(RENTAL_OFFICES_ID, "Rental Offices");
    await addAttributes(RENTAL_OFFICES_ID, [
      { id: "name", type: "string", size: 255, required: true },
      { id: "address", type: "string", size: 500, required: true },
      { id: "city", type: "string", size: 100, required: true },
      { id: "latitude", type: "float", required: true },
      { id: "longitude", type: "float", required: true },
      { id: "contactNumber", type: "string", size: 20, required: true },
      { id: "workingHours", type: "string", size: 100, required: true }
    ]);
    await createIndexes(RENTAL_OFFICES_ID, [{ id: "city_index", type: "key", attributes: ["city"] }]);

    // Create Cars Collection
    const CARS_ID = process.env.APPWRITE_COLLECTION_CARS;
    await createCollection(CARS_ID, "Cars");
    await addAttributes(CARS_ID, [
      { id: "make", type: "string", size: 100, required: true },
      { id: "model", type: "string", size: 100, required: true },
      { id: "year", type: "integer", required: true },
      { id: "transmission", type: "enum", values: ["Automatic", "Manual"], required: true },
      { id: "mileage", type: "integer", required: true },
      { id: "deposit", type: "float", required: true },
      { id: "ageRequirement", type: "integer", required: true },
      { id: "costPerDay", type: "float", required: true },
      { id: "rentalOfficeId", type: "string", size: 255, required: true },
      { id: "available", type: "boolean", required: true }
    ]);
    await createIndexes(CARS_ID, [
      { id: "rentalOffice_index", type: "key", attributes: ["rentalOfficeId"] },
      { id: "make_index", type: "key", attributes: ["make"] }
    ]);

    // Create Bookings Collection
    const BOOKINGS_ID = process.env.APPWRITE_COLLECTION_BOOKINGS;
    await createCollection(BOOKINGS_ID, "Bookings");
    await addAttributes(BOOKINGS_ID, [
      { id: "userId", type: "string", size: 255, required: true },
      { id: "carId", type: "string", size: 255, required: true },
      { id: "rentalOfficeId", type: "string", size: 255, required: true },
      { id: "startDate", type: "string", size: 20, required: true }, // Using string for date storage
      { id: "endDate", type: "string", size: 20, required: true },
      { id: "totalCost", type: "float", required: true },
      { id: "status", type: "enum", values: ["Pending", "Confirmed", "Cancelled"], required: true }
    ]);
    await createIndexes(BOOKINGS_ID, [
      { id: "user_index", type: "key", attributes: ["userId"] },
      { id: "car_index", type: "key", attributes: ["carId"] }
    ]);

    console.log("🚀 Database setup complete!");
  } catch (error) {
    console.error("❌ Error setting up database:", error.message);
  }
}

// Run the setup
setupDatabase();

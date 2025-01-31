import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { createBooking } from "../services/bookingService";
import axios from "axios";

const BookingForm = () => {
  const { user } = useContext(AuthContext);
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Fetch available cars from the database
  useEffect(() => {
    const fetchAvailableCars = async () => {
      try {
        const response = await axios.get("https://carrental-zbtl.onrender.com//api/cars");
        setCars(response.data);
      } catch (err) {
        setError("Failed to load available cars.");
      }
    };
    fetchAvailableCars();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCar || !startDate || !endDate) {
      setError("All fields are required!");
      return;
    }

    try {
      const bookingData = {
        userId: user.id, // ✅ User ID from AuthContext
        carId: selectedCar,
        startDate,
        endDate,
      };

      await createBooking(bookingData);
      setMessage("Booking successful!");
      setError("");
    } catch (err) {
      setError("Booking failed. Please try again.");
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded">
      <h2 className="text-lg font-semibold mb-2">Book a Car</h2>
      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-500">{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block text-gray-700">Select Car</label>
          <select
            className="w-full border p-2 rounded"
            value={selectedCar}
            onChange={(e) => setSelectedCar(e.target.value)}
            required
          >
            <option value="">Select a car</option>
            {cars.map((car) => (
              <option key={car.id} value={car.id}>
                {car.make} {car.model} - ${car.price}/day
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="block text-gray-700">Start Date</label>
          <input
            type="date"
            className="w-full border p-2 rounded"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-700">End Date</label>
          <input
            type="date"
            className="w-full border p-2 rounded"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Book Now
        </button>
      </form>
    </div>
  );
};

export default BookingForm;

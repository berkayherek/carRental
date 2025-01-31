import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Booking = () => {
  const [carId, setCarId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();

  const handleBooking = async () => {
    // Call API to book car (implement bookingService.js)
    navigate("/profile");
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Book a Car</h2>
      <div className="mb-4">
        <label className="block">Car ID</label>
        <input type="text" className="w-full p-2 border" value={carId} onChange={(e) => setCarId(e.target.value)} />
      </div>
      <div className="mb-4">
        <label className="block">Start Date</label>
        <input type="date" className="w-full p-2 border" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </div>
      <div className="mb-4">
        <label className="block">End Date</label>
        <input type="date" className="w-full p-2 border" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>
      <button className="bg-blue-500 text-white p-2 w-full" onClick={handleBooking}>Confirm Booking</button>
    </div>
  );
};

export default Booking;

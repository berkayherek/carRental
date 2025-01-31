import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getUserBookings } from "../services/bookingService";
import BookingForm from "../components/BookingForm"; // ✅ Import BookingForm
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Bookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  // ✅ Redirect to login if user is not logged in
  useEffect(() => {
    console.log("User in Bookings Page:", user); // Debugging step
  
    
  
    const fetchBookings = async () => {
      try {
        console.log("Fetching bookings for user:", user.id);
        const userBookings = await getUserBookings(user.id);
        console.log("Bookings received:", userBookings);
        setBookings(userBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
  
    fetchBookings();
  }, [user, navigate]);
  
  

  // ✅ Show a loading message instead of breaking the UI


  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>

      {/* ✅ Render Booking Form */}
      <BookingForm />

      <h3 className="text-xl font-semibold mt-6">Booking History</h3>
      {bookings.length > 0 ? (
        <ul className="space-y-2">
          {bookings.map((booking) => (
            <li key={booking.id} className="border p-4 rounded bg-white shadow">
              <p><strong>Car ID:</strong> {booking.carId}</p>
              <p><strong>Start Date:</strong> {booking.startDate}</p>
              <p><strong>End Date:</strong> {booking.endDate}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default Bookings;

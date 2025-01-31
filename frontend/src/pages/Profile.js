import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { getUserBookings } from "../services/bookingService";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const data = await getUserBookings(user.id);
      setBookings(data);
    };
    fetchBookings();
  }, [user.id]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <h3 className="text-xl font-semibold mt-6">Booking History</h3>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>{booking.carId} - {booking.startDate} to {booking.endDate}</li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Map from "../components/map";  // ✅ Correct if file is `Map.js`


import CarCard from "../components/CarCard";
import { fetchRentalOffices } from "../services/officeService";

const Home = () => {
  const [offices, setOffices] = useState([]);
  const [searchLocation, setSearchLocation] = useState({ lat: 41.0082, lng: 28.9784 });

  useEffect(() => {
    if (searchLocation.lat && searchLocation.lng) {
      fetchRentalOffices(searchLocation.lat, searchLocation.lng).then(setOffices);
    }
  }, [searchLocation]);

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.content}>
        <h2>Welcome to Car Rental</h2>
        <input
          type="text"
          placeholder="Search for a location..."
          style={styles.input}
          onBlur={(e) => {
            const [lat, lng] = e.target.value.split(",").map(parseFloat);
            setSearchLocation({ lat, lng });
          }}
        />
        <Map offices={offices} />
        <h3>Nearby Rental Offices</h3>
        <div style={styles.officeList}>
          {offices.length > 0 ? (
            offices.map((office) => <CarCard key={office.id} office={office} />)
          ) : (
            <p>No offices found nearby.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  content: {
    width: "80%",
    maxWidth: "1000px",
    marginTop: "1rem",
  },
  input: {
    padding: "0.5rem",
    marginBottom: "1rem",
    width: "100%",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },
  officeList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
  },
};

export default Home;

// src/components/CarCard.js
import React from "react";

const CarCard = ({ office }) => {
  return (
    <div style={styles.card}>
      <h3>{office.name}</h3>
      <p>{office.address}</p>
      <button style={styles.button}>View Details</button>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ddd",
    padding: "1rem",
    marginBottom: "1rem",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  button: {
    padding: "0.5rem 1rem",
    backgroundColor: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default CarCard;

import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <h1>Car Rental</h1>
      <div>
        <Link to="/" style={styles.links}>Home</Link>

        <Link to="/login" style={styles.links}>Login</Link>
        <Link to="/register" style={styles.links}>Register</Link>
        <Link to="/search" style={styles.links}>Search</Link>
      </div>
    </nav>
  );
};

// ✅ Ensure styles are defined inside the same file
const styles = {
  navbar: {
    width: "100%",
    backgroundColor: "#333",
    color: "white",
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "fixed", // Fix the navbar to top
    top: 0,
    left: 0,
    zIndex: 1000, // Ensure it stays above other elements
  },
  links: {
    display: "flex",
    gap: "1rem",
    textDecoration: "none",
    color: "white",
  },
};

export default Navbar;

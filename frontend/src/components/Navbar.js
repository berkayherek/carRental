import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../context/AuthContext";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const { t } = useTranslation();
  const { user, logout } = useContext(AuthContext);

  return (
    <nav style={styles.navbar}>
      {/* Left Side - Brand */}
      <div style={styles.brand}>
        <h2 style={styles.brandText}>{t("welcome")}</h2>
      </div>

      {/* Center - Navigation Links */}
      <div style={styles.navLinks}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/search" style={styles.link}>Search</Link>
        {user && <Link to="/bookings" style={styles.link}>Bookings</Link>}
      </div>

      {/* Right Side - Auth & Language Switcher */}
      <div style={styles.authSection}>
        <LanguageSwitcher />

        {/* Show Username & Logout if logged in */}
        {user ? (
          <div style={styles.userInfo}>
            <span style={styles.userName}>{user.name}</span>
            <button onClick={logout} style={styles.logoutButton}>Logout</button>
          </div>
        ) : (
          <>
            <Link to="/login" style={styles.authLink}>Login</Link>
            <Link to="/register" style={styles.authButton}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

// Updated Styles
const styles = {
  navbar: {
    width: "100%",
    backgroundColor: "#2c3e50", // Darker background for better contrast
    color: "white",
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1000,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Add shadow for depth
  },
  brand: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  brandText: {
    margin: 0, // Remove default margin for h2
  },
  navLinks: {
    display: "flex",
    gap: "2rem", // Increase gap for better spacing
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "1rem",
    padding: "0.5rem",
    transition: "color 0.3s ease", // Smooth hover effect
  },
  linkHover: {
    color: "#f0a500", // Highlight color on hover
  },
  authSection: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem", // Increase gap for better spacing
  },
  authLink: {
    textDecoration: "none",
    color: "#f0a500",
    fontSize: "1rem",
    padding: "0.5rem",
    transition: "color 0.3s ease", // Smooth hover effect
  },
  authButton: {
    textDecoration: "none",
    backgroundColor: "#f0a500",
    color: "black",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    fontWeight: "bold",
    transition: "background-color 0.3s ease", // Smooth hover effect
  },
  authButtonHover: {
    backgroundColor: "#e09400", // Darker shade on hover
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  userName: {
    color: "#f0a500",
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#e74c3c", // Red color for logout
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease", // Smooth hover effect
  },
  logoutButtonHover: {
    backgroundColor: "#c0392b", // Darker red on hover
  },
};

export default Navbar;

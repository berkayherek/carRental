import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../context/AuthContext";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const { t } = useTranslation();
  const { user, logout } = useContext(AuthContext); // ✅ Get user from context

  return (
    <nav style={styles.navbar}>
      {/* Left Side - Brand */}
      <div style={styles.brand}>
        <h2>{t("welcome")}</h2>
      </div>

      {/* Center - Navigation Links */}
      <div style={styles.navLinks}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/search" style={styles.link}>Search</Link>
        {user && <Link to="/bookings" style={styles.link}>Bookings</Link>} {/* ✅ Show only if logged in */}
      </div>

      {/* Right Side - Auth & Language Switcher */}
      <div style={styles.authSection}>
        <LanguageSwitcher />

        {/* ✅ Show Username & Logout if logged in */}
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

// ✅ Updated Styles
const styles = {
  navbar: {
    width: "100%",
    backgroundColor: "#222",
    color: "white",
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1000,
  },
  brand: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  navLinks: {
    display: "flex",
    gap: "1.5rem",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "1rem",
    padding: "0.5rem",
  },
  authSection: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  authLink: {
    textDecoration: "none",
    color: "#f0a500",
    fontSize: "1rem",
    padding: "0.5rem",
  },
  authButton: {
    textDecoration: "none",
    backgroundColor: "#f0a500",
    color: "black",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    fontWeight: "bold",
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
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Navbar;

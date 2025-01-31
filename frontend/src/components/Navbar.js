import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../context/AuthContext";
import LanguageSwitcher from "./LanguageSwitcher";
import { FaBars, FaTimes } from "react-icons/fa"; // Icons for mobile menu

const Navbar = () => {
  const { t } = useTranslation();
  const { user, logout } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav style={styles.navbar}>
      {/* Left Side - Brand */}
      <div style={styles.brand}>
        <h2 style={styles.brandText}>{t("welcome")}</h2>
      </div>

      {/* Mobile Menu Toggle Button */}
      <div style={styles.mobileMenuIcon} onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Center - Navigation Links */}
      <div
        style={{
          ...styles.navLinks,
          ...(isMobileMenuOpen ? styles.navLinksMobile : {}),
        }}
      >
        <Link to="/" style={styles.link} onClick={toggleMobileMenu}>
          Home
        </Link>
        <Link to="/search" style={styles.link} onClick={toggleMobileMenu}>
          Search
        </Link>
        {user && (
          <>
            <Link to="/bookings" style={styles.link} onClick={toggleMobileMenu}>
              Bookings
            </Link>
            <Link to="/profile" style={styles.link} onClick={toggleMobileMenu}>
              Profile
            </Link>
          </>
        )}
      </div>

      {/* Right Side - Auth & Language Switcher */}
      <div
        style={{
          ...styles.authSection,
          ...(isMobileMenuOpen ? styles.authSectionMobile : {}),
        }}
      >
        <LanguageSwitcher />

        {/* Show Username & Logout if logged in */}
        {user ? (
          <div style={styles.userInfo}>
            <span style={styles.userName}>{user.name}</span>
            <button onClick={logout} style={styles.logoutButton}>
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link to="/login" style={styles.authLink} onClick={toggleMobileMenu}>
              Login
            </Link>
            <Link
              to="/register"
              style={styles.authButton}
              onClick={toggleMobileMenu}
            >
              Sign Up
            </Link>
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
    backgroundColor: "#2c3e50",
    color: "white",
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1000,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  brand: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  brandText: {
    margin: 0,
  },
  navLinks: {
    display: "flex",
    gap: "2rem",
    alignItems: "center",
    transition: "all 0.3s ease",
  },
  navLinksMobile: {
    flexDirection: "column",
    position: "absolute",
    top: "100%",
    left: 0,
    width: "100%",
    backgroundColor: "#2c3e50",
    padding: "1rem",
    gap: "1rem",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "1rem",
    padding: "0.5rem",
    transition: "color 0.3s ease",
  },
  linkHover: {
    color: "#f0a500",
  },
  authSection: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
  },
  authSectionMobile: {
    flexDirection: "column",
    position: "absolute",
    top: "100%",
    right: 0,
    width: "100%",
    backgroundColor: "#2c3e50",
    padding: "1rem",
    gap: "1rem",
  },
  authLink: {
    textDecoration: "none",
    color: "#f0a500",
    fontSize: "1rem",
    padding: "0.5rem",
    transition: "color 0.3s ease",
  },
  authButton: {
    textDecoration: "none",
    backgroundColor: "#f0a500",
    color: "black",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
  },
  authButtonHover: {
    backgroundColor: "#e09400",
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
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  logoutButtonHover: {
    backgroundColor: "#c0392b",
  },
  mobileMenuIcon: {
    display: "none", // Hide by default
    fontSize: "1.5rem",
    cursor: "pointer",
  },
  // Media query for mobile responsiveness
  "@media (max-width: 768px)": {
    navLinks: {
      display: "none", // Hide nav links on mobile
    },
    authSection: {
      display: "none", // Hide auth section on mobile
    },
    mobileMenuIcon: {
      display: "block", // Show mobile menu icon
    },
  },
};

export default Navbar;
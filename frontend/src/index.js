import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // ✅ Keep AuthProvider here
import App from "./App";
import "./styles/global.css"; // Import Tailwind or global styles
import "leaflet/dist/leaflet.css";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter> {/* ✅ Keep only one Router here */}
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet"; // ✅ Import Leaflet
import "leaflet/dist/leaflet.css"; // ✅ Ensure Leaflet CSS is imported

// ✅ Fix missing marker images
const markerIcon = new L.Icon({
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const Map = ({ offices }) => {
    console.log("🗺️ Rendering offices on map:", offices);

    return (
        <div style={{ width: "100%", height: "500px", marginTop: "1rem", position: "relative" }}>
            <MapContainer 
                center={[38.44607, 27.173747]} 
                zoom={10} 
                style={{ width: "100%", height: "100%", borderRadius: "10px" }}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {Array.isArray(offices) && offices.length > 0 ? (
                    offices.map((office) => (
                        <Marker 
                            key={office.id} 
                            position={[office.latitude, office.longitude]}
                            icon={markerIcon} // ✅ Apply custom icon
                        >
                            <Popup>
                                <b>{office.name}</b> <br /> {office.address}
                            </Popup>
                        </Marker>
                    ))
                ) : (
                    console.log("⚠️ No valid offices to display on map.") 
                )}
            </MapContainer>
        </div>
    );
};

export default Map;

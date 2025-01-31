import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = ({ offices }) => {
    return (
      <div style={{ width: "100%", height: "400px", marginTop: "1rem", position: "relative" }}>
        <MapContainer
          center={[41.0082, 28.9784]}
          zoom={12}
          style={{ width: "100%", height: "100%", borderRadius: "10px" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {offices?.map((office) => (
            <Marker key={office.id} position={[office.lat, office.lng]}>
              <Popup>{office.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    );
  };
  
  // ✅ Ensure default export is correct
  export default Map;
  


import React, { useState } from "react";
import axios from "axios";

const SearchBar = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = async (e) => {
    setQuery(e.target.value);

    if (e.target.value.length > 2) {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${e.target.value}`
      );
      setSuggestions(response.data);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for a location..."
      />
      <ul>
        {suggestions.map((place) => (
          <li
            key={place.place_id}
            onClick={() => {
              setQuery(place.display_name);
              setSuggestions([]);
              onSelect({ lat: parseFloat(place.lat), lon: parseFloat(place.lon), name: place.display_name });
            }}
          >
            {place.display_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;

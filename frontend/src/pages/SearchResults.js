import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import CarCard from "../components/CarCard";
import { getCars } from "../services/carService";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [cars, setCars] = useState([]);
  const [filters, setFilters] = useState({ make: "", transmission: "", sort: "" });

  useEffect(() => {
    const fetchCars = async () => {
      const query = {
        office: searchParams.get("office"),
        date: searchParams.get("date"),
        transmission: filters.transmission,
        make: filters.make,
        sort: filters.sort,
      };
      const data = await getCars(query);
      setCars(data);
    };

    fetchCars();
  }, [searchParams, filters]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <select onChange={(e) => setFilters({ ...filters, make: e.target.value })} className="border p-2">
          <option value="">All Makes</option>
          <option value="Toyota">Toyota</option>
          <option value="BMW">BMW</option>
        </select>

        <select onChange={(e) => setFilters({ ...filters, transmission: e.target.value })} className="border p-2">
          <option value="">All Transmissions</option>
          <option value="Automatic">Automatic</option>
          <option value="Manual">Manual</option>
        </select>

        <select onChange={(e) => setFilters({ ...filters, sort: e.target.value })} className="border p-2">
          <option value="">Sort by</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {/* Car Results */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cars.length > 0 ? (
          cars.map((car) => <CarCard key={car.id} car={car} />)
        ) : (
          <p className="text-gray-500">No cars found. Try adjusting filters.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;

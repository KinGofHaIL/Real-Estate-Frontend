import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/Properties.css";

const Properties = ({ properties = [], search, setSearch }) => {
  useEffect(() => {
    console.log("Properties component mounted!");
    console.log("Received properties:", properties);
    console.log("Search Term:", search);
  }, [properties, search]);

  // Ensure search filter works correctly
  const filteredProperties = properties.filter(
    (property) =>
      property.title?.toLowerCase().includes(search.toLowerCase()) ||
      property.address?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="properties-container">
      <h1 className="text-3xl font-bold text-center mb-6">
        More Than 500+ Apartments For Rent
      </h1>

      {/* Search Bar */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search Location or Title"
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="search-button">Search</button>
      </div>

      <div className="property-grid">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => {
            // Ensure property ID is available (_id is commonly used in MongoDB)
            const propertyId = property.propertyId || property._id;
            if (!propertyId) {
              console.warn("Property missing ID:", property);
              return null;
            }

            return (
              <div key={propertyId} className="property-card">
                <div className="property-info">
                  <h2 className="property-title">{property.title || "No Title"}</h2>
                  <p className="property-location">📍 {property.address || "No Address"}</p>
                  <p className="property-price">💰 ${property.price || "N/A"}</p>
                  <Link to={`/property/${propertyId}`} className="view-button">
                    View Details
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500">No properties found.</p>
        )}
      </div>
    </div>
  );
};

export default Properties;

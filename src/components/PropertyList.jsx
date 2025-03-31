import { useEffect, useState } from "react";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/properties/get_properties") // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched properties:", data); // Log the fetched data
        setProperties(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading properties...</p>;
  }

  return (
    <div>
      <h2>🏡 Property Listings</h2>
      <div className="property-container">
        {properties.length > 0 ? (
          properties.map((property) => (
            <div key={property.propertyId} className="property-card">
              <img
                src={
                  property.image
                    ? `http://localhost:8000/uploads/${property.image}`
                    : "default.jpg"
                }
                alt={property.title}
                onError={(e) => {
                  e.target.src = "default.jpg"; // Fallback image
                }}
              />
              <h3>{property.title}</h3>
              <p>📍 {property.address}</p>
              <p>💰 ${property.price}</p>
              <p>🛏 {property.bedrooms} Beds | 🚿 {property.bathrooms} Baths</p>
              <p>Status: {property.status}</p>
            </div>
          ))
        ) : (
          <p>No properties found.</p>
        )}
      </div>
    </div>
  );
};

export default PropertyList;
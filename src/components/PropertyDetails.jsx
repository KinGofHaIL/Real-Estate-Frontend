import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/PropertyDetails.css"; // Import CSS

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // For redirection
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState("/images/image.png"); // Default image

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    axios.get(`http://localhost:8000/api/properties/get_property/${id}`)
      .then(response => {
        const propertyData = response.data;

        // Use a fallback if index-based image path isn't available
        const index = Math.floor(Math.random() * 4) + 1; // Get a random number between 1-4
        const imagePath = `/images/image${index}.png`;

        setProperty({ ...propertyData, image: imagePath });
        setImageSrc(imagePath);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching property:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading property details...</p>;
  if (!property) return <p>Property not found.</p>;

  return (
    <div className="property-details-container">
      <div className="property-details">
        {/* Display Property Image */}
        <img
          src={imageSrc}
          alt={property.title || "Property Image"}
          className="property-image"
          onError={() => setImageSrc("/images/image.png")} // Fallback in case of an error
        />

        <h2>{property.title}</h2>
        <p><strong>Address:</strong> {property.address}</p>
        <p><strong>City:</strong> {property.cityId}</p>
        <p><strong>Price:</strong> ${property.price.toLocaleString()}</p>
        <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
        <p><strong>Bathrooms:</strong> {property.bathrooms}</p>
        <p><strong>Status:</strong> {property.status}</p>

        {/* Call Now Button */}
        <button className="call-now-btn" onClick={() => navigate("/agents")}>
          📞 Call Now
        </button>
      </div>
    </div>
  );
};

export default PropertyDetails;

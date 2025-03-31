import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/PropertyDetails.css"; // Import CSS

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // For redirection
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    axios.get(`http://localhost:8000/api/properties/get_property/${id}`)
      .then(response => {
        setProperty(response.data);
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
        <h2>{property.title}</h2>
        <p><strong>Address:</strong> {property.address}</p>
        <p><strong>City:</strong> {property.cityId}</p>
        <p><strong>Price:</strong> ${property.price}</p>
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

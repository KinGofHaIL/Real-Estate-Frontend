import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Login from "./users/Login";
import Signup from "./users/Signup";
import About from "./components/About/About"; 
import Properties from "./components/Properties";
import PropertyDetails from "./components/PropertyDetails";
import Agents from "./components/Agents";
import "./styles.css";
import Dashboard from "./users/Dashboard";
import UserProfile from "./users/UserProfile"; 
import { AuthProvider } from "./AuthContext.jsx";

const App = () => {
  const [properties, setProperties] = useState([]);
  const [agents, setAgents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingAgents, setLoadingAgents] = useState(true);

  // Fetch Properties
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/properties/get_properties")
      .then((response) => {
        console.log("Fetched Properties:", response.data);
        
        // Ensure each property has a unique image
        const updatedProperties = response.data.map((property, index) => ({
          ...property,
          image: `/images/image${index + 1}.png` // Adjust image naming dynamically
        }));

        setProperties(updatedProperties);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
        setLoading(false);
      });
  }, []);

  // Fetch Agents
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/agents/agents")
      .then((response) => {
        console.log("Fetched Agents:", response.data);
        setAgents(response.data);
        setLoadingAgents(false);
      })
      .catch((error) => {
        console.error("Error fetching agents:", error);
        setLoadingAgents(false);
      });
  }, []);

  return (
    <Router>
      <div className="app-container bg-gray-50 min-h-screen font-sans text-gray-900">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<UserProfile />} />

          {/* Properties Page */}
          <Route 
            path="/properties" 
            element={
              loading ? 
                <p className="text-center mt-10">Loading properties...</p> 
                : <Properties properties={properties} search={search} setSearch={setSearch} />
            } 
          />

          {/* Property Details */}
          <Route path="/property/:id" element={<PropertyDetails />} />

          {/* Agents Page */}
          <Route 
            path="/agents" 
            element={
              loadingAgents ? 
                <p className="text-center mt-10">Loading agents...</p> 
                : <Agents agents={agents} />
            } 
          />

          {/* Homepage */}
          <Route
            path="/"
            element={
              <div className="main-content flex flex-col items-center justify-center text-center p-6">
                <div className="search-section w-full max-w-4xl bg-white p-8 rounded-lg shadow-xl">
                  <h1 className="text-5xl font-bold text-gray-800 mb-6">
                    Find Your New Modern Apartment
                  </h1>
                  
                  <div className="search-bar-container flex justify-center gap-4">
                    <input
                      type="text"
                      placeholder="Search Location or Title"
                      className="search-input w-full max-w-md p-4 border rounded-lg shadow-sm focus:ring focus:ring-indigo-400 text-lg"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="search-button px-5 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 text-lg">
                      Search
                    </button>
                  </div>
                </div>

                <div className="image-section mt-8">
                  <img
                    src="https://lumunge.github.io/Real-Estate-Website/static/media/landing.310c4201.jpg"
                    alt="Search Background"
                    className="search-image w-full max-w-5xl rounded-lg shadow-2xl border-4 border-gray-200"
                  />
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

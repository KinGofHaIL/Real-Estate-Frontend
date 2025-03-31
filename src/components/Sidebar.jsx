import React from "react";

const Sidebar = ({ isOpen, closeSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={closeSidebar}>✖</button>
      <ul>
        <li>Home</li>
        <li>Properties</li>
        <li>About Us</li>
        <li>Contact</li>
      </ul>
    </div>
  );
};

export default Sidebar;

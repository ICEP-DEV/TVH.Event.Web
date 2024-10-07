import React from "react";
import "../style/NavBar.css"; // Import your CSS for styling

const NavBar = () => {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <span className="organizer-label">
            <strong>Admin:</strong> Lethabo Molefe
          </span>
        </div>
        <div className="navbar-right">
          <a href="#home">Home</a>
          <a href="#contact">Contact</a>
          <a href="#about">About Us</a>
          <a href="#logout">Log out</a>
        </div>
      </nav>
    </>
  );
};

export default NavBar;

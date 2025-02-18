import React from 'react';
import "../style/AboutUs.css";
import NavBar from "../components/NavBar"; // Import NavBar component

export const AboutUs = () => {
  return (
    <>
      <NavBar />
      <div className="about-us-container" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", minHeight: "100vh" }}>
        <div className="info-box">
          <h1>About Us</h1>
          <p>
            <b>Welcome to the Hacktrack Event Management System!</b><br />
            We aim to simplify event management by offering robust tools for planning,<br />
            execution, and analytics, ensuring every event is a success.
          </p>

          <h2>Our Mission</h2>
          <p>
            To streamline event planning and provide an exceptional platform<br />
            for managing events, seminars, and workshops effortlessly.
          </p>

          <h2>Features</h2>
          
          <li style={{ listStyleType: "none", paddingLeft: 0 }}>
            <li>Streamlined event scheduling</li>
            <li>Participant management</li>
            <li>Customizable registration forms</li>
            <li>Real-time analytics</li>
            <li>Support for various event types</li>
          </li>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-dark text-white text-center py-3 mt-5">
        <p>&copy; 2024 Hacktrack Event Management System. All rights reserved.</p>
      </footer>
    </>
  );
};

export default AboutUs;

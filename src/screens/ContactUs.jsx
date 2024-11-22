import React from 'react';
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import "../style/ContactUs.css"; 

const ContactUS = () => {
  return (
    <div className="contact-page">
      {/* Render the NavBar */}
      <NavBar />
      
      <div className="contact-content">
        {/* Render the SideBar */}
        <SideBar />

        {/* Main Contact Form Section */}
        <div className="contact-container">
          <h2 className="contact-title">Contact Us</h2>
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" />
            </div>
            <div className="form-group">
              <label htmlFor="surname">Surname</label>
              <input type="text" id="surname" />
            </div>
            <div className="form-group">
              <label htmlFor="organization">Organization</label>
              <input type="text" id="organization" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message"></textarea>
            </div>
            <button type="submit" className="submit-button">Submit</button>
          </form>
        </div>
      </div>
      {/* Footer */}
        <footer className="bg-dark text-white text-center py-3 mt-5">
                <p>&copy; 2024 Hacktrack Event Management System. All rights reserved.</p>
            </footer>
    </div>
    
  );
};

export default ContactUS;

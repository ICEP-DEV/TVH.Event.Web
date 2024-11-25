import React, { useState } from 'react';
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import "../style/ContactUs.css";

const ContactUS = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // State to store form values
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); 
    setIsPopupVisible(true); 
  };

  const closePopup = () => {
    setIsPopupVisible(false); 

    // Clear the form values
    setName("");
    setSurname("");
    setOrganization("");
    setEmail("");
    setMessage("");
  };

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
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
              />
            </div>
            <div className="form-group">
              <label htmlFor="surname">Surname</label>
              <input 
                type="text" 
                id="surname" 
                value={surname} 
                onChange={(e) => setSurname(e.target.value)} 
              />
            </div>
            <div className="form-group">
              <label htmlFor="organization">Organization</label>
              <input 
                type="text" 
                id="organization" 
                value={organization} 
                onChange={(e) => setOrganization(e.target.value)} 
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea 
                id="message" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
              ></textarea>
            </div>
            <button type="submit" className="submit-button">Submit</button>
          </form>
        </div>
      </div>

      
      {isPopupVisible && (
        <div className="popup">
          <div className="popup-content">
            <p>Your message has been received. We will get back to you soon!</p>
            <button onClick={closePopup} className="close-popup-button">Close</button>
          </div>
        </div>
      )}

   
      <footer className="bg-dark text-white text-center py-3 mt-5">
        <p>&copy; 2024 Hacktrack Event Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ContactUS;

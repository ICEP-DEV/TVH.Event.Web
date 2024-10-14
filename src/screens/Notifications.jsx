import React, { useState } from "react";
import SideBar from "../components/SideBar";  // Importing the SideBar component
import NavBar from "../components/NavBar";    // Assuming NavBar is also in place
import "../style/Notifications.css";               // Importing the CSS for Notifications

const Notifications = () => {
  const [event, setEvent] = useState("");
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    alert("Message Sent!");
  };

  return (
    <div className="notifications-page">
      <NavBar />
      <div className="content">
        <SideBar />  {/* Sidebar is displayed on the left */}
        <div className="main">
          <h2>Event Notifications</h2>
          <div className="notification-form">
            <label>Choose Event Name:</label>
            <input
              type="text"
              value={event}
              onChange={(e) => setEvent(e.target.value)}
             
            />
            <label>Event Notification:</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
             
            />
            <button onClick={handleSendMessage}>Send Message</button>
          </div>

          <div className="my-notifications">
            <h3>My Event Notifications</h3>
            <div className="notification-box">
              <p>⏰ Reminder: GDSC Hackathon Starts Tomorrow!⚠️</p>
              <ul>
                <li>Be ready to code, collaborate, and compete!</li>
                <li>Event Date: Tomorrow at 1:00 PM</li>
                <li>Location: Santorini Convention Center</li>
                <li>
                  Make sure you have prepared! Check your project brief, tools,
                  and lineup. See you at the starting line! 🚀
                </li>
              </ul>
            </div>
            <div className="notification-box">
              <p>⏰ Reminder: GDSC Hackathon Starts Tomorrow!⚠️</p>
              <ul>
                <li>Be ready to code, collaborate, and compete!</li>
                <li>Event Date: Tomorrow at 1:00 PM</li>
                <li>Location: Santorini Convention Center</li>
                <li>
                  Make sure you have prepared! Check your project brief, tools,
                  and lineup. See you at the starting line! 🚀
                </li>
              </ul>
            </div>
            <div className="notification-box final-call">
              <p>📢 Final Call: Submit your project within the next hour!</p>
              <ul>
                <li>
                  Ensure everything is polished and good to go. Time's ticking ⏳!
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
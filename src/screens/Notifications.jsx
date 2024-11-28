import React, { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import axios from "axios"; // For API calls
import "../style/Notifications.css";

const Notifications = () => {
  const [event, setEvent] = useState("");
  const [message, setMessage] = useState("");
  const [notifications, setNotifications] = useState([]); // State to store notifications

  // Fetch notifications on component mount
  useEffect(() => {
    fetchNotifications();
  }, []);

  // Function to fetch all notifications from the API
  const fetchNotifications = async () => {
    try {
      const response = await axios.get("/notifications"); // Adjust URL based on your API structure
      setNotifications(response.data); // Update notifications state
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  // Function to handle sending a new message
  const handleSendMessage = async () => {
    try {
      const newNotification = {
        notification_id: Math.random().toString(36).substring(7), // Temporary unique ID
        attendee_id: "1", // Replace with actual attendee ID
        admin_id: "1", // Replace with actual admin ID
        organiser_id: "1", // Replace with actual organizer ID
        message: `${event}: ${message}`, // Combine event name and message
      };

      await axios.post("/", newNotification); // Adjust URL based on your API
      alert("Message Sent!");
      setEvent(""); // Reset event input
      setMessage(""); // Reset message input
      fetchNotifications(); // Refresh notifications list
    } catch (error) {
      console.error("Failed to send notification:", error);
      alert("Failed to send message");
    }
  };

  return (
    <div className="container-fluid m-0 p-0">
      <NavBar />
      <div className="d-flex">
        <SideBar />
        <div className="main">
          <h2>Event Notifications</h2>
          <div className="notification-form">
            <label>Choose Event Name:</label>
            <input
              type="text"
              value={event}
              onChange={(e) => setEvent(e.target.value)}
              placeholder="Enter event name"
            />
            <label>Event Notification:</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message"
            />
            <button onClick={handleSendMessage}>Send Message</button>
          </div>

          <div className="my-notifications">
            <h3>My Event Notifications</h3>
            {notifications.map((notification) => (
              <div className="notification-box" key={notification.notification_id}>
                <p>📢 {notification.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Notifications;

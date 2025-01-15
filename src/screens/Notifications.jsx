import React, { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import axios from "axios"; 
import "../style/Notifications.css";
import api from "../APIs/API";

const Notifications = () => {
  const [event, setEvent] = useState(""); 
  const [message, setMessage] = useState(""); 
  const [notifications, setNotifications] = useState([]); 
  const [events, setEvents] = useState([]); 
  const [filteredNotifications, setFilteredNotifications] = useState([]); 

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.post(`${api}event/fetchbyuser`, {
          type: localStorage.getItem("type"),
          user_id: localStorage.getItem("user_id"),
        });
        setEvents(response.data.results || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${api}notifications`);
        setNotifications(response.data || []);
        setFilteredNotifications(response.data || []); // Show all by default
        console.log("Notifications fetched:", response.data);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const handleEventFilter = (e) => {
    const selectedEvent = e.target.value;
    setEvent(selectedEvent);

    if (selectedEvent) {
      const filtered = notifications.filter(
        (notification) => notification.event_id === selectedEvent
      );
      setFilteredNotifications(filtered);
    } else {
      setFilteredNotifications(notifications); // Show all if no event selected
    }
  };

  const handleSendMessage = async () => {
  if (!event || !message) {
    alert("Please select an event and enter a message.");
    return;
  }

const newNotification = {
  admin_id: "1", 
  message: message,
  organiser_id: "1", 
  event_id: event, 
};

  console.log("Payload being sent:", newNotification);

 try {
  const response = await axios.post(`${api}notifications`, newNotification);
  alert(response.data.message || "Notification sent successfully!");
  
  // Add the new notification with the correct `event_id`
  setNotifications((prev) => [response.data.notification, ...prev]); 
  
  setEvent("");
  setMessage("");
} catch (error) {
  console.error("Failed to send notification:", error);
  alert(error.response?.data?.error || "Failed to send notification. Please try again.");
}
};


  return (
    <div className="container-fluid m-0 p-0">
      <NavBar />
      <div className="d-flex">
        <SideBar />
        <div className="main">
          <h2>Event Notifications</h2>

          <div className="col-3 d-flex mb-3">
            <select onChange={handleEventFilter} value={event} className="form-select">
              <option value="">-- Select an event --</option>
              {events.map((event) => (
                <option key={event.event_id} value={event.event_id}>
                  {event.title}
                </option>
              ))}
            </select>
          </div>

          <div className="notification-form mb-4">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your notification here..."
              className="form-control mb-2"
              rows="3"
            />
            <button onClick={handleSendMessage} className="btn btn-primary">
              Send Notification
            </button>
          </div>

          <div className="my-notifications">
            <h3>All Notifications</h3>
            {filteredNotifications.length === 0 ? (
              <p>No notifications available.</p>
            ) : (
              filteredNotifications.map((notification) => (
                <div className="notification-box" key={notification.notification_id}>
                  <p>📢 {notification.message}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Notifications;

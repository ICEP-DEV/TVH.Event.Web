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
  const [filteredNotifications, setFilteredNotifications] = useState([]); // New state for filtered notifications

 

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.post(`${api}event/fetchbyuser`, {
          type: localStorage.getItem("type"),
          user_id: localStorage.getItem("user_id"),
        });
        setEvents(response.data.results);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [api]);

  // Fetch notifications on component mount
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${api}notifications`); // Adjust URL based on your API structure
        setNotifications(response.data);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchNotifications();
  }, [api]);

  // Function to handle event filtering
  const handleEventFilter = (e) => {
    const selectedEvent = e.target.value;
    setEvent(selectedEvent); // Update selected event

    // Filter notifications for the selected event
    if (selectedEvent) {
      const filtered = notifications.filter(
        (notification) => notification.event_id === selectedEvent
      );
      setFilteredNotifications(filtered);
    } else {
      setFilteredNotifications([]);
    }
  };

  // Function to handle sending a new notification
  const handleSendMessage = async () => {
    if (!event || !message) {
      alert("Please select an event and enter a message.");
      return;
    }

    const newNotification = {
      notification_id: Math.random().toString(36).substring(7), // Temporary unique ID
      event_id: event, // The selected event ID
      message: `${message}`, // The message entered by the organizer
    };

    try {
      await axios.post(`${api}notifications`, newNotification); // Adjust API URL
      alert("Notification sent successfully!");

      // Update the notifications state to include the new notification
      setNotifications((prev) => [newNotification, ...prev]);

      // Update filtered notifications if the selected event matches
      if (newNotification.event_id === event) {
        setFilteredNotifications((prev) => [newNotification, ...prev]);
      }

      // Clear input fields
      setEvent("");
      setMessage("");
    } catch (error) {
      console.error("Failed to send notification:", error);
      alert("Failed to send notification. Please try again.");
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
            <h3>My Event Notifications</h3>
            {filteredNotifications.length === 0 ? (
              <p>No notifications for the selected event.</p>
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

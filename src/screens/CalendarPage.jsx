import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Calendar component styling
import "../style/CalendarPage.css"; // Custom styling
import SideBar from "../components/SideBar"; // Import SideBar component
import NavBar from "../components/NavBar"; // Import NavBar component

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([
    {
      id: 1,
      date: new Date(2024, 5, 18), // Month is zero-based, so 5 = June
      title: "Hackathon Event",
    },
  ]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  // Function to handle adding a new event
  const addEvent = (eventDate, title) => {
    const newEvent = {
      id: events.length + 1,
      date: eventDate,
      title: title,
    };
    setEvents([...events, newEvent]);
  };

  // Function to render events on the calendar
  const renderTileContent = ({ date, view }) => {
    if (view === "month") {
      const dayEvents = events.filter(
        (event) =>
          event.date.getDate() === date.getDate() &&
          event.date.getMonth() === date.getMonth() &&
          event.date.getFullYear() === date.getFullYear()
      );

      return dayEvents.map((event) => (
        <div key={event.id} className="event-indicator">
          {event.title}
        </div>
      ));
    }
  };

  useEffect(() => {
    // Add a new event as an example. You can replace this with actual user input logic.
    addEvent(new Date(2024, 5, 20), "Example Event");
  }, []);

  return (
    <div className="calendar-page">
      <SideBar /> {/* Render SideBar component */}
      <div className="main-content">
        <NavBar /> {/* Render NavBar component */}
        <h2 className="page-title">Calendar</h2>
        <Calendar
          onChange={handleDateChange}
          value={date}
          tileContent={renderTileContent}
          className="custom-calendar"
        />
      </div>
    </div>
  );
};

export default CalendarPage;

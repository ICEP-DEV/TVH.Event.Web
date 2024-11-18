import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; 
import "../style/CalendarPage.css"; // Custom styling
import SideBar from "../components/SideBar"; // Import SideBar component
import NavBar from "../components/NavBar"; // Import NavBar component
import Footer from "../components/Footer";
import axios from "axios";
import api from "../APIs/API";

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  useEffect(() => {
    const getAllEvents = async () => {
      try {
        const response = await axios.get(api + "event/all");
        setEvents(response.data.results);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    getAllEvents();
  }, []); 

  // Function to render events on the calendar
  const renderTileContent = ({ date, view }) => {
    if (view === "month") {
      const dayEvents = events.filter((event) => {
        const eventDate = new Date(event.start_date);
        return (
          eventDate.getDate() === date.getDate() &&
          eventDate.getMonth() === date.getMonth() &&
          eventDate.getFullYear() === date.getFullYear()
        );
      });

      return dayEvents.map((event) => (
        <div key={event.id} className="event-indicator">
          {event.title}
        </div>
      ));
    }
    return null; // Return null if no events
  };

  return (
    <div className="container-fluid">
      
      <div className="row">
        <SideBar />
        <div className="col d-flex flex-column">
          <NavBar />
          <h2 className="page-title" style={{alignSelf:"center"}}>Calendar</h2>
          <Calendar
            onChange={handleDateChange}
            value={date}
            tileContent={renderTileContent}
            className="custom-calendar"
          />
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default CalendarPage;

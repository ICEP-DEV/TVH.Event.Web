import React from "react";
import "../style/EventPage.css"; // Custom CSS for this page

// Import Components
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";

const EventPage = () => {
  const events = [
    {
      title: "GKHACK '24",
      location: "Sandton, JHB",
      date: "11 June 2025",
      description:
        "GKHack's hackathon is an exciting innovation event where developers, designers, and tech enthusiasts collaborate to build creative solutions to real-world challenges. Participants compete to develop the best projects within a limited time, fostering creativity, teamwork, and problem-solving skills.",
      image: "https://via.placeholder.com/400", // Replace with actual image URL
    },
    {
      title: "AWS hackathon",
      location: "Sandton, JHB",
      date: "11 June 2025",
      description:
        "AWS hackathon is a high-energy event where developers and tech enthusiasts collaborate to build creative solutions for real-world challenges in a limited time. The event encourages creativity, teamwork, and problem-solving.",
      image: "https://via.placeholder.com/400",
    },
    {
      title: "ALX hackathon",
      location: "Sandton, JHB",
      date: "11 June 2025",
      description:
        "ALX hackathon is an exciting innovation event where developers, designers, and tech enthusiasts collaborate to build creative solutions to real-world challenges.",
      image: "https://via.placeholder.com/400",
    },
  ];

  return (
    <>
      <NavBar />
      <div className="event-page-container row no-gutters">
        <SideBar />
        <div className="col-md-9 main-content">
          {/* Title */}
          <h2 className="event-title">
            More Event Options
            <div className="underline" style={{ marginLeft: "30%" }}></div>
          </h2>

          {/* Event Filters (My Events, All Events) */}
          <div className="event-filters d-flex justify-content-center">
            <button className="btn btn-light filter-btn">My Events</button>
            <button className="btn btn-light filter-btn">All Events</button>
          </div>

          {/* Event List */}
          <div className="event-list">
            {events.map((event, index) => (
              <div className="event-card" key={index}>
                <div className="event-image">
                  <img src={event.image} alt={event.title} />
                </div>
                <div className="event-details">
                  <h3>{event.title}</h3>
                  <p className="event-location-date">
                    {event.location} - {event.date}
                  </p>
                  <p className="event-description">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default EventPage;

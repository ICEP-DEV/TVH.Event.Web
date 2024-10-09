import React, { useState } from "react";
import axios from "axios";
import "../style/EventManagement.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";

const EventManagement = () => {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    time: "",
    location: "",
    start_date: "",
    end_date: "",
    category_id: "", // Assume category ID is provided for simplicity
  });
  const [poster, setPoster] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setPoster(e.target.files[0]);
  };

  // Create or save an event
  const handleSaveEvent = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", eventData.title);
      formData.append("description", eventData.description);
      formData.append("time", eventData.time);
      formData.append("location", eventData.location);
      formData.append("start_date", eventData.start_date);
      formData.append("end_date", eventData.end_date);
      formData.append("category_id", eventData.category_id);
      if (poster) formData.append("poster", poster); // Assuming backend supports poster upload

      const response = await axios.post(
        "http://localhost:3001/api/events/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Event created successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error saving event:", error);
      alert("Failed to create event. Please try again.");
    }
  };

  // Delete an event by ID
  const handleDeleteEvent = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/events/delete/${eventData.id}`
      );
      alert("Event deleted successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event. Please try again.");
    }
  };

  return (
    <>
      <NavBar />
      <div className="event-management-container">
        <SideBar />
        <div className="row no-gutters">
          <div className="col-md-9 main-content p-5">
            <header className="d-flex justify-content-between mb-4">
              <h1>Event Management</h1>
            </header>

            <div className="underline"></div>

            <div className="card p-4">
              <h3 className="mb-4">Hackathon Event Details</h3>
              <form onSubmit={handleSaveEvent}>
                <div className="form-group">
                  <label>Event Name:</label>
                  <input
                    type="text"
                    name="title"
                    value={eventData.title}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label>Event Description:</label>
                  <textarea
                    name="description"
                    value={eventData.description}
                    onChange={handleInputChange}
                    className="form-control"
                    rows="3"
                  ></textarea>
                </div>

                <div className="form-group">
                  <label>Time:</label>
                  <input
                    type="time"
                    name="time"
                    value={eventData.time}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label>Location:</label>
                  <input
                    type="text"
                    name="location"
                    value={eventData.location}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label>Start Date:</label>
                  <input
                    type="date"
                    name="start_date"
                    value={eventData.start_date}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label>End Date:</label>
                  <input
                    type="date"
                    name="end_date"
                    value={eventData.end_date}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label>Event Category:</label>
                  <input
                    type="text"
                    name="category_id"
                    value={eventData.category_id}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label>Event Poster:</label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="form-control-file"
                  />
                </div>

                <div className="buttons mt-4">
                  <button
                    type="button"
                    onClick={handleDeleteEvent}
                    className="btn btn-outline-danger mx-3"
                  >
                    Delete Event
                  </button>
                  <button type="submit" className="btn btn-success">
                    Save Event
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventManagement;

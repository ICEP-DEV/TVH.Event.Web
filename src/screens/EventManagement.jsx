import React from "react";
import "..//style/EventManagement.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";

const EventManagement = () => {
  return (
    <>
      <NavBar />
      <div className="event-management-container">
        {/* Sidebar */}
        <SideBar />
        <div className="row no-gutters">
          {/* Main Content */}
          <div className="col-md-9 main-content p-5">
            <header className="d-flex justify-content-between mb-4">
              <h1>Event Management</h1>
            </header>

            <div className="underline"></div>

            <div className="card p-4">
              <h3 className="mb-4">Hackathon Event Details</h3>
              <form>
                <div className="form-group">
                  <label>Event Name:</label>
                  <input type="text" className="form-control" />
                </div>

                <div className="form-group">
                  <label>Event Description:</label>
                  <textarea className="form-control" rows="3"></textarea>
                </div>

                <div className="form-group">
                  <label>Time:</label>
                  <input type="time" className="form-control" />
                </div>

                <div className="form-group">
                  <label>Location:</label>
                  <input type="text" className="form-control" />
                </div>

                <div className="form-group">
                  <label>Start Date:</label>
                  <input type="date" className="form-control" />
                </div>

                <div className="form-group">
                  <label>End Date:</label>
                  <input type="date" className="form-control" />
                </div>

                <div className="form-group">
                  <label>Event Category:</label>
                  <input type="text" className="form-control" />
                </div>

                <div className="form-group">
                  <label>Event Poster:</label>
                  <input type="file" className="form-control-file" />
                </div>

                <div className="buttons mt-4">
                  <button type="button" className="btn btn-outline-primary">
                    Upload Event
                  </button>
                  <button type="button" className="btn btn-outline-danger mx-3">
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

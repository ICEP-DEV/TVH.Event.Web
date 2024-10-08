import React from "react";
import '../style/SideBar.css';

const SideBar = () => {
    return (
      <>
        <div className="col-md-3 sidebar text-white p-4" id="column">
          <h3 className="sidebar-title mb-4">Tshwane Varsity Hackathon</h3>
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                Events
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                Users
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                Notifications
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                Calendar
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                Registration Forms
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                Feedback & Reviews
              </a>
            </li>
          </ul>
        </div>
      </>
    );
};

export default SideBar;
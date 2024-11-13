import React, { useState } from "react";
import "../style/UserDetails.css"; // Custom CSS for this page

// Import Components
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";

const UserDetails = () => {
  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
    organization: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Details:", user);
    // Add further functionality for form submission here
  };

  return (
    <>
      <NavBar />
      <div className="user-details-page row no-gutters">
        <SideBar />
        <div className="col-md-9 main-content">
          <h2 className="form-title">
            Users Details
            <div className="underline" style={{ marginLeft: "40%" }}></div>
          </h2>
          <p className="form-subtitle">Fill In The User Details Below</p>

          <form className="user-details-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Surname:</label>
              <input
                type="text"
                name="surname"
                value={user.surname}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Organization:</label>
              <input
                type="text"
                name="organization"
                value={user.organization}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Role:</label>
              <select
                name="role"
                value={user.role}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Organizer">Organizer</option>
              </select>
            </div>

            <button type="submit" className="add-user-btn">
              Add User
            </button>
          </form>
        </div>
        {/* Footer */}
        <footer className="bg-dark text-white text-center py-3 mt-5">
                <p>&copy; 2024 Hacktrack Event Management System. All rights reserved.</p>
            </footer>
      </div>
    </>
  );
};

export default UserDetails;

import React, { useState } from "react";
import "../style/ManagedOrganizers.css"; // Custom CSS for this page

// Import Components
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import { FaTrashAlt, FaEdit } from "react-icons/fa"; // Import delete and edit icons

const ManagedOrganizers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedOrganizers, setSelectedOrganizers] = useState([]);

const organizers = [
  {
    id: 1,
    name: "Lethabo",
    surname: "Molefe",
    email: "lethabo@example.com",
    password: "password123",
    organization: "TUT",
  },
  {
    id: 2,
    name: "Chun",
    surname: "Lee",
    email: "chun@example.com",
    password: "password123",
    organization: "GKHack",
  },
  {
    id: 3,
    name: "John",
    surname: "Doe",
    email: "john@example.com",
    password: "password123",
    organization: "XYZ",
  },
  {
    id: 4,
    name: "Amara",
    surname: "Nkosi",
    email: "amara@example.com",
    password: "password123",
    organization: "GKHack",
  },
  {
    id: 5,
    name: "Carlos",
    surname: "Ramirez",
    email: "carlos@example.com",
    password: "password123",
    organization: "XYZ",
  },
  {
    id: 6,
    name: "Samantha",
    surname: "Brown",
    email: "samantha@example.com",
    password: "password123",
    organization: "TUT",
  },
  {
    id: 7,
    name: "Raj",
    surname: "Patel",
    email: "raj@example.com",
    password: "password123",
    organization: "GKHack",
  },
  {
    id: 8,
    name: "Fatima",
    surname: "Hassan",
    email: "fatima@example.com",
    password: "password123",
    organization: "TUT",
  },
  {
    id: 9,
    name: "Liam",
    surname: "Anderson",
    email: "liam@example.com",
    password: "password123",
    organization: "XYZ",
  },
  {
    id: 10,
    name: "Chen",
    surname: "Wang",
    email: "chen@example.com",
    password: "password123",
    organization: "GKHack",
  },
];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleCheckboxChange = (id) => {
    if (selectedOrganizers.includes(id)) {
      setSelectedOrganizers(
        selectedOrganizers.filter((organizerId) => organizerId !== id)
      );
    } else {
      setSelectedOrganizers([...selectedOrganizers, id]);
    }
  };

  const handleDeleteSelected = () => {
    const remainingOrganizers = organizers.filter(
      (organizer) => !selectedOrganizers.includes(organizer.id)
    );
    console.log("Deleted selected organizers: ", selectedOrganizers);
    console.log("Remaining organizers: ", remainingOrganizers);
    setSelectedOrganizers([]); // Clear selection after deletion
  };

  const handleDeleteSingle = (id) => {
    const remainingOrganizers = organizers.filter(
      (organizer) => organizer.id !== id
    );
    console.log("Deleted organizer with ID: ", id);
    console.log("Remaining organizers: ", remainingOrganizers);
  };

  const handleEdit = (id) => {
    console.log("Edit organizer with ID: ", id);
    // Add logic to open an edit modal or navigate to an edit page
  };

  return (
    <div className="container-fluid">
      <NavBar />
      <div className="row">
        <SideBar />
        <div className="col">
          <h2 className="page-title">
            Managed Organizers
          </h2>

          <div className="search-bar-section">
            <input
              type="text"
              placeholder="Search organizers..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-bar"
            />
            <select
              value={filter}
              onChange={handleFilterChange}
              className="filter-dropdown"
            >
              <option value="All">All</option>
              <option value="TUT">TUT</option>
              <option value="GKHack">GKHack</option>
              <option value="XYZ">XYZ</option>
              {/* Add more filter options as needed */}
            </select>
            <button className="btn add-btn">Add Users</button>
            {selectedOrganizers.length > 0 && (
              <button className="btn delete-btn" onClick={handleDeleteSelected}>
                Delete Selected
              </button>
            )}
          </div>

          <table className="organizers-table">
            <thead>
              <tr>
                <th>Select</th>
                <th>ID</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Email</th>
                <th>Password</th>
                <th>Organization</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {organizers
                .filter(
                  (organizer) =>
                    filter === "All" || organizer.organization === filter
                )
                .filter(
                  (organizer) =>
                    organizer.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    organizer.surname
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                )
                .map((organizer) => (
                  <tr key={organizer.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedOrganizers.includes(organizer.id)}
                        onChange={() => handleCheckboxChange(organizer.id)}
                      />
                    </td>
                    <td>{organizer.id}</td>
                    <td>{organizer.name}</td>
                    <td>{organizer.surname}</td>
                    <td>{organizer.email}</td>
                    <td>{organizer.password}</td>
                    <td>{organizer.organization}</td>
                    <td>
                      <FaEdit
                        className="edit-icon"
                        onClick={() => handleEdit(organizer.id)}
                        style={{
                          color: "blue",
                          cursor: "pointer",
                          marginRight: "10px",
                        }}
                      />
                      <FaTrashAlt
                        className="delete-icon"
                        onClick={() => handleDeleteSingle(organizer.id)}
                        style={{ color: "red", cursor: "pointer" }}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-5">
                <p>&copy; 2024 Hacktrack Event Management System. All rights reserved.</p>
            </footer>
    </div>
  );
};

export default ManagedOrganizers;

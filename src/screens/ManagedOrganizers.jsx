import React, { useState } from "react";
import "../style/ManagedOrganizers.css";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import Footer from "../components/Footer";

const ManagedOrganizers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedOrganizers, setSelectedOrganizers] = useState([]);
  const [organizers, setOrganizers] = useState([
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
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newOrganizer, setNewOrganizer] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    organization: "",
  });

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleFilterChange = (e) => setFilter(e.target.value);

  const handleCheckboxChange = (id) => {
    setSelectedOrganizers((prev) =>
      prev.includes(id)
        ? prev.filter((organizerId) => organizerId !== id)
        : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    setOrganizers((prev) =>
      prev.filter((organizer) => !selectedOrganizers.includes(organizer.id))
    );
    setSelectedOrganizers([]);
  };

  const handleDeleteSingle = (id) => {
    setOrganizers((prev) => prev.filter((organizer) => organizer.id !== id));
  };

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  const handleInputChange = (e, id, field) => {
    const { value } = e.target;
    setOrganizers((prev) =>
      prev.map((organizer) =>
        organizer.id === id ? { ...organizer, [field]: value } : organizer
      )
    );
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const newId = organizers.length + 1;
    const organizerToAdd = { ...newOrganizer, id: newId };
    setOrganizers((prev) => [...prev, organizerToAdd]);
    setNewOrganizer({
      name: "",
      surname: "",
      email: "",
      password: "",
      organization: "",
    });
    toggleModal();
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <SideBar />
        <div className="col">
          <h2 className="page-title">Managed Organizers</h2>
          <div className="d-flex">
            <div className="col-3">
              <input
                type="text"
                placeholder="Search organizers..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="form-control"
              />
            </div>
            <div className="col-3 mx-5 d-flex pt-1">
              <select
                value={filter}
                onChange={handleFilterChange}
                className="form-select justify-self-center"
              >
                <option value="All">All</option>
                <option value="TUT">TUT</option>
                <option value="GKHack">GKHack</option>
                <option value="XYZ">XYZ</option>
              </select>
            </div>
            <button className="btn btn-success" onClick={toggleModal}>
              Add Users
            </button>
            {selectedOrganizers.length > 0 && (
              <button className="btn btn-danger ms-5" onClick={handleDeleteSelected}>
                Delete Selected
              </button>
            )}
          </div>
          <table className="table">
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
                    <td>
                      <input
                        type="text"
                        value={organizer.name}
                        onChange={(e) =>
                          handleInputChange(e, organizer.id, "name")
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={organizer.surname}
                        onChange={(e) =>
                          handleInputChange(e, organizer.id, "surname")
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="email"
                        value={organizer.email}
                        onChange={(e) =>
                          handleInputChange(e, organizer.id, "email")
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="password"
                        value={organizer.password}
                        onChange={(e) =>
                          handleInputChange(e, organizer.id, "password")
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={organizer.organization}
                        onChange={(e) =>
                          handleInputChange(e, organizer.id, "organization")
                        }
                      />
                    </td>
                    <td>
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
        {/* Footer */}
        <Footer />
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add Organizer</h2>
            <form onSubmit={handleAddUser}>
              <input
                type="text"
                name="name"
                value={newOrganizer.name}
                onChange={(e) => setNewOrganizer({ ...newOrganizer, name: e.target.value })}
                placeholder="Name"
                required
              />
              <input
                type="text"
                name="surname"
                value={newOrganizer.surname}
                onChange={(e) => setNewOrganizer({ ...newOrganizer, surname: e.target.value })}
                placeholder="Surname"
                required
              />
              <input
                type="email"
                name="email"
                value={newOrganizer.email}
                onChange={(e) => setNewOrganizer({ ...newOrganizer, email: e.target.value })}
                placeholder="Email"
                required
              />
              <input
                type="password"
                name="password"
                value={newOrganizer.password}
                onChange={(e) => setNewOrganizer({ ...newOrganizer, password: e.target.value })}
                placeholder="Password"
                required
              />
              <input
                type="text"
                name="organization"
                value={newOrganizer.organization}
                onChange={(e) => setNewOrganizer({ ...newOrganizer, organization: e.target.value })}
                placeholder="Organization"
                required
              />
              <button type="submit">Add</button>
              <button type="button" onClick={toggleModal}>Close</button>
            </form>
          </div>
        </div>
        
      )}
    </div>
  );
};

export default ManagedOrganizers;

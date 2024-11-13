// ContactUsQueries.jsx
import React, { useState } from "react";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import "../style/ContactUs.css"; // Custom CSS for styling

const ContactUs = () => {
  const [queries, setQueries] = useState([
    {
      id: 1,
      date: "14/09/2024",
      name: "Obakeng Kgafela",
      email: "kgafela@tut.ac.za",
      subject: "Request To Upload Event",
      message:
        "Dear Admin, I am hosting a hackathon event and would like to upload details.",
    },
    {
      id: 2,
      date: "07/10/2024",
      name: "Lethabo Molefe",
      email: "molefel@tut.ac.za",
      subject: "Request To Upload Event",
      message:
        "Dear Admin, I am hosting a hackathon event and would like to upload details.",
    },
    {
      id: 3,
      date: "06/05/2024",
      name: "Yintha Makamu",
      email: "makamuy@tut.ac.za",
      subject: "Request To Upload Event",
      message:
        "Dear Admin, I am hosting a hackathon event and would like to upload details.",
    },
    {
      id: 4,
      date: "03/04/2024",
      name: "Ronaldo Monyebodi",
      email: "monyebodir@tut.ac.za",
      subject: "Request To Upload Event",
      message:
        "Dear Admin, I am hosting a hackathon event and would like to upload details.",
    },
    {
      id: 5,
      date: "07/10/2024",
      name: "Sinenhlanhla Ntombela",
      email: "ntombelas@tut.ac.za",
      subject: "Request To Upload Event",
      message:
        "Dear Admin, I am hosting a hackathon event and would like to upload details.",
    },
    {
      id: 6,
      date: "03/11/2024",
      name: "Mplontlhe Motioung",
      email: "motioungm@tut.ac.za",
      subject: "Request To Upload Event",
      message:
        "Dear Admin, I am hosting a hackathon event and would like to upload details.",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  // Function to handle search
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filtered queries based on search term
  const filteredQueries = queries.filter(
    (query) =>
      query.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid my-0">
      < NavBar />

      <div className="row">
        <div className="col-lg-2">
          < SideBar />
        </div>
        <div className="col-lg-10">
          <div className="container-fluid d-flex flex-column">
            <h2>Contact Us Queries</h2>
            <div className="search-bar">
              <input
                type="text"
                placeholder="🔍 search"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className="container-fluid">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Date</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Message</th>
                    <th>Send Email</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQueries.map((query, index) => (
                    <tr key={query.id}>
                      <td>{index + 1}</td>
                      <td>{query.date}</td>
                      <td>{query.name}</td>
                      <td>{query.email}</td>
                      <td>{query.subject}</td>
                      <td>{query.message}</td>
                      <td>
                        <button className="btn bg-info">Send Email</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-5">
                <p>&copy; 2024 Hacktrack Event Management System. All rights reserved.</p>
            </footer>
    </div>
  );
};

export default ContactUs;

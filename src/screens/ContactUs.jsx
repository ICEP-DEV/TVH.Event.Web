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
    <div className="main-layout">
      <SideBar /> {/* SideBar Component */}
      <div className="content">
        <NavBar /> {/* NavBar Component */}
        <div className="contact-us-queries">
          <h2>Contact Us Queries</h2>
          <div className="search-bar">
            <input
              type="text"
              placeholder="🔍 search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <table>
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
                    <button className="send-email-button">Send Email</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

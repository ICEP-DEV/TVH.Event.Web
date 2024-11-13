
import React, { useState } from "react";
import "../style/RegistrationForm.css"; // Custom CSS for this page

// Import Components
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";

const RegistrationForm = () => {
   // State to manage questions (initially only one question field)
   const [questions, setQuestions] = useState([""]); // Start with one input for the first question
   const [showAdditionalQuestions, setShowAdditionalQuestions] = useState(false); // To track if additional questions should be shown

  // Function to add a new question input
  const addQuestion = () => {
    setShowAdditionalQuestions(true); // Show additional question fields
    setQuestions([...questions, ""]); // Add a new empty input field
  };

  // Function to handle input change for question fields
  const handleChange = (index, e) => {
    const newQuestions = [...questions];
    newQuestions[index] = e.target.value;
    setQuestions(newQuestions);
  };
  



  return (
    <>
      <NavBar />
      <div className="registration-page row no-gutters">
        <SideBar />
        <div className="main-content">
          <h1 className="form-title">
            Registration Form
            <div className="underline" ></div>
          </h1>
          <div className="Registration-Form-Container">
          <div className="form-container">
  <form>
    <p className="enter-paragraph">Enter the question you would like to add to the form</p>
    <div className="event-name-field">
      <label>Select Event: </label>
      <input type="text" name="selectevent" />
    </div>
    <div className="name-field">
      <label>Name: </label>
      <input type="text" name="name" />
    </div>
    <div className="surname-field">
      <label>Surname: </label>
      <input type="text" name="surname" />
    </div>
    <div className="email-field">
      <label>Email: </label>
      <input type="text" name="email" />
    </div>
    <div className="organization-field">
      <label>Organization: </label>
      <input type="text" name="organization" />
    </div>

    {/* Additional question fields */}
    {showAdditionalQuestions &&
      questions.slice(1).map((question, index) => (
        <div key={index + 1} className="question-set">
          <input
            type="text"
            name={`question-${index + 1}`}
            value={question}
            onChange={(e) => handleChange(index + 1, e)}
            required
          />
        </div>
      ))}

    {/* Add question icon with label */}
    <div className="add-question-section">
      <div className="add-question-icon" onClick={addQuestion}>
        <i
          className="fas fa-plus-circle"
          style={{ fontSize: "24px", color: "#007bff", cursor: "pointer" }}
        ></i>
      </div>
      <label style={{ marginLeft: "10px", fontSize: "16px" }}>
        Add form question
      </label>
    </div>

    <button className="button-upload">
      <label>Upload Form</label>
    </button>
  </form>
</div>

          </div>
        </div>
        {/* Footer */}
        <footer className="bg-dark text-white text-center py-3 mt-5">
                <p>&copy; 2024 Hacktrack Event Management System. All rights reserved.</p>
            </footer>
      </div>
    </>
  );
};

export default RegistrationForm;
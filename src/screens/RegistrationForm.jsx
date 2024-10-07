import React, { useState } from "react";
import "../style/RegistrationForm.css"; // Custom CSS for this page

// Import Components
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";

const RegistrationForm = () => {
  const [formFields, setFormFields] = useState([
    { label: "Select Event", type: "text" },
    { label: "Name", type: "text" },
    { label: "Surname", type: "text" },
    { label: "Email", type: "email" },
    { label: "Organization", type: "text" },
  ]);

  const addFormField = () => {
    setFormFields([...formFields, { label: "New Question", type: "text" }]);
  };

  return (
    <>
      <NavBar />
      <div className="registration-page row no-gutters">
        <SideBar />
        <div className="col-md-9 main-content">
          <h2 className="form-title">
            Registration Form
            <div className="underline" style={{ marginLeft: "35%" }}></div>
          </h2>
          <p className="form-subtitle">
            Enter the questions that you would like to add to the form
          </p>

          <form className="registration-form">
            {formFields.map((field, index) => (
              <div className="form-group" key={index}>
                <label>{field.label}:</label>
                <input type={field.type} className="form-control" />
              </div>
            ))}

            <button
              type="button"
              onClick={addFormField}
              className="add-question-btn"
            >
              + Add Form Question
            </button>

            <button type="submit" className="upload-btn">
              Upload Form
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegistrationForm;

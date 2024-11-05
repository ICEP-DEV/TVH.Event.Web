import React, { useState } from "react";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import "../style/Feedback.css";

const Feedback = () => {
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
    <div className="container-fluid">
      <NavBar/>
      <div className="row">
      <SideBar />
      <div className="col">
        <div className="heading-container">
          <h1 className="underlined-heading">Feedback & Reviews</h1>
        </div>

        <div className="feedback-container">
          <div className="underlineHack">
            <h2>GKHack '24</h2>
          </div>

          {/* Feedback Cards Section */}
          <div className="feedback-card-container">
            <div className="feedback-cards">
              <div className="feedback-card">
                <h3>Amazing Innovation and Collaboration</h3>
                <p>
                  GKHack was well-organized with exciting challenges and helpful
                  mentors. A fantastic event for learning and networking!
                </p>
                <span>Paulina Selala</span>
                <span>30 June '24</span>
                <span>⭐⭐⭐⭐</span>
              </div>

              <div className="feedback-card">
                <h3>Great Hackathon Experience!</h3>
                <p>
                  GKHack was well-organized with exciting challenges and helpful
                  mentors. A fantastic event for learning and networking!
                </p>
                <span>Lethabo Molefe</span>
                <span>29 June '24</span>
                <span>⭐⭐⭐⭐⭐</span>
              </div>

              <div className="feedback-card">
                <h3>Incredible Learning Opportunities</h3>
                <p>
                  The mentors were very knowledgeable and provided invaluable
                  insights. Can't wait for the next event!
                </p>
                <span>Yinhla Makamu</span>
                <span>28 June '24</span>
                <span>⭐⭐⭐⭐</span>
              </div>

              <div className="feedback-card">
                <h3>Networking at its Best</h3>
                <p>
                  GKHack brought together amazing individuals. The networking
                  opportunities were phenomenal!
                </p>
                <span>Ronaldo Developer</span>
                <span>27 June '24</span>
                <span>⭐⭐⭐⭐⭐</span>
              </div>
            </div>
          </div>

          <div className="underline"></div>

          {/* Feedback Form Section */}
          <div className="feedback-form-container">
            <div className="Personalized">
            <p>Add your personalized feedback questions below</p>
            </div>
            <div className="feedback-form">
              <form>
                {/* Event field only once at the top */}
                <div className="event-section">
                  <label>Select Event:</label>
                  <input
                    type="text"
                    name="event"
                  />
                </div>

                {/* Single Question Label with Input Field next to each other */}
                <div className="question-set">
                  <label>Question:</label>
                  <input
                    type="text"
                    name="question-0"
                    value={questions[0]}
                    onChange={(e) => handleChange(0, e)}
                    required
                  />
                </div>

                {/* Show additional question fields only when the user clicks the icon */}
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

                {/* Add more question icon with label next to it */}
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

                <button type="submit" className="upload-button">Upload Form</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Feedback;
import React from "react";
import SideBar from "../components/SideBar";  
import NavBar from "../components/NavBar";  
import "../style/Feedback.css";  

const Feedback = () => {
  return (
    <div className="feedback-page">
      <SideBar />
      <div className="main-content">
        <NavBar />
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
      <p>GKHack was well-organized with exciting challenges and helpful mentors. A fantastic event for learning and networking!</p>
      <span>Paulina Selala</span>
      <span>30 June '24</span>
      <span>⭐⭐⭐⭐</span>
    </div>

    <div className="feedback-card">
      <h3>Great Hackathon Experience!</h3>
      <p>GKHack was well-organized with exciting challenges and helpful mentors. A fantastic event for learning and networking!</p>
      <span>Lethabo Molefe</span>
      <span>29 June '24</span>
      <span>⭐⭐⭐⭐⭐</span>
    </div>

    <div className="feedback-card">
      <h3>Incredible Learning Opportunities</h3>
      <p>The mentors were very knowledgeable and provided invaluable insights. Can't wait for the next event!</p>
      <span>Yinhla Makamu</span>
      <span>28 June '24</span>
      <span>⭐⭐⭐⭐</span>
    </div>

    <div className="feedback-card">
      <h3>Networking at its Best</h3>
      <p>GKHack brought together amazing individuals. The networking opportunities were phenomenal!</p>
      <span>Ronaldo Developer</span>
      <span>27 June '24</span>
      <span>⭐⭐⭐⭐⭐</span>
    </div>
  </div>
</div>
<div className="underline"></div>
{/* Feedback Form Section */}
<div className="feedback-form-container">
  <label>Add your personalized feedback questions below</label>
  <div className="feedback-form">
    <form>
      <label>Select Event:</label>
      <input type="text" name="event" required />

      <label>Question:</label>
      <input type="text" name="question" required />

      <button type="submit">Upload Form</button>
    </form>
  </div>
</div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;

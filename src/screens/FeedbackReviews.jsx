import React, { useState } from "react";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaStar, FaRegStar } from "react-icons/fa"; // Add Font Awesome for stars

const FeedbackReviews = () => {
  const [selectedEvent, setSelectedEvent] = useState("GKHack 24");
  const [reviews,] = useState([
    {
      event: "GKHack 24",
      title: "Amazing Innovation and Collaboration",
      body: "GKHack was well-organized with exciting challenges and helpful mentors. A fantastic event for learning and networking!",
      reviewer: "Lethabo Molefe",
      date: "30 June 2024",
      rating: 4,
    },
    {
      event: "GKHack 24",
      title: "Great Hackathon Experience!",
      body: "GKHack was well-organized with exciting challenges and helpful mentors. A fantastic event for learning and networking!",
      reviewer: "Chun Lee",
      date: "29 June 2024",
      rating: 5,
    },
    {
      event: "AWS hackathon",
      title: "Informative and Exciting!",
      body: "This hackathon was an incredible experience, learned so much!",
      reviewer: "John Doe",
      date: "28 June 2024",
      rating: 3,
    },
  ]);

  const handleEventChange = (event) => {
    setSelectedEvent(event.target.value);
  };

  const renderStars = (rating) => {
    return (
      <>
        {[...Array(5)].map((_, index) =>
          index < rating ? (
            <FaStar key={index} color="#ffc107" />
          ) : (
            <FaRegStar key={index} color="#ffc107" />
          )
        )}
      </>
    );
  };

  return (
    <div className="d-flex">
      <SideBar />
      <div className="flex-grow-1" style={{ marginLeft: "250px" }}>
        <NavBar />
        <div className="container mt-5 pt-5">
          <h2 className="text-center">Feedback & Reviews</h2>
          <Form.Group controlId="eventSelect" className="mt-4">
            <Form.Label>Select Event</Form.Label>
            <Form.Control
              as="select"
              value={selectedEvent}
              onChange={handleEventChange}
            >
              <option>GKHack 24</option>
              <option>AWS hackathon</option>
              {/* Add more event options as needed */}
            </Form.Control>
          </Form.Group>

          <div className="d-flex flex-wrap justify-content-start mt-4">
            {reviews
              .filter((review) => review.event === selectedEvent)
              .map((review, index) => (
                <Card
                  className="m-2"
                  style={{
                    width: "16rem",
                    border: "1px solid #e0e0e0",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  }}
                  key={index}
                >
                  <Card.Body>
                    <div className="d-flex align-items-center mb-2">
                      {renderStars(review.rating)}
                    </div>
                    <Card.Title
                      style={{ fontSize: "1rem", fontWeight: "bold" }}
                    >
                      {review.title}
                    </Card.Title>
                    <Card.Text style={{ fontSize: "0.9rem", color: "#6c757d" }}>
                      {review.body}
                    </Card.Text>
                    <div className="d-flex align-items-center">
                      <img
                        src="https://via.placeholder.com/30"
                        alt="reviewer"
                        className="rounded-circle mr-2"
                      />
                      <div>
                        <small className="text-muted">{review.reviewer}</small>
                        <br />
                        <small className="text-muted">{review.date}</small>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              ))}
          </div>

          <Form className="mt-5">
            <h3>Add your personalized feedback questions below</h3>
            <Form.Group controlId="selectEvent">
              <Form.Label>Select Event</Form.Label>
              <Form.Control type="text" placeholder="Enter event name" />
            </Form.Group>
            <Form.Group controlId="question">
              <Form.Label>Question</Form.Label>
              <Form.Control type="text" placeholder="Enter your question" />
            </Form.Group>
            <Button variant="primary" className="mt-3">
              Upload Form
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackReviews;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./screens/Login";

import SideBar from "./components/SideBar";

import "./App.css";
import EventManagement from "./screens/EventManagement.jsx";
import NavBar from "./components/NavBar.jsx";
import "./style/EventManagement.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import EventPage from "./screens/EventPage .jsx";
import RegistrationForm from "./screens/RegistrationForm.jsx";
import UserDetails from "./screens/UserDetails.jsx";
import FeedbackReviews from "./screens/FeedbackReviews.jsx";
import ManagedOrganizers from "./screens/ManagedOrganizers.jsx";
import CalendarPage from "./screens/CalendarPage.jsx";
import ContactUs from "./screens/ContactUs.jsx";

function App() {
  return (
    <>
      <ContactUs/>
    </>
  );
}
export default App;

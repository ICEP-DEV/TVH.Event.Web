import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./screens/Login";


<<<<<<< HEAD
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

function App() {
  return (
    <>
      <Router>
        <div className="app">
          <SideBar />
          <div className="main-content">
            <NavBar />
            <Routes>
              <Route path="/" element={<CalendarPage />} />
              <Route path="/events" element={<EventPage />} />
              <Route path="/users" element={<ManagedOrganizers />} />
              <Route path="/registration" element={<RegistrationForm />} />
              <Route path="/feedback" element={<FeedbackReviews />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
=======



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Login/> }/>
      </Routes>
    </Router>
>>>>>>> ea7f2bf55612f6c5f1d81d53fc62e722ede01890
  );
}
export default App;

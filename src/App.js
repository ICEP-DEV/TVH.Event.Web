import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./screens/Login";
import LandingPage from "./screens/LandingPage";
import Notifications from "./screens/Notifications";
import Feedback from "./screens/Feedback";


import ContactUs from "./screens/ContactUs";


// Side Bar imports
import CalendarPage from "./screens/CalendarPage";
import EventPage from "./screens/EventPage ";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <LandingPage/> }/>
        <Route path="/login" element={ <Login/>} />
        <Route path="/home" element={ <EventPage/> }/>

        <Route path="/contact" element={< ContactUs />} />

        <Route path="/calendar" element={< CalendarPage />} />
        <Route path="/Notifications" element={< Notifications />} />
        <Route path="/Feedback" element={< Feedback />} />
      </Routes>
    </Router>
  );
}
export default App;

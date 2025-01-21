import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import "bootstrap/dist/css/bootstrap.min.css";
import LandingPage from "./screens/LandingPage";
import Notifications from "./screens/Notifications";
import Feedback from "./screens/Feedback";

import UserDetails from "./screens/UserDetails";

import EventDetails from "./screens/EventDetails";

import ContactUs from "./screens/ContactUs";
import ForgotPasswordPage from "./components/ForgotPasswordPage";



// Side Bar imports
import CalendarPage from "./screens/CalendarPage";
import EventPage from "./screens/EventPage ";
import RegistrationForm from "./screens/RegistrationForm";
import OrganizersManagement from "./screens/OrganizersManagement";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <LandingPage/> }/>
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/UserDetails" element={< UserDetails />} />
        <Route path="/event" element={ <EventPage/> }/>

        <Route path="/contact" element={< ContactUs />} />

        <Route path="/calendar" element={< CalendarPage />} />
        <Route path="/Notifications" element={< Notifications />} />
        <Route path="/registrationform" element={< RegistrationForm />} />
        <Route path="/organisers" element={< OrganizersManagement />} />
        <Route path="/Feedback" element={< Feedback />} />

        <Route path="/event/details" element={<EventDetails/>} />
      </Routes>
    </Router>
  );
}
export default App;

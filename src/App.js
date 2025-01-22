import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import "bootstrap/dist/css/bootstrap.min.css";
import {ProtectedRoute, LoggedInRoute} from './HOC';
import LandingPage from "./screens/LandingPage";
import Notifications from "./screens/Notifications";
import Feedback from "./screens/Feedback";


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

        <Route path="/event" element={ <ProtectedRoute><EventPage/></ProtectedRoute> }/>
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/contact" element={<LoggedInRoute>< ContactUs /></LoggedInRoute>} />

        <Route path="/calendar" element={<ProtectedRoute>< CalendarPage /></ProtectedRoute>} />
        <Route path="/Notifications" element={<ProtectedRoute>< Notifications /></ProtectedRoute>} />
        <Route path="/registrationform" element={<ProtectedRoute>< RegistrationForm /></ProtectedRoute>} />
        <Route path="/organisers" element={<ProtectedRoute>< OrganizersManagement /></ProtectedRoute>} />
        <Route path="/Feedback" element={<ProtectedRoute>< Feedback /></ProtectedRoute>} />

        <Route path="/event/details" element={<ProtectedRoute><EventDetails/></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}
export default App;

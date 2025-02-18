import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
//import "bootstrap/dist/css/bootstrap.min.css";
import {ProtectedRoute, LoggedInRoute, AdminRoute, OrganizersRoute} from './HOC';
import AccessDenied from "./screens/AccessDenied";
import PageNotFound from "./screens/PageNotFound";


import LandingPage from "./screens/LandingPage";
import Notifications from "./screens/Notifications";
import Feedback from "./screens/Feedback";


import EventDetails from "./screens/EventDetails";

import ContactUs from "./screens/ContactUs";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import AboutUs from "./screens/AboutUs";


// Side Bar imports
import CalendarPage from "./screens/CalendarPage";
import EventPage from "./screens/EventPage ";
import RegistrationForm from "./screens/RegistrationForm";
import OrganizersManagement from "./screens/OrganizersManagement";

import ContactAdmin from "./screens/ContactAdmin";

function App() {

  return (
    <Router>
      <Routes>
        
        <Route path="/" element={ <LandingPage/> }/>
        <Route path="/access-denied" element={ <AccessDenied/> }/>

        <Route path="/event" element={ <ProtectedRoute><EventPage/></ProtectedRoute> }/>
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/contact" element={<LoggedInRoute>< ContactUs /></LoggedInRoute>} />

        <Route path="/calendar" element={<ProtectedRoute>< CalendarPage /></ProtectedRoute>} />
        <Route path="/Notifications" element={<ProtectedRoute>< Notifications /></ProtectedRoute>} />
        <Route path="/registrationform" element={<ProtectedRoute>< RegistrationForm /></ProtectedRoute>} />
        <Route path="/organisers" element={<AdminRoute>< OrganizersManagement /></AdminRoute>} />
        <Route path="/Feedback" element={<ProtectedRoute>< Feedback /></ProtectedRoute>} />
        <Route path="/contact-admin" element={<OrganizersRoute><ContactAdmin /></OrganizersRoute>}/>

        <Route path="/event/details" element={<ProtectedRoute><EventDetails/></ProtectedRoute>} />
        <Route path="/pagenotfound" element={<PageNotFound />} />

        <Route path="*" element={<Navigate to={'/pagenotfound'} />}/>
        <Route path="/AboutUs" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}
export default App;

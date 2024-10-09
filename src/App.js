import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./screens/Login";
import EventManagement from "./screens/EventManagement";

import ContactUs from "./screens/ContactUs";




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/contact" element={ <ContactUs/> }/>

        <Route path="/" element={ <Login/> }/>
        
        <Route path="/home" element={ <EventManagement/> }/>
      </Routes>
    </Router>
  );
}
export default App;

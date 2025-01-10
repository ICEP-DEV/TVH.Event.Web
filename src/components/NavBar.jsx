import React from "react";
import "../style/NavBar.css"; // Import your CSS for styling
import { useNavigate, Link } from 'react-router-dom';
import { isAuthenticated } from '../authentication/auth';

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid bg-light" style={{height : "10vh"}}>
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 ">
        <ul className="col-md-3 mb-2 mb-md-0">
          <li className="nav fs-2 col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            Hacktrack
          </li>
        </ul>
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li>
            <Link to="/" className="nav-link px-2 link-secondary">Landing Page</Link>
          </li>
          <li>
            <Link to="/contact" className="nav-link px-2 link-secondary">Contact</Link>
          </li>
          <li>
            <Link className="nav-link px-2 link-secondary">About Us</Link>
          </li>
          
        </ul>
      </header>
    </div>
  );
};

export default NavBar;

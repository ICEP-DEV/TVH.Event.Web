import React from "react";
import "../style/NavBar.css"; // Import your CSS for styling
import { useNavigate, Link } from 'react-router-dom';
import { isAuthenticated } from '../authentication/auth';

const NavBar = () => {
  const navigate = useNavigate();
  const auth = isAuthenticated();
  const type = localStorage.getItem('type');
  const username = localStorage.getItem('username');

  const logout = ()=>{
    localStorage.clear();
    navigate('/');
  }

  return (
    <div className="container-fluid" style={{height : "10vh"}}>
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 ">
        <ul className="col-md-3 mb-2 mb-md-0">
          {
            auth ? (
              <div className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                <li className="nav-link px-2 link-secondary">{type}</li>
                <li className="nav-link px-2 link-secondary">{username}</li>
              </div>
            ) : (
              <></>
            )
          }
        </ul>
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li>
            <Link to="/" className="nav-link px-2 link-secondary">Home</Link>
          </li>
          <li>
            <Link to="/contact" className="nav-link px-2 link-secondary">Contact</Link>
          </li>
          <li>
            <Link className="nav-link px-2 link-secondary">About Us</Link>
          </li>
          <li>
            <Link to="/" className="nav-link px-2 link-secondary">Log Out</Link>
          </li>
          
        </ul>
      </header>
    </div>
  );
};

export default NavBar;

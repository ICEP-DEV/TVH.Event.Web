import React from 'react';
import { Link } from 'react-router-dom';
import '../style/LandingPage.css'; // Linking the separate CSS file

function LandingPage() {

    return (
        <div className="container-fluid">
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Tshwane Varsity Hackathon</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                                {/* URL: http://localhost:3000/ */}
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">Contact</Link>
                                {/* URL: http://localhost:3000/contact */}
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About Us</Link>
                                {/* URL: http://localhost:3000/about */}
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                                {/* URL: http://localhost:3000/login */}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="hero-section text-center d-flex align-items-center justify-content-center">
                <div className="container">
                    <h1 className="hero-title">Hackathon Events Management System</h1>
                    <p className="hero-subtitle">Manage All Your Hackathon Events Here</p>
                    <Link to="/login" className="btn btn-primary btn-lg">Get Started</Link>
                </div>
            </div>


            {/* Footer */}
            <footer className="bg-dark text-white text-center py-3 mt-5">
                <p>&copy; 2024 Hackathon Event Management System. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default LandingPage;

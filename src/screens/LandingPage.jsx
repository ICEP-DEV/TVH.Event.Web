import React from 'react';
import { Link } from 'react-router-dom';
import '../style/LandingPage.css'; // Linking the separate CSS file
import NavBar from "../components/NavBar"; // Import NavBar component

function LandingPage() {
    return (
        <div className="container-fluid">
            {/* Use NavBar component */}
            <NavBar />

            {/* Hero Section */}
            <div className="hero-section text-center d-flex align-items-south justify-content-south">
                <div className="container">
                    <h1 className="hero-title">Welcome to Hacktrack!</h1>
                    <p className="hero-subtitle">Manage All Your Hackathon Events Seamlessly</p>
                    <Link to="/login" className="btn btn-primary btn-lg">Get Started</Link>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-dark text-white text-center py-3 mt-5">
                <p>&copy; 2024 Hacktrack Event Management System. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default LandingPage;

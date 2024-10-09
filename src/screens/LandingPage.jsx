import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import '../style/LandingPage.css'; // Linking the separate CSS file

function LandingPage() {
    // Login functionality placeholder
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Logic for login (Axios or other method can go here)
        alert("Login function invoked");
    };

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
                    {/* URL: http://localhost:3000/login */}
                </div>
            </div>

            {/* Routes */}
            <Routes>
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login handleLogin={handleLogin} setEmail={setEmail} setPassword={setPassword} />} />
            </Routes>

            {/* Footer */}
            <footer className="bg-dark text-white text-center py-3 mt-5">
                <p>&copy; 2024 Hackathon Event Management System. All rights reserved.</p>
            </footer>
        </div>
    );
}

// Contact Component
const Contact = () => (
    <div className="container mt-5">
        <h2>Contact Us</h2>
        <p>Email us at: hackathon@example.com</p>
    </div>
);

// About Component
const About = () => (
    <div className="container mt-5">
        <h2>About Us</h2>
        <p>We organize hackathons and provide a platform for managing events.</p>
    </div>
);

// Login Component
const Login = ({ handleLogin, setEmail, setPassword }) => (
    <div className="container mt-5 d-flex justify-content-center">
        <div className="login-box col-md-6 p-4 shadow-lg rounded">
            <h2 className="text-center mb-4" style={{ fontWeight: 'bold' }}>Login</h2>
            <div className="form-group mb-3">
                <label>Email</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="form-group mb-3">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="d-grid gap-2">
                <button onClick={handleLogin} className="btn btn-dark btn-block">Sign In Admin</button>
                <button onClick={handleLogin} className="btn btn-secondary btn-block">Sign In Organizer</button>
            </div>
            <div className="mt-3 text-center">
                <a href="/forgot-password" className="text-muted">Forgot password?</a>
            </div>
        </div>
    </div>
);

export default LandingPage;

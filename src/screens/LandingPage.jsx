import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer"

function LandingPage() {
    const bg = require('../assets/leaf.jpg')
    return (
        <div className="container-fluid p-0" style={{
            backgroundImage : bg,
            height : '100vh',
            backgroundImage : `url(${bg})`
        }}>
            <NavBar />
            <div className="container-fluid text-center mt-5 p-5" style={{width : '60%'}}>
                <h1 className='fs-1 fw-bold p-5 text-white'>
                    Hacktrack: Your All-in-One Event Management Hub.
                </h1>
                <h1 className='fs-3 pb-4 text-white'>
                    Tired of juggling spreadsheets and endless emails? Hacktrack simplifies event management. Create stunning event pages, effortlessly manage registrations, and engage your audience with seamless communication. All in one intuitive platform
                </h1>
                <p className='text-start fs-5 text-white'>
                    <li>Streamline registration with flexible ticketing options.</li>
                    <li>Engage attendees through personalized communication</li>
                    <li>
                        Track key metrics and gain valuable insights into event performance.
                    </li>
                    <li>Host online and offline events with ease.</li>
                </p>
                <Link to="/login" className="btn btn-primary btn-lg">Get Started</Link>
            </div>

            <div className="container-fluid p-0" style={{position : 'fixed', bottom:0}}>
                <Footer/>
            </div>
        </div>
    )
}

export default LandingPage;

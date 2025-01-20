import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import api from '../APIs/API';


function LandingPage() {
    const bg = require('../assets/leaf1.jpg')
    const [isOpened, setIsOpened] = useState(false);

    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');

    const navigate = useNavigate();
    const login = async () => {
        var data = { email: Email, password: Password };

        try{
            const endpoint = api + "auth/web/login";
            const response = await axios.post(
                endpoint,
                data
            );

            if (response.status === 200){
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("type", response.data.type);

                localStorage.setItem('user_id', response.data.res.user_id);
                localStorage.setItem('username', response.data.res.username);
                localStorage.setItem('email', response.data.res.email);

                navigate('/event');
            } 
            else {
                //console.log(respond)
                toast.warn(response.data.message);
            }
        }catch(error){
            toast.error(error.response.data.message)
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        
        if (form.checkValidity() === false) {
            event.stopPropagation();
            
        } else {
            login();
        }

        form.classList.add('was-validated');
    };


    return (
        <div className="container-fluid p-0" style={{
            //backgroundImage : bg,
            height : '100vh',
            backgroundImage : `url(${bg})`
        }}>
            {
                isOpened ? <div className='container bg-light' style={{position : 'fixed', top : '50%', left : '50%', transform : 'translate(-50%, -50%)', padding : '50px', borderRadius : '10px', width : '30%'}}>
                    <ToastContainer />
                    <p className='fs-3 text-center'>LOGIN</p> 
                    <form noValidate className="needs-validation" onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label>Email</label>
                            <input
                                type="email"
                                onChange={(event) => setEmail(event.target.value)}
                                className="form-control"
                                placeholder="Enter your email"
                                required
                            />
                            <div className="invalid-feedback">Please enter a valid email.</div>
                        </div>

                        <div className="form-group mb-3">
                            <label>Password</label>
                            <input
                                type="password"
                                onChange={(event) => setPassword(event.target.value)}
                                className="form-control"
                                placeholder="Enter your password"
                                required
                            />
                            <div className="invalid-feedback">Password is required.</div>
                        </div>

                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-primary btn-block">
                                Sign In 
                            </button>
                            <button type="button" className="btn btn-danger btn-block" onClick={()=>{setIsOpened(false)}}>
                                Cancel
                            </button>

                        </div>

                        <div className="mt-3 text-center">
                            <a href="/forgot-password" className="text-muted">Forgot password?</a>
                        </div>
                    </form>
                </div> : <></>
            }
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
                <button className="btn btn-primary btn-lg" onClick={()=>{setIsOpened(true)}}>Get Started</button>
            </div>

            <div className="container-fluid p-0" style={{position : 'fixed', bottom:0}}>
                <Footer/>
            </div>
        </div>
    )
}

export default LandingPage;

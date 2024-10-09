import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../style/Login.css'; 

import api from '../APIs/API';

function Login() {
    const navigate = useNavigate();
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [type, setType] = useState('');
    const login = async () => {
        var data = { email: Email, password: Password };
        
        try {
            let endpoint = "";

            if(type === "admin"){
                endpoint = api + 'admin/login';
            }
            else if(type === "organizer"){
                endpoint = api + 'organiser/login';
            }

            const respond = await axios.post(endpoint, data);
            console.log(respond)
            if (respond.status === 200) {

                localStorage.setItem("token", respond.data.token);
                localStorage.setItem("type", respond.data.type);

                localStorage.setItem('user_id', respond.data.result[0].admin_id);
                localStorage.setItem('username', respond.data.result[0].username);
                localStorage.setItem('email', respond.data.result[0].email);
                localStorage.setItem('created_at', respond.data.result[0].created_at);
                navigate('/home');
            } else {
                toast.warn(respond.data.message);
            }
        } catch (err) {
            //console.log(err.respond.data.message);
            toast.error(err.respond.data.message)
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
        <div>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Hackathon</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/">Landing</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/contact">Contact</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/about">About Us</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Login Form */}
            <div className="container mt-5 d-flex justify-content-center">
                <div className="login-box col-md-6 p-4 shadow-lg rounded">
                    <ToastContainer />
                    <h2 className="text-center mb-4" style={{ fontWeight: 'bold' }}>Login</h2>

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
                            <button type="submit" onClick={()=>{setType('admin')}} className="btn btn-dark btn-block">
                                Sign In Admin
                            </button>

                            <button type="submit" onClick={()=>{setType('organizer')}} value="admin" className="btn btn-secondary btn-block">
                                Sign In Organizer
                            </button>
                        </div>

                        <div className="mt-3 text-center">
                            <a href="/forgot-password" className="text-muted">Forgot password?</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;

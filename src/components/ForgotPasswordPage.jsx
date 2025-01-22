import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import api from '../APIs/API';

function ForgotPasswordPage() {
    const [email, setEmail] = useState('');

    const handlePasswordRecovery = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`${api}auth/web/forgot-password`, { email });
            if (response.status === 200) {
                toast.success('Password reset link has been sent to your email.');
            } else {
                toast.warn(response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <div className="container bg-light" style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '50px',
            borderRadius: '10px',
            width: '30%'
        }}>
            <ToastContainer />
            <h3 className="text-center mb-4">Forgot Password</h3>
            <form onSubmit={handlePasswordRecovery} noValidate>
                <div className="form-group mb-3">
                    <label>Email Address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <div className="invalid-feedback">Please provide a valid email address.</div>
                </div>
                <button type="submit" className="btn btn-primary btn-block w-100">Send Reset Link</button>
            </form>
        </div>
    );
}

export default ForgotPasswordPage;

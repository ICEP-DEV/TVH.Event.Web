import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import '../style/style.css'

import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');

    const login = async() => {
        var data = { email: Email, password: Password }
        await axios.post('http://localhost:3001/api/admin/login', data).then(respond => {
            console.log(respond);
            if (respond.status === 200) {
                localStorage.setItem("token", respond.data.token)
                localStorage.setItem("type", respond.data.type)
                var user = {
                    user_id : respond.data.result[0].admin_id,
                    username : respond.data.result[0].username,
                    email : respond.data.result[0].email,
                    created_at : respond.data.result[0].created_at,
                }
                console.log(JSON.stringify(user))

                localStorage.setItem('user_info', JSON.stringify(user));
                navigate('/home')
            }
            else {
                toast.warn(respond.data.message);
            }
        },
            err => {
            }
        );

    }
    return (<div>
        <ToastContainer />
        <h2>Login</h2>
        <div className="form-group">
            <label>Email</label>
            <input type="email" onChange={(event) => setEmail(event.target.value)} className="control-form" />
        </div>
        <div className="form-group">
            <label>Password</label>
            <input type="password" onChange={(event) => setPassword(event.target.value)} className="control-form" />
        </div>
        <div className="form-group">
            <button onClick={login}>Login</button>
        </div>
    </div>);
}

export default Login;
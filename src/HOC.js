import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './authentication/auth';



const ProtectedRoute = ({ children }) => {

    return isAuthenticated() ? children : <Navigate to="/" />;
};



const LoggedInRoute = ({ children }) => {
    return isAuthenticated() ? <Navigate to="/event"/> : children;
}



export{ProtectedRoute, LoggedInRoute};
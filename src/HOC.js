import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './authentication/auth';



const ProtectedRoute = ({ children }) => {

    return isAuthenticated() ? children : <Navigate to="/" />;
};



const LoggedInRoute = ({ children }) => {
    return isAuthenticated() ? <Navigate to="/event"/> : children;
}


const OrganizersRoute = ({ children }) =>{
    if(isAuthenticated){
        const type = localStorage.getItem('type');

        if(type === 'admin'){
            return <Navigate to="/access-denied" />
        }
        return children;
    }
    
    return <Navigate to="/" />
}
const AdminRoute = ({ children }) =>{
    if(isAuthenticated){
        const type = localStorage.getItem('type');

        if(type === 'organiser'){
            return type === 'admin' ? children : <Navigate to="/access-denied" />
        }
    }
    
    return <Navigate to="/" />
}


export{ProtectedRoute, LoggedInRoute, OrganizersRoute, AdminRoute};
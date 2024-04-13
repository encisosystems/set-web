import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export const PrivateRoute = ({ children, ...rest }) => {
    const isAuthenticated = useAuth();

   if(!isAuthenticated){
    return <Navigate to="/login" replace />
   }

    return children;
};


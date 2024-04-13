import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ children, ...rest }) => {
    const isAuthenticated = useAuth();

    return (
        <Route
            {...rest}
            element={isAuthenticated ? children : <Navigate to="/login" replace />}
        />
    );
};

export default PrivateRoute;
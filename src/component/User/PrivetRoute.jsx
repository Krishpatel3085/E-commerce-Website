import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = () => {
  const isAuthenticated = Cookies.get('userEmail'); // Check if the user is logged in
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;

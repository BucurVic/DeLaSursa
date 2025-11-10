import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
interface ProtectedRouteProps {
  allowedRoles: string[]; 
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { isAuthenticated, role } = useAuth();


  
  if (!isAuthenticated) {
    
    return <Navigate to="/login" replace />;
  }

  
  if (role && allowedRoles.includes(role)) {
    
    return <Outlet />;
  } else {
    
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;
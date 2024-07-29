import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const [isAllowed, setIsAllowed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }
        const response = await axios.get('http://localhost:3000/usersJWT/role', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const userRole = response.data.idRol;
        if (allowedRoles.includes(userRole)) {
          setIsAllowed(true);
        }
      } catch (error) {
        console.error('Error verifying user role:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUserRole();
  }, [allowedRoles]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAllowed ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;


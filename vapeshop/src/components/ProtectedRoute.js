// ProtectedRoute.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomModal from './CustomModal'; 
import Login from './Login';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('jwtToken')); // Initialize from local storage
  const [showModal, setShowModal] = useState(!isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    setShowModal(!isAuthenticated); // Show modal if not authenticated
  }, [isAuthenticated]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true); // Update authentication status after successful login
  };

  return (
    <>
      <CustomModal isOpen={showModal}>
      
        <Login onLoginSuccess={handleLoginSuccess} />
      </CustomModal>
      { children}
    </>
  );
};

export default ProtectedRoute;

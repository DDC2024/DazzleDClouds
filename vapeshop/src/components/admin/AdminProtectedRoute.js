import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Import jwtDecode

const AdminProtectedRoute = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
      const checkAuthAndRole = () => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
          const decodedToken = jwtDecode(token);
          if (decodedToken.role === 'admin' || decodedToken.role === 'staff') {
            setIsAdmin(true);
            console.log('testadminnn')
          } else {
            setIsAdmin(false);
            navigate('/');
          }
        } else {
          setIsAdmin(false);
          navigate('/');
        }
      };
  
      const handleLogout = () => {
        setIsAdmin(false);
      };
  
      checkAuthAndRole();
  
      window.addEventListener('storage', checkAuthAndRole);
      window.addEventListener('logout', handleLogout);
  
      return () => {
        window.removeEventListener('storage', checkAuthAndRole);
        window.removeEventListener('logout', handleLogout);
      };
    }, [navigate, isAdmin]); // Include isAdmin in the dependency array
  
    return isAdmin ? <>{children}</> : null;
  };
  
  export default AdminProtectedRoute;
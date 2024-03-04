import React from 'react';
import { useAuth } from './AppContext'

const AdminHeader = () => {
  const { logout, currentUser } = useAuth();

  const handleLogout = () => {
    logout();
    window.dispatchEvent(new Event('logout')); // Dispatching custom logout event
  };
  
  

  return (
    <div className='bg-[#ffffff] h-16 shadow-md fixed top-0 right-0 z-50 w-10/12 flex justify-between items-center px-4'>
      <div>
        <span className="text-gray-700">Welcome, Admin!</span>
      </div>
      <div>
        <button 
          className='text-gray-700 font-semibold hover:text-gray-900 mr-4'
          onClick={handleLogout}
        >
          Logout
        </button>
        {/* Static content */}
        <button className="text-gray-700 font-semibold hover:text-gray-900">Settings</button>
        {/* Add more static content here if needed */}
      </div>
    </div>
  );
};

export default AdminHeader;

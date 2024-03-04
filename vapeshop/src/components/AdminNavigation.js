import React from 'react';
import { Link } from 'react-router-dom'; 

const AdminNavigation = () => {
  return (
    <div className='min-h-screen w-1/6 bg-[#1c2434]'>
      <div className="flex flex-col justify-between h-full fixed">
        {/* Your navigation items */}
        <div className="mt-8">
          <ul className="space-y-2">
   
            <li>
              <Link to="/admin" className="block px-4 py-2 text-white hover:bg-gray-800">Dashboard</Link>
            </li>
            <li>
              <Link to="/orders" className="block px-4 py-2 text-white hover:bg-gray-800">Orders</Link>
            </li>
            <li>
              <Link to="/products" className="block px-4 py-2 text-white hover:bg-gray-800">Product</Link>
            </li>
            <li>
              <Link to="/statistic" className="block px-4 py-2 text-white hover:bg-gray-800">Statistic</Link>
            </li>
            
            <li>
              <Link to="/users" className="block px-4 py-2 text-white hover:bg-gray-800">users</Link>
            </li>
            <li>
              <Link to="/walkin" className="block px-4 py-2 text-white hover:bg-gray-800">WalkIN</Link>
            </li>
            <li>
              <Link to="/sales" className="block px-4 py-2 text-white hover:bg-gray-800">Sales</Link>
            </li>
            <li>
              <Link to="/raffle" className="block px-4 py-2 text-white hover:bg-gray-800">Rafle</Link>
            </li>
          </ul>
        </div>
    
        <div className="pb-8">
     
        </div>
      </div>
    </div>
  );
}

export default AdminNavigation;

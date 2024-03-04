import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import AdminNavigation from "../components/AdminNavigation";
import ProtectedRoute from "../components/ProtectedRoute"; 
import AdminProtectedRoute from "../components/admin/AdminProtectedRoute";
import { AdminProvider } from "../components/admin/AdminContext";

const Root = () => {
  return (
    <AdminProvider>
   <AdminProtectedRoute> <div className="flex">
    
      <AdminNavigation />
      <div className="flex flex-col w-10/12">


        <Outlet />
      </div>
    </div>
    </AdminProtectedRoute>
    </AdminProvider>
  );
};

export default Root;



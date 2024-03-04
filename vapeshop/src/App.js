import Home from "./components/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import Cart from "./components/Cart";
import React, { useEffect } from "react";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoot from "./pages/AdminRoot";
import ProductShop from "./pages/ProductShop";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./components/AdminAddProduct";
import ProductRetrieve from "./components/ProductRetreive";
import ShoppingCart from "./pages/ShoppingCart";
import OrderList from "./components/OrderList";
import AdminUserList from "./components/AdminUserList";

import AdminStatistic from "./pages/AdminStatistic";
import AdminOrderList from "./components/AdminOrderList";
import AdminProductList from "./components/AdminProductList";
import Register from "./components/Register";
import WalkIn from "./pages/WalkIn";
import Sales from "./components/admin/Sales";
import Raffle from "./components/admin/Raffle";
import RaffleView from "./pages/RaffleView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/shop", element: <ProductShop /> },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <ShoppingCart />
          </ProtectedRoute>
        ),
      },
      { path: "/myorder", element: <OrderList /> },
      { path: "/aboutus", element: <ProductRetrieve /> },
      { path: "/register", element: <Register /> },
      {path: "/raffleview", element: <RaffleView/>}
    ],
  },
  {
    path: "/",
    element: <AdminRoot />,
    children: [
      { path: "/admin", element: <AdminStatistic /> },
      { path: "/statistic", element: <AdminDashboard /> },
      { path: "/orders", element: <AdminOrderList /> },
      { path: "/products", element: <AdminProductList /> },
      { path: "/users", element: <AdminUserList /> },
      { path: "/walkin", element: <WalkIn /> },
      {path: "/sales", element: <Sales/>},
      {path: "/raffle", element: <Raffle/>}
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

function App() {


  return <RouterProvider router={router} />;
 
}

export default App;

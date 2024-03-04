import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../components/AppContext';
import background from "../assets/back2.png";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(6);
  const [selectedStatus, setSelectedStatus] = useState('all'); // Default to show all orders
  const [cancelOrderId, setCancelOrderId] = useState(null); // Store the ID of the order to be cancelled
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // State to manage the visibility of the modal
  const { handleCancelOrder } = useAuth();
  const token = localStorage.getItem('jwtToken');
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.userId;
  const maxProductsToShow = 2;
  const firstBackground = {
    minHeight: "100vh", 
    backgroundImage: `url(${background})`, 
    backgroundSize: "cover", 
    backgroundPosition: "center", 
    backgroundRepeat: "no-repeat", 
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/orders/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        // Sort orders by date in descending order (latest first)
        const sortedOrders = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(sortedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
  
    fetchOrders();
  }, [userId, token, cancelOrderId]); // Include cancelOrderId in the dependencies to refetch orders after cancellation
  
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

  // Filter orders based on selected status
  const filteredOrders = selectedStatus === 'all' ? orders : orders.filter(order => order.status === selectedStatus);
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    setCurrentPage(1); // Reset current page when status changes
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'text-green-500';
      case 'cancelled':
        return 'text-red-500';
      case 'confirmed':
        return 'text-blue-500';
      case 'pending':
        return 'text-orange-500';
      default:
        return '';
    }
  };

  // Function to handle cancel button click
  const handleCancelClick = (orderId) => {
    setCancelOrderId(orderId); // Set the ID of the order to be cancelled
    setShowConfirmationModal(true); // Show the confirmation modal
  };

  // Function to handle confirmation of cancellation
  const handleConfirmCancel = async () => {
    await handleCancelOrder(cancelOrderId); // Call the function to cancel the order
    setShowConfirmationModal(false); // Hide the confirmation modal
    setCancelOrderId(null); // Reset the cancelOrderId state
  };

  // Function to handle cancellation cancellation (if user decides not to cancel)
  const handleCancelConfirmation = () => {
    setShowConfirmationModal(false); // Hide the confirmation modal
    setCancelOrderId(null); // Reset the cancelOrderId state
  };

  return (
    <div className="min-h-screen mt-16 p-8 flex flex-col items-center" style={firstBackground}>
      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-md shadow-md">
            <p className="text-lg mb-4">Are you sure you want to cancel this order?</p>
            <div className="flex justify-end">
              <button onClick={handleCancelConfirmation} className="bg-gray-400 px-4 py-2 rounded-md mr-4">No</button>
              <button onClick={handleConfirmCancel} className="bg-red-500 text-white px-4 py-2 rounded-md">Yes</button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-4 mt-12">
        <label htmlFor="statusFilter" className="mr-2 text-white font-semibold">Filter by status:</label>
        <select id="statusFilter" value={selectedStatus} onChange={handleStatusChange} className="border border-gray-300 rounded-md px-2 py-1">
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="delivered">Delivered</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${currentOrders.length <= 2 ? '1' : '2'} lg:grid-cols-${currentOrders.length <= 3 ? '1' : '2'} xl:grid-cols-${currentOrders.length <= 4 ? '1' : '2'} gap-4 justify-center`}>
        {currentOrders.map(order => (
          <div key={order._id} className="border border-gray-300 rounded-md p-4 mb-4 shadow-md text-white w-full">
            <h2 className="text-lg font-semibold mb-2">Order ID: {order._id}</h2>
            <p>Total Amount: {order.totalPriceWithFee}</p>
            <p className={getStatusTextColor(order.status)}>Status: {order.status}</p>
            <div className="flex flex-wrap">
              {order.products.map(product => (
                <div key={product._id} className="flex items-center mr-4 mb-2">
                  <img src={product.product.photoUrl} alt={product.product.name} className="h-12 w-12 mr-2 inline-block" />
                  <p>{product.name} - Qty: {product.quantity}</p>
                </div>
              ))}
            </div>
            {order.status === 'pending' && (
              <button onClick={() => handleCancelClick(order._id)} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 mt-2">Cancel</button>
            )}
          </div>
        ))}
      </div>
      <ul className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(filteredOrders.length / ordersPerPage) }, (_, index) => (
          <li key={index}>
            <button onClick={() => paginate(index + 1)} className="px-3 py-1 bg-[#623288] text-white rounded-md mx-1 hover:bg-[#7c3daf] shadow-md">
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;

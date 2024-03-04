import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the AdminContext
const AdminContext = createContext();

export const useAdmin = () => {
  return useContext(AdminContext);
};

export const AdminProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [productCount, setProductCount] = useState(0);
  const [orders, setOrders] = useState([]);
  const [orderCount, setOrderCount] = useState(0);
  const [shoppingList, setShoppingList] = useState([]);
  const [deliveredCount, setDeliveredCount] = useState(0); // State for the count of delivered orders

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) {
        throw new Error('Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data.users);
        setUserCount(data.users.length);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/items');
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
          // Count the number of delivered orders
          const deliveredOrders = data.filter(order => order.status === 'delivered');
          setDeliveredCount(deliveredOrders.length);
          // Count the number of pending orders
          const pendingOrders = data.filter(order => order.status === 'pending');
          setOrderCount(pendingOrders.length);
        } else {
          throw new Error('Failed to fetch orders');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
          setProductCount(data.length);
        } else {
          throw new Error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchOrders();
    fetchUsers();
    fetchProducts();
  }, []);

  const addItemToShoppingList = (item) => {
    setShoppingList([...shoppingList, item]);
  };

  const removeItemFromShoppingList = (itemIndex) => {
    const updatedList = shoppingList.filter((_, index) => index !== itemIndex);
    setShoppingList(updatedList);
  };

  const updateItemQuantity = (itemIndex, newQuantity) => {
    const updatedList = shoppingList.map((item, index) => {
      if (index === itemIndex) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setShoppingList(updatedList);
  };

  const calculateTotalPrice = () => {
    return shoppingList.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const value = {
    users,
    userCount,
    products,
    productCount,
    orderCount,
    orders,
    deliveredCount,
    shoppingList,
    addItemToShoppingList,
    removeItemFromShoppingList,
    updateItemQuantity,
    calculateTotalPrice,
    updateOrderStatus,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export default AdminProvider;

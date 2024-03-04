import React, { createContext, useState, useContext } from "react";
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0); 

  const logout = () => {
    localStorage.removeItem("jwtToken");
    setIsLoggedIn(false);
  };



  //add tocart
  const handleAddToCart = async (product, quantity) => {
    try {
      const token = localStorage.getItem('jwtToken');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
  
      const response = await fetch(`http://localhost:5000/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({
          user: userId,
          products: [{ productId: product._id, quantity }], 
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }
  
      const data = await response.json();
      console.log(data); 
  
      // Increment the count by 1 initially, then by 1 for subsequent additions
      setCartItemCount(prevCount => prevCount > 0 ? prevCount + 1 : 1);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };
  
  
  
  const handleRemoveItemFromCart = async (productId) => {
    try {
      const token = localStorage.getItem('jwtToken');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
  
      const response = await fetch(`http://localhost:5000/cart/${userId}/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to remove item from cart');
      }
  
      // Update the cart item count after successful deletion
      setCartItemCount(prevCount => prevCount - 1);
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };
  
  const handleBuyItems = async (totalPriceWithFee) => {
    try {
      const token = localStorage.getItem('jwtToken');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
  
      const response = await fetch(`http://localhost:5000/purchase/${userId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          totalPrice: totalPriceWithFee
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to buy items');
      }
  
      const data = await response.json();
      console.log(data);

      // Update the cart item count after successful purchase
      setCartItemCount(0); // Assuming you want to reset the count to 0 after purchase
    } catch (error) {
      console.error('Error buying items:', error);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await fetch(`http://localhost:5000/orders/${orderId}/cancel`, {
        method: 'PUT', 
        headers: {
          'Authorization': `Bearer ${token}` 
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to cancel order');
      }
  
      const data = await response.json();
      console.log(data); 
    } catch (error) {
      console.error('Error canceling order:', error);
    }
  };

  return (
    <AuthContext.Provider value={{
      cartItemCount,
      handleAddToCart,
      handleRemoveItemFromCart,
      isLoggedIn,
      logout,
      handleBuyItems,
      handleCancelOrder
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

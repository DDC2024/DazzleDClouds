import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; 
const ProductRetrieve = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPriceWithFee, setTotalPriceWithFee] = useState(0); 

 
  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        throw new Error('User not authenticated.');
      }

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;

      const response = await axios.get(`http://localhost:5000/cartItems?userId=${userId}`);
      const data = response.data;
      
      setCartItems(data);

  
      const totalPrice = data.reduce((total, item) => total + item.product.price * item.quantity, 0);
      let fee = 0;
    
      setTotalPriceWithFee(totalPrice + fee);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []); 

  const handleQuantityChange = async (itemId, newQuantity) => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.put(`http://localhost:5000/cartItems/${itemId}`, {
        quantity: newQuantity
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.data) {
        throw new Error('Failed to update quantity');
      }

      // If the update was successful, fetch the updated cart items again
      fetchCartItems();

    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleUpdateQuantity = async (item, delta) => {
    const newQuantity = item.quantity + delta;
    if (newQuantity >= 0) {
      handleQuantityChange(item._id, newQuantity);
    }
  };

  const handleBuyItems = async () => {
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
    } catch (error) {
      console.error('Error buying items:', error);
    }
  };

  return (
    <div className='p-64'>
      <h2>Cart Items</h2>
      <table>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={item.productId}>
              <td>{item.productId}</td>
              <td>
                <button onClick={() => handleUpdateQuantity(item, -1)}>-</button>
                {item.quantity}
                <button onClick={() => handleUpdateQuantity(item, 1)}>+</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleBuyItems}>Buy Items</button>
    </div>
  );
};

export default ProductRetrieve;

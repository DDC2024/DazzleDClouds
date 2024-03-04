import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; 

function CartItems() {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken'); 
    if (!token) {
      setError('User not authenticated.'); 
      return;
    }

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId; 

    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/cartItems?userId=${userId}`);
        setCartItems(response.data);
        console.log(response)
      } catch (error) {
        setError('An error occurred while fetching cart items.');
      }
    };

    fetchCartItems();
  }, []);

  return (
    <div>
      <h2>Cart Items</h2>
      {error && <p>{error}</p>}
      <ul>
      {cartItems.map((item) => (
  <li key={item._id}>
    <p>User: {item.user.username}</p>
    {item.product && (
      <>
        <p>Product: {item.product.name}</p>
        <p>Quantity: {item.quantity}</p>
        <p>Total Price: {item.product.price}</p>
      </>
    )}
  </li>
))}

      </ul>
    </div>
  );
}

export default CartItems;

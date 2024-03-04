import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WalkIn = ({ userId }) => {
    const [products, setProducts] = useState([]);
    const [inStoreCartItems, setInStoreCartItems] = useState([]);

    const fetchInStoreCartItems = async () => {
        try {
            const response = await axios.get('http://localhost:5000/in-store-cart');
            setInStoreCartItems(response.data);
        } catch (error) {
            console.error('Error fetching in-store cart items:', error);
        }
    };

    useEffect(() => {
        // Fetch products from backend API
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        // Fetch in-store cart items from backend API
        fetchInStoreCartItems();
        fetchProducts();
    }, []);

    const addToCart = async (productId) => {
        try {
            const token = localStorage.getItem('jwtToken');
            if (!token) {
                // Handle case where token is not found
                console.error('JWT token not found in localStorage');
                return;
            }

            const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT token
            const userId = decodedToken.userId; // Extract user ID from decoded token

            const response = await axios.post('http://localhost:5000/in-store-cart', {
                user: userId,
                product: productId,
                quantity: 1 // Assuming quantity is 1 for now
            });
            console.log(response.data.message);
            // Fetch in-store cart items again to update the UI with the latest data
            fetchInStoreCartItems();
        } catch (error) {
            console.error('Error adding item to in-store cart:', error);
            // Optionally, you can display an error message to the user
        }
    };

    const updateQuantity = async (itemId, newQuantity) => {
        try {
            const response = await axios.put(`http://localhost:5000/in-store-cart/${itemId}`, {
                quantity: newQuantity
            });
            console.log(response.data.message);
            // Fetch in-store cart items again to update the UI with the latest data
            fetchInStoreCartItems();
        } catch (error) {
            console.error('Error updating quantity:', error);
            // Optionally, you can display an error message to the user
        }
    };

    const increaseQuantity = async (itemId) => {
        // Find the item in the in-store cart items array
        const itemToUpdate = inStoreCartItems.find(item => item._id === itemId);
        if (itemToUpdate) {
            // Increase the quantity by 1
            const newQuantity = itemToUpdate.quantity + 1;
            // Update the quantity in the backend
            updateQuantity(itemId, newQuantity);
        }
    };

    const decreaseQuantity = async (itemId) => {
        // Find the item in the in-store cart items array
        const itemToUpdate = inStoreCartItems.find(item => item._id === itemId);
        if (itemToUpdate && itemToUpdate.quantity > 1) {
            // Decrease the quantity by 1 if it's greater than 1
            const newQuantity = itemToUpdate.quantity - 1;
            // Update the quantity in the backend
            updateQuantity(itemId, newQuantity);
        }
    };

    const deleteCartItem = async (itemId) => {
        try {
            const response = await axios.delete(`http://localhost:5000/in-store-cart/${itemId}`);
            console.log(response.data.message);
            // Fetch in-store cart items again to update the UI with the latest data
            fetchInStoreCartItems();
        } catch (error) {
            console.error('Error deleting item from in-store cart:', error);
            // Optionally, you can display an error message to the user
        }
    };

    const saveOrder = async () => {
      try {
          // Retrieve the JWT token from localStorage
          const token = localStorage.getItem('jwtToken');
          if (!token) {
              // Handle case where token is not found
              console.error('JWT token not found in localStorage');
              return;
          }
  
          // Decode the JWT token to extract user ID
          const decodedToken = JSON.parse(atob(token.split('.')[1]));
          const userId = decodedToken.userId;
  
          // Aggregate products and quantities into a single array
          const orderProducts = inStoreCartItems.map(item => ({
              product: item.product._id,
              quantity: item.quantity
          }));
  
          // Calculate total amount
          const totalAmount = inStoreCartItems.reduce((total, item) => {
              return total + (item.product.price * item.quantity);
          }, 0);
  
          // Save the order
          const response = await axios.post('http://localhost:5000/storeorders', {
              user: userId,
              products: orderProducts,
              totalAmount: totalAmount
          });
  
          console.log(response.data.message);
  
          // Clear the in-store cart items after saving the order
          setInStoreCartItems([]);
      } catch (error) {
          console.error('Error saving order:', error);
          // Optionally, you can display an error message to the user
      }
  };
  
  

    return (
        <div className="container mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Walk-In Store</h2>
            <div className="grid grid-cols-4 gap-2">
                {products.map(product => (
                    <div key={product._id} className="border rounded-lg p-2">
                        <h3 className="text-lg font-semibold">{product.name}</h3>
                        <p className="text-gray-600">${product.price}</p>
                        <button onClick={() => addToCart(product._id)} className="bg-blue-500 text-white px-3 py-1 mt-2 rounded hover:bg-blue-600">Add</button>
                    </div>
                ))}
            </div>

            <div className="border rounded-lg p-4">
                <h2 className="text-2xl font-semibold mb-4">In-Store Cart</h2>
                <div>
                    {inStoreCartItems.map(cartItem => (
                        <div key={cartItem._id} className="flex items-center justify-between border-b py-2">
                            <div className="flex items-center">
                                <img src={cartItem.product.photoUrl} alt={cartItem.product.name} className="h-12 w-12 object-cover mr-4" />
                                <div>
                                    <h3 className="text-lg font-semibold">{cartItem.product.name}</h3>
                                    <p className="text-gray-600">Quantity: {cartItem.quantity}</p>
                                </div>
                            </div>
                            <div className="flex">
                                <button onClick={() => decreaseQuantity(cartItem._id)} className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300">-</button>
                                <button onClick={() => increaseQuantity(cartItem._id)} className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300">+</button>
                                <button onClick={() => deleteCartItem(cartItem._id)} className="bg-red-500 text-white px-3 py-1 ml-2 rounded hover:bg-red-600">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-4">
                    <p className="text-gray-600 font-semibold">Total Amount:</p>
                    <p className="text-2xl font-bold">${inStoreCartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0).toFixed(2)}</p>
                    <button onClick={saveOrder} className="bg-green-500 text-white px-3 py-1 mt-2 rounded hover:bg-green-600">Save Order</button>
                </div>
            </div>
        </div>
    );
};

export default WalkIn;

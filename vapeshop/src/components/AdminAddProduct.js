import React, { useState } from 'react';
import AdminHeader from './AdminHeader';

const AdminAddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    photoUrl: '',
    description: '',
    quantity: '',
    wholesaleprice: ''
  });

  const categories = [
    'Vape Mod',
    'E-juice',
    'Pod',
    'Accessories',
    'Disposable',
    'Tank',
    'Atomizer'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to add product');
      }
      // Reset the form fields
      setFormData({
        name: '',
        price: '',
        category: '',
        photoUrl: '',
        description: '',
        quantity: '',
        wholesaleprice: ''
      });
      // Optionally, display a success message to the user
    } catch (error) {
      console.error('Error adding product:', error);
      // Optionally, display an error message to the user
    }
  };
  
  return (
    <div className='w-full px-8 py-4 bg-[#f1f5f9]'>
      <AdminHeader />
      <div className="w-full p-8 bg-white shadow-md">
        <h2 className="text-lg font-semibold mb-4">Add Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold mb-1">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-semibold mb-1">Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-semibold mb-1">Category:</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="">Select a category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="photoUrl" className="block text-sm font-semibold mb-1">Photo URL:</label>
            <input
              type="text"
              name="photoUrl"
              value={formData.photoUrl}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-semibold mb-1">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="quantity" className="block text-sm font-semibold mb-1">Quantity:</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="wholesaleprice" className="block text-sm font-semibold mb-1">Wholesale Price:</label>
            <input
              type="number"
              name="wholesaleprice"
              value={formData.wholesaleprice}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default AdminAddProduct;

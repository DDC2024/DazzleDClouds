import React, { useState } from 'react';

const UpdateProductForm = ({ product, onUpdate }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct({
      ...updatedProduct,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(updatedProduct);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">Update Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" id="name" name="name" value={updatedProduct.name} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" placeholder="Name" />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
          <input type="text" id="price" name="price" value={updatedProduct.price} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" placeholder="Price" />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <input type="text" id="category" name="category" value={updatedProduct.category} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" placeholder="Category" />
        </div>
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
          <input type="text" id="quantity" name="quantity" value={updatedProduct.quantity} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" placeholder="Quantity" />
        </div>
        <div>
          <label htmlFor="wholesaleprice" className="block text-sm font-medium text-gray-700">Wholesale Price</label>
          <input type="text" id="wholesaleprice" name="wholesaleprice" value={updatedProduct.wholesaleprice} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" placeholder="Wholesale Price" />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Update</button>
      </form>
    </div>
  );
};

export default UpdateProductForm;

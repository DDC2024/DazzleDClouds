import React, { useState, useEffect } from 'react';
import AdminHeader from './AdminHeader';
import MyTable from './MyTable'; 
import CustomModal from './CustomModal';
import UpdateProductForm from '../pages/UpdateProductForm';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faSmoking, faStar, faTint, faTrash } from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from 'jwt-decode'; 

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
          setFilteredProducts(data); 
          throw new Error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();

    // Get user role from localStorage
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserRole(decodedToken.role); // Set user role from decoded token
    }
  }, []);

  const calculateTotalValue = () => {
    return products.reduce((total, product) => {
      return total + (product.price * product.quantity);
    }, 0);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    filterProducts(event.target.value);
  };

  const filterProducts = (query) => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleDelete = (productId) => {
    console.log('Deleting product with ID:', productId);
  };

  const handleUpdate = (updatedProduct) => {
    console.log('Updating product:', updatedProduct);
    setIsModalOpen(false);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  let columns = [
    { Header: 'Name', accessor: 'name' },
    { Header: 'Price', accessor: 'price' },
    { Header: 'Quantity', accessor: 'quantity' },
  ];
  
  // userRole 
  if (userRole !== 'staff') {
    columns.push(
      { Header: 'Category', accessor: 'category' },
      { Header: 'Wholesale Price', accessor: 'wholesaleprice' },
      { Header: 'Total Product Price', accessor: 'totalProductPrice', Cell: ({ row }) => row.original.price * row.original.quantity },
      { Header: 'Total Wholesale Price', accessor: 'totalWholesalePrice', Cell: ({ row }) => row.original.wholesaleprice * row.original.quantity },
    );
  }
  
  // Add Actions column at the end
  columns.push({
    Header: 'Actions',
    accessor: 'actions',
    Cell: ({ row }) => (
      <div className="flex space-x-2">
        {userRole !== 'staff' && (
          <button onClick={() => handleDelete(row.original.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md">
            <FontAwesomeIcon icon={faTrash}/>
          </button>
        )}
        <button onClick={() => handleEdit(row.original)} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md">
          <FontAwesomeIcon icon={faPen} />
        </button>
      </div>
    ),
  });
  

  return (
    <div className='w-full min-h-screen py-16'>
      <AdminHeader />
      <div className="p-8 bg-white shadow-md">
        <h2 className="text-lg font-semibold mb-4">Product List</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="px-4 py-2 border rounded-md w-2/6"
          />
        </div>
        <CustomModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
          <UpdateProductForm product={selectedProduct} onUpdate={handleUpdate} />
        </CustomModal>
        <MyTable data={filteredProducts} columns={columns} />
       {userRole ==! 'staff' ?  <div className="mt-4">
          <p className="text-lg font-semibold">Total Value of Inventory: P {calculateTotalValue()}</p>
        </div> : null}
      </div>
    </div>
  );
};

export default AdminProductList;

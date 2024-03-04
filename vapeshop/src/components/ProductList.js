import React, { useState, useEffect } from 'react';
import CustomModal from './CustomModal'; 
import ProductDetails from './ProductDetails';
import background from "../assets/back2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPesoSign } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from '../components/AppContext';

const ProductList = () => {
  const { handleAddToCart } = useAuth();
  const categories = ['All', 'Vape Mod', 'E-juice', 'Pod', 'Accessories', 'Disposable', 'Tank', 'Atomizer'];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('lowToHigh');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  let sortedProducts = [...products];

  if (selectedCategory !== 'All') {
    sortedProducts = sortedProducts.filter(product => product.category === selectedCategory);
  }

  sortedProducts.sort((a, b) => {
    if (sortOrder === 'lowToHigh') {
      return a.Price - b.Price;
    } else {
      return b.Price - a.Price;
    }
  });

  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(sortedProducts.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <section className='min-h-screen'>
      <div className='bg-black min-h-screen py-10 px-4 md:px-24 space-x-2' style={{ minHeight: "100vh", backgroundImage: `url(${background})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }} >
        <div className='flex items-center justify-between flex-wrap'>
          <span className='text-white'>Show from : </span>
          <select className='bg-[#1d1d1d] text-white p-1 rounded' onChange={handleSortOrderChange}>
            <option value='lowToHigh'>Price Low to High</option>
            <option value='highToLow'>Price High to Low</option>
          </select>
        </div>
        <div className='flex flex-wrap justify-center md:justify-start'>
          <div className='w-full md:w-1/4 p-2'>
            <div className='bg-[#1d1d1d] p-4 rounded-lg'>
              <h2 className='text-gradient text-3xl font-bold mb-4'>Categories</h2>
              <ul className='space-y-2'>
                {categories.map((category, index) => (
                  <li key={index} className={`text-gray-300 hover:text-[#7c41ac] cursor-pointer ${selectedCategory === category ? 'font-bold' : ''}`} onClick={() => handleCategoryClick(category)}>
                    {category}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className='w-full md:w-3/4 p-4'>
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6'>
              {currentProducts.map(product => (
                <div key={product.ID} onClick={() => openModal(product)} className="rounded-lg cursor-pointer overflow-hidden border border-gray-500 shadow-md p-2">
                  <img src={product.photoUrl} alt={product.Name} className="w-full h-auto sm:h-48 md:h-64 lg:h-72 xl:h-80" style={{ maxHeight: '220px' }} />
                  <div className="p-4 space-y-3">
                    <h2 className="text-lg text-white font-semibold">{product.name}</h2>
                    <p className="text-gray-300 text-sm">Price: <span><FontAwesomeIcon icon={faPesoSign} /></span>{product.price}</p>
                    <button onClick={(event) => { event.stopPropagation(); handleAddToCart(product, quantity); }} className="bg-[#623288] hover:bg-[#7c41ac] text-white font-bold py-1 px-2 rounded sm:text-sm">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4">
              {pageNumbers.map(number => (
                <button key={number} onClick={() => handlePageChange(number)} className="mx-1 px-3 py-1 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">{number}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <CustomModal isOpen={isModalOpen} onRequestClose={closeModal}>
        {selectedProduct && <ProductDetails product={selectedProduct} />}
      </CustomModal>
    </section>
  );
};

export default ProductList;

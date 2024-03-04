import React from 'react'
import MainNavigation from '../components/MainNavigation'
import ProductList from '../components/ProductList'
import "../components/style.css";


const ProductShop = () => {

   


  return (
    <div className="flex flex-col min-h-screen">
    {/* Navbar */}
  
  {/* Hero Section */}
<div className="relative hero 0 p-16 text-white mt-10" >

  <div className="relative z-10 text-center">
    <h1 className="text-5xl text-gradient2 font-bold mb-4">Experience the Art of Vaping</h1>
    <p className="text-lg mb-8">Discover a curated selection of premium vaping products tailored for enthusiasts.</p>

    <button className="bg-[#4A235A] text-white px-8 py-3 rounded-full hover:bg-[#4a2563] transition duration-300">Explore Now</button>
  </div> 
</div>

{/* Productlist */}

<ProductList/>


  
  </div>
  )
}

export default ProductShop
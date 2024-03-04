import React, { useState } from 'react';

const ProductDetails = ({ product }) => {

    const [quantity, setQuantity] = useState(0);

    return (
        <div className='flex items-center' data-aos="zoom-in-left">
            <div className='bg-gray-300 px-6 flex py-8 justify-between'>
                <div className='w-2/5'>
                    <div style={{ height: '300px' }}>
                        <img src={product.photoUrl} alt={product.name} className='h-full object-contain' />
                    </div>
                </div>
                <div className='w-2/3'>
                    <h2 className='text-xl font-semibold'>{product.name}</h2>
                    <p className='text-gray-500'>Category: {product.category}</p>
                    <p className='text-gray-500'>Description: {product.description}</p>
                    <p className='text-gray-500'>Price: ${product.price}</p>
                    <div className='flex items-center'>
                        <p className='mr-2'>Quantity:</p>
                        <div>
                            <button>+</button> {quantity} <button>-</button>
                        </div>
                    </div>

                    <div className='flex mt-10 justify-around'>
                        <button className='bg-[#623288] py-1 px-4 w-full rounded text-white'>Buy Now</button>
                        <button className='w-full'>Add to Cart</button>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default ProductDetails;

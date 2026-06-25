import React from 'react'
import { Link } from 'react-router-dom'


export const ProductCard = ({ product }) => {
    return (
        <div className='bg-white rounded-xl border border-gray-100 shadow-md p-4  hover:shadow-xl hover:-translate-y-1 transition-all duration-300 '>
            <img src={product.image}
                className='h-40 w-full object-contain mb-4' />
            <h1 className=' font-bold text-gray-800 h-14 overflow-hidden'>{product.title}</h1>
            <p className=' text-green-600 font-bold text-xl mt-2'>${product.price}</p>
            <p className='text-gray-500 text-sm '>{product.category}</p>

            <Link
                to={`/product/${product.id}`}
                className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                View Details

            </Link>
        </div>
    )
}

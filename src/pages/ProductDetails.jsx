import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getProductById } from '../services/getProduct'

export const ProductDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [product, setProduct] = useState(null)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await getProductById(id)
                // console.log(res);

                if (!res) {
                    setError(" product not found")
                }



                setProduct(res)
            } catch (error) {
                console.log(error.message);



            }
        }

        fetchProduct()
    }, [id])


    if (error) {
        return (
            <div className='h-screen w-screen bg-gray-100 flex flex-col justify-center items-center'>
                <h1 className='text-4xl font-bold text-gray-800'>{error}</h1>

                <p className="text-gray-600 mt-3">
                    The product you're looking for doesn't exist.
                </p>

                <button onClick={() => navigate("/")}
                    className="mb-6 mt-6 px-5 py-2.5 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition">
                    Back to Products
                </button>

            </div>
        )
    }

    if (!product) {
        return (
            <div className='h-screen w-screen bg-gray-100 flex justify-center items-center'>
                <h1 className='text-4xl font-bold text-gray-800 animate-pulse'>Loading...</h1>
            </div>
        )
    }



    return (
        <div className=' min-h-screen max-h-screen bg-gray-200 flex justify-center items-center p-7'>
            <div className='bg-white p-10 w-full max-w-5xl border border-gray-100 rounded-2xl shadow-xl'>
                <button onClick={() => navigate("/")}
                    className="mb-6 px-5 py-2.5 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition">
                    Back
                </button>
                <div className=' grid md:grid-cols-2 gap-10'>
                    <div className='flex justify-center items-center bg-gray-100 rounded-xl p-8'>

                        <img src={product.image} alt={product.title}
                            className="h-80 object-contain hover:scale-105 transition duration-300" />
                    </div>

                    <div>

                        <h1 className='text-3xl font-bold text-gray-700 leading-tight'>{product.title}</h1>

                        <p className='text-4xl font-bold text-green-600 mt-5'>
                            ${product.price}
                        </p>

                        <span className='inline-block mt-4 px-4 bg-blue-100 text-blue-700 rounded-full text-sm font font-medium'>
                            {product.category}
                        </span>
                        <div className="mt-5 flex items-center gap-2">

                            ⭐

                            <span className="font-semibold">
                                {product.rating.rate}
                            </span>

                            <span className="text-gray-500">
                                ({product.rating.count} Reviews)
                            </span>

                        </div>
                    </div>
                </div>

                <div className="mt-8">

                    <h2 className="text-xl font-bold mb-3">
                        Description
                    </h2>

                    <p className="text-gray-600 leading-8">
                        {product.description}
                    </p>

                </div>
                <div className="mt-8 flex gap-4">

                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                        Buy Now
                    </button>

                    <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50">
                        Add to Cart
                    </button>

                </div>
            </div>
        </div>
    )
}

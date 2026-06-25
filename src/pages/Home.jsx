import React, { useEffect, useState } from 'react'
import { getProducts } from '../services/getProduct'
import { ProductCard } from '../components/ProductCard'

export const Home = () => {

  const [products, setProducts] = useState([])
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts()

        // console.log(res);

        setProducts(res)

      } catch (error) {
        setError(error.message)
      }
    }

    fetchProducts()
  }, [])


  const filterProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesCategory = category === "All" || product.category === category

    return matchesSearch && matchesCategory
  })



  return (
    <div className='min-h-screen bg-gray-100 p-6 '>

      <h1 className='text-4xl font-bold text-center mb-8 '> Product Store </h1>
      <p className='text-center text-gray-500 mb-8'>Discover Amaziing Products</p>

      <div className="flex justify-center gap-3 flex-wrap mb-8">

        <button
          onClick={() => setCategory("All")}
          className={`px-4 py-2 rounded-lg ${category === "All"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-400"
            }`}
        >
          All
        </button>

        <button
          onClick={() => setCategory("electronics")}
          className={`px-4 py-2  rounded-lg 
            ${category === "electronics"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-400"}`}
        >
          Electronics
        </button>

        <button
          onClick={() => setCategory("jewelery")}
          className={`px-4 py-2  rounded-lg 
            ${category === "jewelery"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-400"}`}
        >
          Jewelery
        </button>

        <button
          onClick={() => setCategory("men's clothing")}
          className={`px-4 py-2  rounded-lg 
            ${category === "men's clothing"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-400"}`}
        >
          Men's
        </button>

        <button
          onClick={() => setCategory("women's clothing")}
          className={`px-4 py-2  rounded-lg 
            ${category === "women's clothing"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-400"}`}
        >
          Women's
        </button>

      </div>

      <input type="text"
        placeholder='Search products...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='w-full max-w-md mx-auto mb-7 p-3 rounded-lg border block border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ' />

      {
        filterProducts.length === 0 && (
          <div className='text-center py-4'>
            <h1 className='text-3xl font-semibold text-gray-700 '>
              No Product Found
            </h1>
            <p className='text-gray-500 mt-2'>
              Try searching with another keyword
            </p>
          </div>
        )
      }
      <p className='text-center text-sm text-gray-500 mb-6'>Total Products: {products.length}</p>

      <div className=' grid  md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {
          filterProducts.map((product) => (

            <ProductCard
              key={product.id}
              product={product} />
          ))
        }
      </div>
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import './TreandingProduct.css'
import { useNavigate } from 'react-router-dom'
import { useWishlist } from '../WishlistContext/WishlistContext'
import { getAllProducts } from '../../Api/productApi'

function TreandingProduct() {
  const [selectedCategory, setSelectedCategory] = useState('featured')
  const [hoverIndex, setHoverIndex] = useState(null)
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [newArrivals, setNewArrivals] = useState([])
  const [bestSellers, setBestSellers] = useState([])
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()
  const { addToWishlist } = useWishlist()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getAllProducts()

        // Example logic - customize this based on real data
        setFeaturedProducts(allProducts.data.slice(0, 8))
        setNewArrivals(allProducts.data.slice(8, 16))
        setBestSellers(allProducts.data.slice(16, 24))

        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch products", error)
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  let productsToDisplay = []

if (selectedCategory === 'featured') {
  productsToDisplay = Array.isArray(featuredProducts) ? featuredProducts : []
} else if (selectedCategory === 'new') {
  productsToDisplay = Array.isArray(newArrivals) ? newArrivals : []
} else if (selectedCategory === 'best') {
  productsToDisplay = Array.isArray(bestSellers) ? bestSellers : []
}

  return (
    <div className='trending-product-container'>
      <h1>TRENDING PRODUCT</h1>

      <div className='features-btn'>
        <button
          className={selectedCategory === 'featured' ? 'active' : ''}
          onClick={() => setSelectedCategory('featured')}
        >
          Featured
        </button>
        <button
          className={selectedCategory === 'new' ? 'active' : ''}
          onClick={() => setSelectedCategory('new')}
        >
          New Arrivals
        </button>
        <button
          className={selectedCategory === 'best' ? 'active' : ''}
          onClick={() => setSelectedCategory('best')}
        >
          Best Sellers
        </button>
      </div>

      {loading ? (
        <div className="loading-spinner">Loading products...</div>
      ) : (
        <div className='grid-box-container'>
          {productsToDisplay.map((product, index) => {
            const activeDot = hoverIndex === index ? 1 : 0
            const mainImage = product.images?.[0] || '/fallback-image.jpg'

            return (
              <div
                className='data-grid'
                key={product._id}
                onMouseEnter={() => setHoverIndex(index+1)}
                onMouseLeave={() => setHoverIndex(index)}
              >
                <div
                  className='image-wrapper'
                  onClick={() =>
                    navigate(`/product/${product._id}`, { state: { product } })
                  }
                >
                  <img
                    src={mainImage}
                    alt={product.name}
                    onError={(e) => (e.target.src = '/fallback-image.jpg')}
                  />
                  <div className='star-overlay'>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                  </div>
                  <div className='hover-icons'>
                    <i
                      className="bi bi-heart"
                      style={{ cursor: 'pointer' }}
                      onClick={(e) => {
                        e.stopPropagation()
                        addToWishlist(product)
                      }}
                    ></i>
                    <i className="bi bi-eye"></i>
                  </div>
                </div>
                <p>{product.name}</p>
                <p>{product.price}</p>
                <div className="dots-container">
                  <span className={`dot ${activeDot === 0 ? 'active' : ''}`}></span>
                  <span className={`dot ${activeDot === 1 ? 'active' : ''}`}></span>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <button
        className='trending-product-view-all-btn'
        onClick={() => navigate('/all-product')}
      >
        VIEW ALL
      </button>
    </div>
  )
}

export default TreandingProduct

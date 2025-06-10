import React, { useState } from 'react'
import './TreandingProduct.css'
import TPImage1 from '../../Assets/p1.webp'
import TPImage2 from '../../Assets/p2.webp'
import TPImage3 from '../../Assets/p3.webp'
import TPImage4 from '../../Assets/p4.webp'
import TPImage5 from '../../Assets/p5.webp'
import TPImage6 from '../../Assets/p6.webp'
import TPImage7 from '../../Assets/p1.webp'
import TPImage8 from '../../Assets/p8.webp'
import { useNavigate } from 'react-router-dom'
import { useWishlist } from '../WishlistContext/WishlistContext'
// Products with hover images added
const featuredProducts = [
  { image: TPImage1,bottomImages:[TPImage2,TPImage3,TPImage4,TPImage5], hoverImage: TPImage2, text: "Aliqunaim Retrum Mollis", price: "$ 18.00",type:"organics" },
  { image: TPImage2,bottomImages:[TPImage2,TPImage3,TPImage4,TPImage5], hoverImage: TPImage3, text: "American Grapes", price: "$ 17.00",type:"organics" },
  { image: TPImage3,bottomImages:[TPImage2,TPImage3,TPImage4,TPImage5], hoverImage: TPImage4, text: "Autum Eua Guide", price: "$ 16.00",type:"organics" },
  { image: TPImage4,bottomImages:[TPImage2,TPImage3,TPImage4,TPImage5], hoverImage: TPImage5, text: "Consectuar Adipicing", price: "$ 15.00",type:"organics" }, 
  { image: TPImage7,bottomImages:[TPImage2,TPImage3,TPImage4,TPImage5], hoverImage: TPImage6, text: "Fuse Fermentum", price: "$ 12.00",type:"organics" },
  { image: TPImage8,bottomImages:[TPImage2,TPImage3,TPImage4,TPImage5], hoverImage: TPImage1, text: "Maruis Bibendum", price: "$ 10.00" ,type:"organics"},
  { image: TPImage3,bottomImages:[TPImage2,TPImage3,TPImage4,TPImage5], hoverImage: TPImage7, text: "Mustard", price: "$ 15.00",type:"organics" },
  { image: TPImage4,bottomImages:[TPImage2,TPImage3,TPImage4,TPImage5], hoverImage: TPImage8, text: "Organic Chilli", price: "$ 14.00" ,type:"organics"}
]

const newArrivals = [
  { image: TPImage5,bottomImages:[TPImage2,TPImage3,TPImage4,TPImage5], hoverImage: TPImage6, text: "Unique Omnesque", price: "$ 14.00",type:"organics" },
  { image: TPImage6,bottomImages:[TPImage2,TPImage3,TPImage4,TPImage5], hoverImage: TPImage7, text: "Printed Chiffon Dress", price: "$ 13.00" ,type:"organics"},
  { image: TPImage1,bottomImages:[TPImage2,TPImage3,TPImage4,TPImage5], hoverImage: TPImage8, text: "Denim Skirt", price: "$ 12.00" ,type:"organics"},
  { image: TPImage2,bottomImages:[TPImage2,TPImage3,TPImage4,TPImage5], hoverImage: TPImage3, text: "Soft Wool Scarf", price: "$ 11.00" ,type:"organics"},
  { image: TPImage7,bottomImages:[TPImage2,TPImage3,TPImage4,TPImage5], hoverImage: TPImage4, text: "Mug Today is Good Day", price: "$ 12.00",type:"organics" },
  { image: TPImage8,bottomImages:[TPImage2,TPImage3,TPImage4,TPImage5], hoverImage: TPImage5, text: "Brown Bear Cushion", price: "$ 10.00",type:"organics" },
  { image: TPImage3,bottomImages:[TPImage2,TPImage3,TPImage4,TPImage5], hoverImage: TPImage1, text: "Retro Style T-shirt", price: "$ 15.00" ,type:"organics"},
  { image: TPImage4,bottomImages:[TPImage2,TPImage3,TPImage4,TPImage5], hoverImage: TPImage2, text: "Casual Summer Top", price: "$ 14.00" ,type:"organics"}
]

const bestSellers = [
  { image: TPImage7,bottomImages:[TPImage2,TPImage3,TPImage4,TPImage5], hoverImage: TPImage3, text: "Mug Today is Good Day", price: "$ 12.00",type:"organics" },
  { image: TPImage8,bottomImages:[TPImage2,TPImage3,TPImage4,TPImage5], hoverImage: TPImage4, text: "Brown Bear Cushion", price: "$ 10.00",type:"organics" },
  { image: TPImage3,bottomImages:[TPImage2,TPImage3,TPImage4,TPImage5], hoverImage: TPImage5, text: "Retro Style T-shirt", price: "$ 15.00" ,type:"organics"},
  { image: TPImage4,bottomImages:[TPImage2,TPImage3,TPImage4,TPImage5], hoverImage: TPImage6, text: "Casual Summer Top", price: "$ 14.00" ,type:"organics"},
  { image: TPImage1,bottomImages:[TPImage2,TPImage3,TPImage4,TPImage5], hoverImage: TPImage7, text: "Printed Long Skrit", price: "$ 18.00",type:"organics" },
  { image: TPImage2,bottomImages:[TPImage2,TPImage3,TPImage4,TPImage5], hoverImage: TPImage8, text: "Pellenteque Et Phatera", price: "$ 17.00",type:"organics" },
  { image: TPImage3,bottomImages:[TPImage2,TPImage3,TPImage4,TPImage5], hoverImage: TPImage1, text: "Simul Dorolman Voluptoria", price: "$ 16.00",type:"organics" },
  { image: TPImage4,bottomImages:[TPImage2,TPImage3,TPImage4,TPImage5], hoverImage: TPImage2, text: "Malesuadai Facilities Velit", price: "$ 15.00",type:"organics" }, 
]

function TreandingProduct() {
  const [selectedCategory, setSelectedCategory] = useState('featured')
  const [hoverIndex, setHoverIndex] = useState(null)
  const navigate = useNavigate()
  const { addToWishlist } = useWishlist();
  let productsToDisplay
  if (selectedCategory === 'featured') productsToDisplay = featuredProducts
  else if (selectedCategory === 'new') productsToDisplay = newArrivals
  else if (selectedCategory === 'best') productsToDisplay = bestSellers
  
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

      <div className='grid-box-container'>
        {productsToDisplay.map((data, index) => {
          const activeDot = hoverIndex === index ? 1 : 0;

          return (
            <div 
              className='data-grid' 
              key={index}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <div className='image-wrapper' onClick={() => navigate(`/product/${data.text}`, { state: { product: data } })}>
                <img 
                  src={hoverIndex === index ? data.hoverImage : data.image} 
                  alt={`product-${index}`} 
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
                      e.stopPropagation(); // prevent navigating
                      addToWishlist(data); // 👈 add to wishlist
                    }}
                  ></i>
                  <i className="bi bi-eye"></i>
                </div>
              </div>
              <p>{data.text}</p>
              <p>{data.price}</p>

              {/* Dots */}
              <div className="dots-container">
                <span className={`dot ${activeDot === 0 ? 'active' : ''}`}></span>
                <span className={`dot ${activeDot === 1 ? 'active' : ''}`}></span>
              </div>
            </div>
          )
        })}
      </div>

      <button className='trending-product-view-all-btn' onClick={()=>navigate('/all-product')}>VIEW ALL</button>
    </div>
  )
}

export default TreandingProduct

import React, { useState } from 'react'
import './TreandingProduct.css'
import TPImage1 from '../../Assets/TP1.webp'
import TPImage2 from '../../Assets/TP2.webp'
import TPImage3 from '../../Assets/TP3.webp'
import TPImage4 from '../../Assets/TP4.webp'
import TPImage5 from '../../Assets/TP5.webp'
import TPImage6 from '../../Assets/TP6.webp'
import TPImage7 from '../../Assets/TP7.webp'
import TPImage8 from '../../Assets/TP8.webp'

// Define product lists for each category
const featuredProducts = [
  { image: TPImage1, text: "Printed Long Skrit", price: "$ 18.00" },
  { image: TPImage2, text: "Pellenteque Et Phatera", price: "$ 17.00" },
  { image: TPImage3, text: "Simul Dorolman Voluptoria", price: "$ 16.00" },
  { image: TPImage4, text: "Malesuadai Facilities Velit", price: "$ 15.00" }, 
   { image: TPImage7, text: "Mug Today is Good Day", price: "$ 12.00" },
  { image: TPImage8, text: "Brown Bear Cushion", price: "$ 10.00" },
  { image: TPImage3, text: "Retro Style T-shirt", price: "$ 15.00" },
  { image: TPImage4, text: "Casual Summer Top", price: "$ 14.00" }
]

const newArrivals = [
  { image: TPImage5, text: "Unique Omnesque", price: "$ 14.00" },
  { image: TPImage6, text: "Printed Chiffon Dress", price: "$ 13.00" },
  { image: TPImage1, text: "Denim Skirt", price: "$ 12.00" },
  { image: TPImage2, text: "Soft Wool Scarf", price: "$ 11.00" },
  { image: TPImage7, text: "Mug Today is Good Day", price: "$ 12.00" },
  { image: TPImage8, text: "Brown Bear Cushion", price: "$ 10.00" },
  { image: TPImage3, text: "Retro Style T-shirt", price: "$ 15.00" },
  { image: TPImage4, text: "Casual Summer Top", price: "$ 14.00" }
]

const bestSellers = [
  { image: TPImage7, text: "Mug Today is Good Day", price: "$ 12.00" },
  { image: TPImage8, text: "Brown Bear Cushion", price: "$ 10.00" },
  { image: TPImage3, text: "Retro Style T-shirt", price: "$ 15.00" },
  { image: TPImage4, text: "Casual Summer Top", price: "$ 14.00" },
  { image: TPImage1, text: "Printed Long Skrit", price: "$ 18.00" },
  { image: TPImage2, text: "Pellenteque Et Phatera", price: "$ 17.00" },
  { image: TPImage3, text: "Simul Dorolman Voluptoria", price: "$ 16.00" },
  { image: TPImage4, text: "Malesuadai Facilities Velit", price: "$ 15.00" }, 
]

function TreandingProduct() {
  const [selectedCategory, setSelectedCategory] = useState('featured')

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
        {productsToDisplay.map((data, index) => (
          <div className='data-grid' key={index}>
            <div className='image-wrapper'>
              <img src={data.image} alt={`product-${index}`} />
              <div className='star-overlay'>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
              </div>
              <div className='hover-icons'>
                <i className="bi bi-heart"></i>
                <i className="bi bi-eye"></i>
              </div>
            </div>
            <p>{data.text}</p>
            <p>{data.price}</p>
          </div>
        ))}
      </div>

      <button className='trending-product-view-all-btn'>VIEW ALL</button>
    </div>
  )
}

export default TreandingProduct

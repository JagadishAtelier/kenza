import React from 'react'
import './SpecialProduct.css'
import TPImage1 from '../../Assets/TP1.webp'
import TPImage2 from '../../Assets/TP2.webp'
import TPImage3 from '../../Assets/TP3.webp'
import TPImage4 from '../../Assets/TP4.webp'
import TPImage5 from '../../Assets/TP5.webp'
import TPImage6 from '../../Assets/TP6.webp'
import TPImage7 from '../../Assets/TP7.webp'
import TPImage8 from '../../Assets/TP8.webp'
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
function SpecialProduct() {
  return (
    <div>
        <div className='spl-heading'>
            <h1>SPECIAL PRODUCT</h1>
        </div>
    <div className='spl-grid-box-container'>
    {featuredProducts.map((data, index) => (
      <div className='spl-data-grid' key={index}>
        <div className='spl-image-wrapper'>
          <img src={data.image} alt={`spl-product-${index}`} />
          <div className='spl-star-overlay'>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
          </div>
          <div className='spl-hover-icons'>
            <i className="bi bi-heart"></i>
            <i className="bi bi-eye"></i>
          </div>
        </div>
        <div className='spl-para-text'>
        <p>{data.text}</p>
        <p>{data.price}</p>
        </div>
      </div>
    ))}
  </div>
  <div className='spl-view-btn'>
  <button className='spl-trending-product-view-all-btn'>VIEW ALL</button>
  </div>
  </div>
  )
}

export default SpecialProduct

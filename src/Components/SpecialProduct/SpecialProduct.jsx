import React from 'react'
import './SpecialProduct.css'
import TPImage1 from '../../Assets/p1.webp'
import TPImage2 from '../../Assets/p2.webp'
import TPImage3 from '../../Assets/p3.webp'
import TPImage4 from '../../Assets/p4.webp'
import TPImage5 from '../../Assets/p5.webp'
import TPImage6 from '../../Assets/p6.webp'
import TPImage7 from '../../Assets/p8.webp'
import TPImage8 from '../../Assets/p1.webp'
import { useNavigate } from 'react-router-dom'
const featuredProducts = [
    { image: TPImage1, text: "Printed Long Skrit", price: "$ 18.00" },
    { image: TPImage2, text: "Pellenteque Et Phatera", price: "$ 17.00" },
    { image: TPImage3, text: "Simul Dorolman Voluptoria", price: "$ 16.00" },
    { image: TPImage4, text: "Malesuadai Facilities Velit", price: "$ 15.00" }, 
     { image: TPImage5, text: "Mug Today is Good Day", price: "$ 12.00" },
    { image: TPImage6, text: "Brown Bear Cushion", price: "$ 10.00" },
  ]
function SpecialProduct() {
  const navigate = useNavigate()
  return (
    <div className='special-conatiner'>
        <div className='spl-heading'>
            <h1>SPECIAL PRODUCT</h1>
        </div>
    <div className='spl-grid-box-container'>
    {featuredProducts.map((data, index) => (
      <div className='spl-data-grid' key={index}onClick={() => navigate(`/product/${data.text}`, { state: { product: data } })}>
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
  <button className='spl-trending-product-view-all-btn' onClick={()=>navigate('/all-product')}>VIEW ALL</button>
  </div>
  </div>
  )
}

export default SpecialProduct

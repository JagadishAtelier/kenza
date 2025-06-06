import React from 'react'
import './ShopPage.css'
import TPImage1 from '../../Assets/p1.webp'
import TPImage2 from '../../Assets/p2.webp'
import TPImage3 from '../../Assets/p3.webp'
import TPImage4 from '../../Assets/p4.webp'
import TPImage5 from '../../Assets/p5.webp'
import TPImage6 from '../../Assets/p6.webp'
import TPImage7 from '../../Assets/p1.webp'
import TPImage8 from '../../Assets/p8.webp'
import { useNavigate } from 'react-router-dom'
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
function ShopPage() {
    const navigate = useNavigate()
  return (
    <div>
        <div style={{marginTop:"7%",textAlign:"center"}}>
            <h1>COLLECTION</h1>
        </div>
    <div className='grid-box-container'>
    {featuredProducts.map((data, index) => {

      return (
        <div 
          className='data-grid' 
          key={index}
        >
          <div className='image-wrapper' onClick={() => navigate('/all-product')}>
            <img 
              src={data.image} 
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
              <i className="bi bi-heart"></i>
              <i className="bi bi-eye"></i>
            </div>
          </div>
          <p>{data.text}</p>
          <p>{data.price}</p>
          <button className='shop-page-shop-now-btn' onClick={() => navigate('/all-product')}>SHOP NOW</button>
        </div>
      )
    })}
  </div>
  </div>
  )
}

export default ShopPage

import React from 'react'
import './TopCategories.css'
import image1 from '../../Assets/d1.png'
import image2 from '../../Assets/d2.png'
import image3 from '../../Assets/d3.png'
import image4 from '../../Assets/d4.png'
const data = [
    {image : image1,text : "FREE WORLDWIDE DELIVERY",para : "Enjoy the convenience of free worldwide delivery on all your orders. No matter where you are, we make sure your favorite products reach you quickly and safely"},
    {image : image2,text : "24X7 SUPPORT ASSISTENCE",para : "Our dedicated support team is available 24/7 to assist you with any questions or concerns."},
    {image : image3,text : "FREE GIFT VOUCHER",para : " Treat yourself or someone special to exclusive discounts and surprises, making your shopping experience even more rewarding."},
    {image : image4,text : "MONEY BACK GAURENTEE",para : "Shop with confidence knowing that we offer a money-back guarantee. "},
]
function TopCategories() {
  return (
    <div className='top-cat-container'>
      <div className='top-cat-content'>
      {data.map((item,index)=>(
        <div className='top-cat-image-text'>
            <div className='top-cat-image'>
              <img src={item.image}/>
            </div>
            <h6>{item.text}</h6>
            <p>{item.para}</p>
        </div>
      ))}
      </div>
    </div>
  )
}

export default TopCategories

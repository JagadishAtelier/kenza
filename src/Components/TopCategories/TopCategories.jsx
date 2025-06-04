import React from 'react'
import './TopCategories.css'
import image1 from '../../Assets/d1.png'
import image2 from '../../Assets/d2.png'
import image3 from '../../Assets/d3.png'
import image4 from '../../Assets/d4.png'
const data = [
    {image : image1,text : "FREE WORLDWIDE DELIVERY",para : "lorem Ipsum Is Dummy Text"},
    {image : image2,text : "24X7 SUPPORT ASSISTENCE",para : "lorem Ipsum Is Dummy Text"},
    {image : image3,text : "FREE GIFT VOUCHER",para : "lorem Ipsum Is Dummy Text"},
    {image : image4,text : "MONEY BACK GAURENTEE",para : "lorem Ipsum Is Dummy Text"},
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

import React from 'react'
import './TopCategories.css'
import image1 from '../../Assets/tc1.avif'
import image2 from '../../Assets/c2.avif'
import image3 from '../../Assets/c3.avif'
import image4 from '../../Assets/c4.avif'
import image5 from '../../Assets/c5.avif'
import image6 from '../../Assets/c6.avif'
const data = [
    {image : image1,text : "Men"},
    {image : image2,text : "Girls"},
    {image : image3,text : "Shoes"},
    {image : image4,text : "Accessories"},
    {image : image5,text : "Jeans"},
    {image : image6,text : "Causals"},
]
function TopCategories() {
  return (
    <div className='top-cat-container'>
        <div className='heading-text-top-cat'>
        <h1>TOP CATEGORIES</h1>
        </div>
      <div className='top-cat-content'>
      {data.map((item,index)=>(
        <div className='top-cat-image-text'>
            <img src={item.image}/>
            <p>{item.text}</p>
        </div>
      ))}
      </div>
    </div>
  )
}

export default TopCategories

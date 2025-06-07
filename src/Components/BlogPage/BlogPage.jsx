import React from 'react'
import './BlogPage.css'
import image1 from '../../Assets/o1.webp'
import image2 from '../../Assets/o2.webp'
import image3 from '../../Assets/o3.webp'
import image4 from '../../Assets/o4.webp'
import image5 from '../../Assets/o5.webp'
import image6 from '../../Assets/o6.webp'
import { useNavigate } from 'react-router-dom'
const data = [
    {image : image1 , 
    para : "Faded short sleeves t-shirt with high neckline. Soft and stretchy material for a comfortable fit. Accessorize with a straw hat",
    head : "Viderer voluptatum te eum",
    date : "Dec 18 2025", admin : "KENZA Admin"},
    {image : image2 , 
    para : "Faded short sleeves t-shirt with high neckline. Soft and stretchy material for a comfortable fit. Accessorize with a straw hat",
    head : "Viderer voluptatum te eum",
    date : "Dec 18 2025", admin : "KENZA Admin"},
    {image : image3 , 
    para : "Faded short sleeves t-shirt with high neckline. Soft and stretchy material for a comfortable fit. Accessorize with a straw hat",
    head : "Viderer voluptatum te eum",
    date : "Dec 18 2025", admin : "KENZA Admin"},
    {image : image4 , 
    para : "Faded short sleeves t-shirt with high neckline. Soft and stretchy material for a comfortable fit. Accessorize with a straw hat",
    head : "Viderer voluptatum te eum",
    date : "Dec 18 2025", admin : "KENZA Admin"},
    {image : image5 , 
    para : "Faded short sleeves t-shirt with high neckline. Soft and stretchy material for a comfortable fit. Accessorize with a straw hat",
    head : "Viderer voluptatum te eum",
    date : "Dec 18 2025", admin : "KENZA Admin"},
    {image : image6 , 
    para : "Faded short sleeves t-shirt with high neckline. Soft and stretchy material for a comfortable fit. Accessorize with a straw hat",
    head : "Viderer voluptatum te eum",
    date : "Dec 18 2025", admin : "KENZA Admin"},
]
function BlogPage() {
    const navigate = useNavigate()
  return (
    <div className='blog-conatiner'>
      <div className='blog-conatiner-heading'>
        <h1>Organics</h1>
      </div>
      <div className='blog-grid-conatiner'>
        {data.map((item,index)=>(
            <div className='blog-page-grid' onClick={()=>navigate('/all-product')}>
                <img src={item.image}/>
                <h4>{item.head}</h4>
                <div className='grid-date-admin-div'>
                    <p>{item.date}</p>
                    <p>{item.admin}</p>
                </div>
                <p>{item.para}</p>
            </div>
        ))}
      </div>

    </div>
  )
}

export default BlogPage

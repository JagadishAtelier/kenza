import React from 'react'
import './AboutPage.css'
import image from '../../Assets/aboutImage.webp'
import image2 from '../../Assets/aboutImage2.webp'
import icon1 from '../../Assets/ab1.webp' 
import icon2 from '../../Assets/ab2.webp' 
import icon3 from '../../Assets/ab3.webp' 
const iconContent = [
    {image : icon1 ,head : "FREE RESOURCES",para : "Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward"},
    {image : icon2 ,head : "MULTI-PURPOSE",para : "Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward"},
    {image : icon3 ,head : "FULLY RESPONSIVE",para : "Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward"},
]
function AboutPage() {
  return (
    <div className='about-page-contaniner'>
      <div className='about-us-heading'>
        <h1>About Us</h1>
      </div>
      <div className='about-us-image-and-content'>
        <img src={image}/>
        <div className='about-us-content'>
            <h1>We Have Everything You Need ?</h1>
            <p>Faded short sleeves t-shirt with high neckline. Soft and stretchy material for a comfortable fit. Accessorize with a straw hat and you're ready for summer!</p>
            <div>
                <h4>Sample Unordered List</h4>
                <ul>
                    <li>Lorem ipsum, or lipsum as it is sometimes known</li>
                    <li>Dummy text used in laying out print, graphic or web designs</li>
                    <li>The passage is attributed to.</li>
                    <li>Proin molestie egestas orci ac suscipit risus posuere loremou.</li>
                    <li>Dummy text used in laying out print, graphic or web designs</li>
                </ul>
            </div>
        </div>
      </div>

      <div  className='about-page-icon-conatainer'>
        {iconContent.map((data,index)=>(
            <div className='about-page-icon-text'>
                <img src={data.image}/>
                <h3>{data.head}</h3>
                <p>{data.para}</p>
            </div>
        ))}
      </div>


      <div className='about-us-image-and-content'>
        <div className='about-us-content'>
            <h1>We Have Everything You Need ?</h1>
            <p>Faded short sleeves t-shirt with high neckline. Soft and stretchy material for a comfortable fit. Accessorize with a straw hat and you're ready for summer!</p>
            <div>
                <h4>Sample Unordered List</h4>
                <ul>
                    <li>Lorem ipsum, or lipsum as it is sometimes known</li>
                    <li>Dummy text used in laying out print, graphic or web designs</li>
                    <li>The passage is attributed to.</li>
                    <li>Proin molestie egestas orci ac suscipit risus posuere loremou.</li>
                    <li>Dummy text used in laying out print, graphic or web designs</li>
                </ul>
            </div>
        </div>
        <img src={image2}/>
      </div>
    </div>
  )
}

export default AboutPage

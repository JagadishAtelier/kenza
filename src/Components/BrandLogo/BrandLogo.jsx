import React from 'react'
import './BrandLogo.css'
import brandLogo1 from '../../Assets/Brand-Logo-1.avif'
import brandLogo2 from '../../Assets/Brand-Logo-2.webp'
import brandLogo3 from '../../Assets/Brand-Logo-3.avif'
import brandLogo4 from '../../Assets/Brand-Logo-4.webp'
import brandLogo5 from '../../Assets/Brand-Logo-5.webp'
import brandLogo6 from '../../Assets/Brand-Logo-6.webp'
const images = [
    brandLogo1,brandLogo2,brandLogo3,brandLogo4,brandLogo5,brandLogo6
]
function BrandLogo() {
  return (
    <div className='brand-logo-container'>
      {images.map((image,index)=>(
        <div>
            <img src={image}/>
        </div>
      ))}
    </div>
  )
}

export default BrandLogo

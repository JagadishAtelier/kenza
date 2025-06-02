import React from 'react'
import './Wallpaper.css'
import wallpaperImage from '../../Assets/wallpaperImage1.webp'
function Wallpaper() {
  return (
    <div className='wallpaper-container'>
      <img src={wallpaperImage} className='wallpaperImage'/>
      <div className='wallpaper-text'>
        <h3>2025</h3>
        <h1>Trending <span>Style</span></h1>
        <p>Discover the Latest Clothes</p>
        <button>SHOP NOW</button>
      </div>
    </div>
  )
}

export default Wallpaper

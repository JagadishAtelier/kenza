import React, { useState, useEffect } from 'react';
import './Wallpaper.css';
import wallpaperImage1 from '../../Assets/wallpaper1.webp';
import wallpaperImage2 from '../../Assets/wallpaper2.webp';
import { useNavigate } from 'react-router-dom';
const wallpapers = [
  {
    image: wallpaperImage1,
    year: '2025',
    heading: 'Trending',
    subHeading: 'Style',
    description: 'Discover the Latest Clothes',
    button: 'SHOP NOW',
  },
  {
    image: wallpaperImage2,
    year: '2025',
    heading: 'New',
    subHeading: 'Arrivals',
    description: 'Explore Fresh Collections',
    button: 'EXPLORE',
  },
];

function Wallpaper() {
  const extendedWallpapers = [...wallpapers, ...wallpapers];
  const slideCount = wallpapers.length;
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [textAnimationState, setTextAnimationState] = useState('enter'); // 'enter' or 'exit'

  useEffect(() => {
    const interval = setInterval(() => {
      // Start exit animation
      setTextAnimationState('exit');

      setTimeout(() => {
        // After exit animation, move slide and enter animation
        setCurrentIndex((prev) => (prev + 1) % extendedWallpapers.length);
        setTextAnimationState('enter');
        setIsTransitioning(true);
      }, 600); // duration should match exit animation length
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  // Loop reset for infinite sliding (optional, if you want seamless looping)
  useEffect(() => {
    if (currentIndex === slideCount) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 800);
    } else {
      setIsTransitioning(true);
    }
  }, [currentIndex, slideCount]);

  return (
    <div className="wallpaper-container">
      <div
        className="wallpaper-slider"
        style={{
          width: `${extendedWallpapers.length * 100}%`,
          transform: `translateX(-${(100 / extendedWallpapers.length) * currentIndex}%)`,
          transition: isTransitioning ? 'transform 0.8s ease-in-out' : 'none',
          display: 'flex',
        }}
      >
        {extendedWallpapers.map((item, index) => (
          <div
            key={index}
            className="wallpaper-slide"
            style={{ width: `${100 / extendedWallpapers.length}%`, position: 'relative' }}
          >
            <img src={item.image} alt="wallpaper" className="wallpaperImage" />
            <div className={`wallpaper-text ${textAnimationState}`}>
              <h3>{item.year}</h3>
              <h1>
                {item.heading} <span>{item.subHeading}</span>
              </h1>
              <p>{item.description}</p>
              <button onClick={()=>navigate('/all-product')}>{item.button}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wallpaper;

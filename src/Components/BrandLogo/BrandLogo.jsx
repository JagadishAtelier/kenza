import React, { useState, useEffect } from 'react';
import './BrandLogo.css';
import brandLogo1 from '../../Assets/Brand-Logo-1.avif';
import brandLogo2 from '../../Assets/Brand-Logo-2.webp';
import brandLogo3 from '../../Assets/Brand-Logo-3.avif';
import brandLogo4 from '../../Assets/Brand-Logo-4.webp';
import brandLogo5 from '../../Assets/Brand-Logo-5.webp';
import brandLogo6 from '../../Assets/Brand-Logo-6.webp';

const images = [brandLogo1, brandLogo2, brandLogo3, brandLogo4, brandLogo5, brandLogo6];

function BrandLogo() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const showCount = 2; // Number of logos to show on mobile

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + showCount) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - showCount + images.length) % images.length);
  };

  // Slice the images to display based on currentIndex for mobile, else show all
  const visibleImages = isMobile
    ? [...images, ...images].slice(currentIndex, currentIndex + showCount)
    : images;

  return (
    <div className="brand-logo-wrapper">
      {isMobile && (
        <button className="carousel-btn prev" onClick={handlePrev}>
          &#10094;
        </button>
      )}
      <div className="brand-logo-container">
        {visibleImages.map((image, index) => (
          <div key={index} className="brand-logo-item">
            <img src={image} alt={`Brand logo ${index + 1}`} />
          </div>
        ))}
      </div>
      {isMobile && (
        <button className="carousel-btn next" onClick={handleNext}>
          &#10095;
        </button>
      )}
    </div>
  );
}

export default BrandLogo;

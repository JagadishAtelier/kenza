import React, { useEffect, useRef } from 'react';
import './LatestBlog.css';
import image1 from '../../Assets/l1.webp';
import image2 from '../../Assets/l2.webp';
import image3 from '../../Assets/l3.webp';
import image4 from '../../Assets/l4.webp';
import image5 from '../../Assets/l5.webp';

const imageContent = [
  { image: image1, text: 'Sweet Summer Mangoes', para: 'Juicy and ripe, mangoes bring a tropical delight.' },
  { image: image2, text: 'Bunches of Bananas', para: 'A powerhouse of energy and potassium.' },
  { image: image3, text: 'Fresh Strawberries', para: 'Bright red and sweet — a perfect summer snack.' },
  { image: image4, text: 'Crisp Green Apples', para: 'Tart, crunchy, and packed with fiber.' },
  { image: image5, text: 'Luscious Blueberries', para: 'Tiny berries full of antioxidants and flavor.' }
];

function LatestBlog() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    let start = 0;

    const scroll = () => {
      start -= 1;
      if (Math.abs(start) >= track.scrollWidth / 2) {
        start = 0;
      }
      track.style.transform = `translateX(${start}px)`;
      requestAnimationFrame(scroll);
    };

    requestAnimationFrame(scroll);
  }, []);

  // Duplicate content to fake infinite scroll
  const duplicatedContent = [...imageContent, ...imageContent];

  return (
    <div className="blog-carousel-wrapper">
      <div className="blog-carousel-container">
        <div className="blog-carousel-track infinite" ref={trackRef}>
          {duplicatedContent.map((data, index) => (
            <div className="blog-card" key={index}>
              <img src={data.image} alt={data.text} />
              <div className="blog-overlay">
                <div>
                  <h3>{data.text}</h3>
                  <p>{data.para}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LatestBlog;

import React, { useState } from 'react';
import './LatestBlog.css';
import image1 from '../../Assets/l1.webp';
import image2 from '../../Assets/l2.webp';
import image3 from '../../Assets/l3.webp';
import image4 from '../../Assets/l4.webp';
import image5 from '../../Assets/l5.webp';

const imageContent = [
  { image: image1, heading: '10 June 2021', text: 'Sweet Summer Mangoes', para: 'Juicy and ripe, mangoes bring a tropical delight.' },
  { image: image2, heading: '05 March 2022', text: 'Bunches of Bananas', para: 'A powerhouse of energy and potassium.' },
  { image: image2, heading: '05 March 2022', text: 'Bunches of Bananas', para: 'A powerhouse of energy and potassium.' },
  { image: image3, heading: '22 July 2020', text: 'Fresh Strawberries', para: 'Bright red and sweet — a perfect summer snack.' },
  { image: image4, heading: '18 November 2019', text: 'Crisp Green Apples', para: 'Tart, crunchy, and packed with fiber.' },
  { image: image5, heading: '30 August 2023', text: 'Luscious Blueberries', para: 'Tiny berries full of antioxidants and flavor.' }
];

function LatestBlog() {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 3;

  const next = () => {
    if (startIndex + itemsPerPage < imageContent.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const prev = () => {
    if (startIndex - 1 >= 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <div className="blog-carousel-wrapper">
      <button className="latest-carousel-btn left" onClick={prev} disabled={startIndex === 0}>{'<'}</button>
      <div className="blog-carousel-container">
        <div className="blog-carousel-track">
          {imageContent.slice(startIndex, startIndex + itemsPerPage).map((data, index) => (
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
      <button className="latest-carousel-btn right" onClick={next} disabled={startIndex >= imageContent.length - 1}>{'>'}</button>
    </div>
  );
}

export default LatestBlog;

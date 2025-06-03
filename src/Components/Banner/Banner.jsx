import React from 'react';
import './banner.css';
import banner1 from '../../Assets/b1.webp';
import banner2 from '../../Assets/b2.webp';
import banner3 from '../../Assets/b3.webp';

const bannerContent = [
  { image: banner1, para: "FRESH FOOD 20% OFF", heading: "Juicy Fruits" },
  { image: banner2, para: "FLAT 30% OFF FRUITS", heading: "Healthy Food" },
  { image: banner3, para: "BIG SEASON SALE", heading: "Fresh Papaya" },
];

function Banner() {
  return (
    <div className='banner-container'>
      {bannerContent.map((data, index) => {
        const [firstWord, ...restWords] = data.heading.split(" ");
        const remaining = restWords.join(" ");
        return (
          <div className='banner-image-text' key={index}>
            <img src={data.image} alt={`banner-${index}`} />
            <div className='banner-text'>
              <h5>{data.para}</h5>
              <h2>
                <span className='bold-word'>{firstWord}</span>{' '}
                <span className='normal-word'>{remaining}</span>
              </h2>
              <button>SHOP NOW</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Banner;

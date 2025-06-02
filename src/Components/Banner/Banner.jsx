import React from 'react';
import './banner.css';
import banner1 from '../../Assets/banner1.webp';
import banner2 from '../../Assets/banner2.webp';
import banner3 from '../../Assets/banner3.webp';

const bannerContent = [
  { image: banner1, para: "Women's Party Wear", heading: "Trendy Fashion" },
  { image: banner2, para: "Flat 20% Off Clothes", heading: "Stylish Frocks" },
  { image: banner3, para: "Flat 20% Off Clothes", heading: "Stylish Fashion" },
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

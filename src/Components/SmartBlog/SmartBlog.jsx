import React, { useState, useEffect } from 'react';
import './SmartBlog.css';
import blog1 from '../../Assets/blog1.webp';
import blog2 from '../../Assets/blog2.webp';
import blog3 from '../../Assets/blog3.webp';
import blog4 from '../../Assets/blog4.webp';
import blog5 from '../../Assets/blog5.webp';
import blog6 from '../../Assets/blog6.webp';
import blog7 from '../../Assets/blog7.webp';
import blog8 from '../../Assets/blog8.webp';

const blogContent = [
    { image: blog1, heading: "Nec intellegat deseruisse te", account: "by kenza-demo Admin", date: "7/7/18", para: "Faded short sleeves t-shirt with high neckline." },
    { image: blog2, heading: "Nec intellegat deseruisse te", account: "by kenza-demo Admin", date: "7/7/18", para: "Faded short sleeves t-shirt with high neckline." },
    { image: blog3, heading: "Nec intellegat deseruisse te", account: "by kenza-demo Admin", date: "7/7/18", para: "Faded short sleeves t-shirt with high neckline." },
    { image: blog4, heading: "Nec intellegat deseruisse te", account: "by kenza-demo Admin", date: "7/7/18", para: "Faded short sleeves t-shirt with high neckline." },
    { image: blog5, heading: "Nec intellegat deseruisse te", account: "by kenza-demo Admin", date: "7/7/18", para: "Faded short sleeves t-shirt with high neckline." },
    { image: blog6, heading: "Nec intellegat deseruisse te", account: "by kenza-demo Admin", date: "7/7/18", para: "Faded short sleeves t-shirt with high neckline." },
    { image: blog7, heading: "Nec intellegat deseruisse te", account: "by kenza-demo Admin", date: "7/7/18", para: "Faded short sleeves t-shirt with high neckline." },
    { image: blog8, heading: "Nec intellegat deseruisse te", account: "by kenza-demo Admin", date: "7/7/18", para: "Faded short sleeves t-shirt with high neckline." },
  ];

function SmartBlog() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % Math.ceil(blogContent.length / 2));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='blog-container'>
      <div className='blog-carousel-wrapper'>
        <div
          className='blog-comment-conent'
          style={{ transform: `translateY(-${activeIndex * 25}%)` }}
        >
          {Array.from({ length: Math.ceil(blogContent.length / 2) }).map((_, groupIndex) => (
            <div className='blog-slide-group' key={groupIndex}>
              {[0, 1].map(i => {
                const index = groupIndex * 2 + i;
                if (index >= blogContent.length) return null;
                const data = blogContent[index];
                return (
                  <div
                    className={`blog-image-and-text ${index % 2 === 1 ? 'reverse' : ''}`}
                    key={index}
                  >
                    <img src={data.image} alt={`blog-${index}`} />
                    <div className='blog-text'>
                      <h3>{data.heading}</h3>
                      <div className='blog-para-div'>
                        <p><i className="bi bi-person"></i>{data.account}</p>
                        <p><i className="bi bi-calendar3"></i>{data.date}</p>
                      </div>
                      <p>{data.para}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="blog-indicator">
        {Array.from({ length: Math.ceil(blogContent.length / 2) }).map((_, i) => (
  <span
    key={i}
    className={`blog-dot ${i === activeIndex ? 'active' : ''}`}
  ></span>
))}

      </div>
      </div>

      <div className='newsLetter-container'>
        <div className='news-letter-content'>
          <div className='news-letter-heading'><h1>NEWSLETTER</h1></div>
          <div className='news-letter-icon-text'><h1><i className="bi bi-envelope-paper"></i>SIGN UP & GET OFFER</h1></div>
          <p className='news-letter-para'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <div className='news-letter-input-btn'>
            <input type='text' placeholder='YOUR MAIL' />
            <button>SUBSCRIBE</button>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default SmartBlog;

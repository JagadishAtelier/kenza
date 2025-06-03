import React, { useEffect, useState } from 'react';
import './Testimonial.css';
import test1 from '../../Assets/test1.webp';
import test2 from '../../Assets/test2.webp';
import test3 from '../../Assets/test3.webp';
import test4 from '../../Assets/test4.webp';

const testContent = [
    {image : test1 ,comment : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non eros tellus. Phasellus nec iaculis sapien. Fusce quisest bibendum ornare erat in pretium aliquam.",name : "John Duff",prof : "Web Designer"},
    {image : test2 ,comment : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non eros tellus. Phasellus nec iaculis sapien. Fusce quisest bibendum ornare erat in pretium aliquam.",name : "John Duff",prof : "Web Designer"},
    {image : test3 ,comment : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non eros tellus. Phasellus nec iaculis sapien. Fusce quisest bibendum ornare erat in pretium aliquam.",name : "John Duff",prof : "Web Designer"},
    {image : test4 ,comment : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non eros tellus. Phasellus nec iaculis sapien. Fusce quisest bibendum ornare erat in pretium aliquam.",name : "John Duff",prof : "Web Designer"},
]

function Testimonial() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % testContent.length);
    }, 3000); // change every 3 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="testimonial-carousel-wrapper">
      <div
        className="testimonial-carousel-inner"
        style={{ transform: `translateY(-${activeIndex * 25}%)` }}
      >
        {testContent.map((data, index) => (
          <div className="testimonial-image-and-content" key={index}>
            <img src={data.image} alt="testimonial" />
            <div className="testimonail-text">
              <p>{data.comment}</p>
              <h1>{data.name}</h1>
              <h2>{data.prof}</h2>
            </div>
          </div>
        ))}
      </div>

      <div className="testimonial-indicator">
        {testContent.map((_, i) => (
          <span
            key={i}
            className={`indicator-dot ${i === activeIndex ? 'active' : ''}`}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default Testimonial;

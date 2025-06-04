import React, { useState } from 'react';
import './Testimonial.css';
import test1 from '../../Assets/t1.avif';
import test2 from '../../Assets/t2.avif';
import test3 from '../../Assets/t3.avif';
import test4 from '../../Assets/t4.avif';
const testContent = [
  { image: test1, comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non eros tellus. Phasellus nec iaculis sapien. Fusce quisest bibendum ornare erat in pretium aliquam.", name: "John Duff", prof: "Web Designer" },
  { image: test2, comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non eros tellus. Phasellus nec iaculis sapien. Fusce quisest bibendum ornare erat in pretium aliquam.", name: "John Duff", prof: "Web Designer" },
  { image: test3, comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non eros tellus. Phasellus nec iaculis sapien. Fusce quisest bibendum ornare erat in pretium aliquam.", name: "John Duff", prof: "Web Designer" },
  { image: test4, comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non eros tellus. Phasellus nec iaculis sapien. Fusce quisest bibendum ornare erat in pretium aliquam.", name: "John Duff", prof: "Web Designer" },
];

function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if ((currentIndex + 1) * 2 < testContent.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const visibleTestimonials = testContent.slice(currentIndex * 2, currentIndex * 2 + 2);

  return (
    <div className="testimonial-carousel-wrapper">
      <button className="testimonial-arrow left" onClick={handlePrev}>&#10094;</button>

      <div className="testimonial-carousel-viewport">
        <div className="testimonial-carousel-inner">
          {visibleTestimonials.map((data, index) => (
            <div className="testimonial-image-and-content" key={index}>
              <img src={data.image} alt="testimonial" />
              <div className="testimonail-text">
                <div className='test-name-prof'>
                  <h3>{data.name}</h3>
                  <h4>{data.prof}</h4>
                </div>
                <p>{data.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="testimonial-arrow right" onClick={handleNext}>&#10095;</button>
    </div>
  );
}

export default Testimonial;

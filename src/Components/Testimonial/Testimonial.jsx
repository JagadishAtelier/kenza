import React, { useState, useEffect } from "react";
import "./Testimonial.css";
import test1 from "../../Assets/t1.avif";
import test2 from "../../Assets/t2.avif";
import test3 from "../../Assets/t3.avif";
import test4 from "../../Assets/t4.avif";

const testContent = [
  {
    image: test1,
    comment:
      "Amazing service and top-quality products! I’m so happy with my purchase. The delivery was quick, and the customer support was very helpful.",
    name: "John Duff",
    prof: "Web Designer",
  },
  {
    image: test2,
    comment:
      "I’ve never experienced such a smooth shopping experience. The product exceeded my expectations and the money-back guarantee gave me complete peace of mind.",
    name: "Anita",
    prof: "Web Designer",
  },
  {
    image: test3,
    comment:
      "The free gift voucher was a wonderful surprise! It made my next purchase even better. Highly recommend this store!",
    name: "Rahul",
    prof: "Web Designer",
  },
  {
    image: test4,
    comment:
      "Their 24x7 support team is outstanding. They helped me immediately when I had a question about my order. Excellent customer care!",
    name: "Sneha",
    prof: "Web Designer",
  },
];

function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(
    window.innerWidth <= 768 ? 1 : 2
  );
  const [animate, setAnimate] = useState(false);

  // Detect resize and update itemsPerPage
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      setItemsPerPage(isMobile ? 1 : 2);
      setCurrentIndex(0);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto carousel timer
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        (prev + 1) * itemsPerPage >= testContent.length ? 0 : prev + 1
      );
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [itemsPerPage]);

  // Trigger animation on currentIndex change
  useEffect(() => {
    setAnimate(true);
    const timeout = setTimeout(() => setAnimate(false), 700); // animation duration

    return () => clearTimeout(timeout);
  }, [currentIndex]);

  const handleNext = () => {
    if ((currentIndex + 1) * itemsPerPage < testContent.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(Math.floor((testContent.length - 1) / itemsPerPage));
    }
  };

  const visibleTestimonials = testContent.slice(
    currentIndex * itemsPerPage,
    currentIndex * itemsPerPage + itemsPerPage
  );

  return (
    <>
    <div style={{textAlign:"center"}}>
      <h1>OUR CLIENT SAY</h1>
    </div>
    <div className="testimonial-carousel-wrapper">

      <div className="testimonial-carousel-viewport">
        <div
          className={`testimonial-carousel-inner ${
            animate ? "animate-testimonial" : ""
          }`}
        >
          {visibleTestimonials.map((data, index) => (
            <div className="testimonial-image-and-content" key={index}>
              <img src={data.image} alt="testimonial" />

              <div className="testimonail-text">
                <div className="test-name-prof">
                  <h3>{data.name}</h3>
                  <h4>{data.prof}</h4>
                </div>
                <svg
                  className="quote-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="90"
                  height="90"
                  viewBox="0 0 24 24"
                  fill="green"
                  stroke="none"
                  strokeWidth="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 15h4v-6H5v7a3 3 0 0 0 3 3" />
                  <path d="M14 15h4v-6h-5v7a3 3 0 0 0 3 3" />
                </svg>

                <p>{data.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}

export default Testimonial;

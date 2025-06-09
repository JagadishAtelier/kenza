import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './NewsletterPopup.css';
import image from '../../Assets/p1.webp';

const NewsletterPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      const alreadyShown = localStorage.getItem('newsletterPopupShown');

      if (!alreadyShown) {
        const timer = setTimeout(() => {
          setShowPopup(true);
          localStorage.setItem('newsletterPopupShown', 'true'); // mark as shown
        }, 1000);

        return () => clearTimeout(timer);
      }
    }
  }, [location.pathname]);

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && location.pathname === '/' && (
        <div className="newsletter-popup">
          <div className="newsletter-content">
            <div className='newsletter-image-text'>
              <div className='newsletter-image'>
                <button className="close-btn" onClick={handleClose}>
                  <i className="bi bi-x-lg"></i>
                </button>
                <div className="popup-left">
                  <img src={image} alt="Tomato" />
                </div>
              </div>
              <div className="newsletter-text">
                <h2>Join Our Newsletter And Get Discount</h2>
                <p>Subscribe to the newsletter to receive updates about new products.</p>
              </div>
            </div>
            <div className='popup-inputs-button-icons'>
              <div className="form-row">
                <input type="email" placeholder="Your email" />
                <button>SUBSCRIBE</button>
              </div>
              <div className="dont-show">
                <input type="checkbox" /> Don't show again
              </div>
              <div className="social-icons">
                <i className="bi bi-facebook"></i>
                <i className="bi bi-instagram"></i>
                <i className="bi bi-tiktok"></i>
                <i className="bi bi-snapchat"></i>
                <i className="bi bi-vimeo"></i>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsletterPopup;

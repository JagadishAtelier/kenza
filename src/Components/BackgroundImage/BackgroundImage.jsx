import React from 'react';
import './BackgroundImage.css';
import { useNavigate } from 'react-router-dom';
function BackgroundImage() {
  const navigate = useNavigate()
  return (
    <div className="background-image">
      <div className="main-container">
        <p className="season-text">Special Discount</p>
        <div className="highlight-box">
          <h1 className="main-heading">Fruits & Vegetables</h1>
        </div>
        <p className="subheading">The Sale Ends in :</p>
        <button className="view-button" onClick={()=>navigate('/all-product')}>SHO NOW</button>
      </div>
    </div>
  );
}

export default BackgroundImage;

import React from 'react';
import './BackgroundImage.css';

function BackgroundImage() {
  return (
    <div className="background-image">
      <div className="main-container">
        <p className="season-text">Spring & Summer</p>
        <div className="highlight-box">
          <h1 className="main-heading">Fab & Apparels</h1>
        </div>
        <p className="subheading">The Sale Ends in :</p>
        <button className="view-button">VIEW COLLECTION</button>
      </div>
    </div>
  );
}

export default BackgroundImage;

import React, { useState } from "react";
import './TrendingNow.css';
import TNImage1 from '../../Assets/trendingNowImage.webp';
import TNImage2 from '../../Assets/trendingNowImage2.webp';
import TNImage3 from '../../Assets/trendingNowImage3.webp';
import TNImage4 from '../../Assets/trendingNowImage4.webp';

function TrendingNow() {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedColor, setSelectedColor] = useState("yellow");
  const [mainImage, setMainImage] = useState(TNImage1);

  const handleQuantityChange = (type) => {
    setQuantity((prev) => (type === "inc" ? prev + 1 : Math.max(1, prev - 1)));
  };

  return (
    <div className="trending-now-conatiner">
      <div className="trending-now-conatiner-heading">
        <h1>TRENDING NOW</h1>
      </div>

      <div className="product-container">
        <div className="image-section">
          <img src={mainImage} alt="Product" className="product-image" />

          <div className="thumbnail-container">
            {[TNImage1, TNImage2, TNImage3, TNImage4].map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`thumb-${index}`}
                className="thumbnail-image"
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        <div className="details-section">
          <h2 className="product-title">Customizable Mug</h2>
          <div className="rating-stars">★★★★★</div>

          <div className="price">
            <span className="original-price">$18.00</span>
            <span className="discounted-price">$16.00</span>
            <span className="tax-info">Tax included.</span>
          </div>

          <p style={{ color: "grey", fontSize: "20px" }}><strong>Vendor :</strong> kenza-demo</p>
          <p style={{ color: "grey", fontSize: "20px" }}><strong>Product Type :</strong> fashion</p>

          <div className="actions">
            <span>🤍 Add To Wishlist</span>
            <span>📏 Sizechart</span>
          </div>

          <div className="countdown">
            <div><div className="time-box">00</div><p>Days</p></div>
            <div><div className="time-box">00</div><p>Hours</p></div>
            <div><div className="time-box">00</div><p>Mins</p></div>
            <div><div className="time-box">00</div><p>Secs</p></div>
          </div>

          <div className="stock-status">
            <p>Hurry! Only units left in stock!</p>
            <div className="stock-bar-track">
              <span className="stock-bar-fill" />
            </div>
          </div>

          <div className="size-section">
            <label style={{ color: "grey", fontSize: "20px" }}>Size</label>
            <div className="size-options">
              {["S", "M", "L"].map((size) => (
                <div
                  key={size}
                  className={`size-box ${selectedSize === size ? "selected" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          <div className="color-section">
            <label style={{ color: "grey", fontSize: "20px" }}>Color</label>
            <div className="color-options">
              {["yellow", "white", "black", "green"].map((color) => (
                <div
                  key={color}
                  className={`color-dot ${color} ${selectedColor === color ? "selected" : ""}`}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>

          <div className="quantity-section">
            <label style={{ color: "grey", fontSize: "20px" }}>Quantity</label>
            <div className="quantity-box">
              <button onClick={() => handleQuantityChange("dec")}>−</button>
              <span>{quantity}</span>
              <button onClick={() => handleQuantityChange("inc")}>+</button>
            </div>
          </div>
          <div>
          <button className="add-btn">ADD TO CART</button>
            <button className="buy-btn">BUY IT NOW</button>
          </div>

          <div className="product-dtl">
  <div className="feature-box">
    <i className="bi bi-box-seam pink-icon"></i>
    <di>
    <h5>Free Delivery</h5>
    <p>Lorem Ipsum dummy</p>
    </di>

  </div>
  <div className="feature-box">
    <i className="bi bi-currency-rupee pink-icon"></i>
    <div>
    <h5>Big Savings</h5>
    <p>Lorem Ipsum dummy</p>
    </div>

  </div>
  <div className="feature-box">
    <i className="bi bi-person pink-icon"></i>
    <div>
    <h5>Customer Care</h5>
    <p>Lorem Ipsum dummy</p>
    </div>

  </div>
  <div className="feature-box">
    <i className="bi bi-gift pink-icon"></i>
    <div>
    <h5>Gift Voucher</h5>
    <p>Lorem Ipsum dummy</p>
    </div>

  </div>
</div>

        </div>
      </div>
    </div>
  );
}

export default TrendingNow;

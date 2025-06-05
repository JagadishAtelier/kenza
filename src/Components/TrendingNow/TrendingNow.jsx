import React, { useState,useEffect } from "react";
import './TrendingNow.css';
import Reviews from '../Reviews/Reviews'
import TNImage1 from '../../Assets/trendingNowImage.webp';
import TNImage2 from '../../Assets/trendingNowImage2.webp';
import TNImage3 from '../../Assets/trendingNowImage3.webp';
import TNImage4 from '../../Assets/trendingNowImage4.webp';
import TPImage1 from '../../Assets/p1.webp'
import TPImage2 from '../../Assets/p2.webp'
import TPImage3 from '../../Assets/p3.webp'
import TPImage4 from '../../Assets/p4.webp'
import TPImage5 from '../../Assets/p5.webp'
import TPImage6 from '../../Assets/p6.webp'
import TPImage7 from '../../Assets/p1.webp'
import TPImage8 from '../../Assets/p8.webp'
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
const featuredProducts = [
  { image: TPImage1,bottomImages:[TPImage2,TPImage3,TPImage4,TPImage5], hoverImage: TPImage2, text: "Aliqunaim Retrum Mollis", price: "$ 18.00",type:"organics" },
  { image: TPImage2,bottomImages:[TPImage2,TPImage3,TPImage4,TPImage5], hoverImage: TPImage3, text: "American Grapes", price: "$ 17.00",type:"organics" },
  { image: TPImage3,bottomImages:[TPImage2,TPImage3,TPImage4,TPImage5], hoverImage: TPImage4, text: "Autum Eua Guide", price: "$ 16.00",type:"organics" },
  { image: TPImage4,bottomImages:[TPImage2,TPImage3,TPImage4,TPImage5], hoverImage: TPImage5, text: "Consectuar Adipicing", price: "$ 15.00",type:"organics" }, 
  { image: TPImage7,bottomImages:[TPImage2,TPImage3,TPImage4,TPImage5], hoverImage: TPImage6, text: "Fuse Fermentum", price: "$ 12.00",type:"organics" },
  { image: TPImage8,bottomImages:[TPImage2,TPImage3,TPImage4,TPImage5], hoverImage: TPImage1, text: "Maruis Bibendum", price: "$ 10.00" ,type:"organics"},
  { image: TPImage3,bottomImages:[TPImage2,TPImage3,TPImage4,TPImage5], hoverImage: TPImage7, text: "Mustard", price: "$ 15.00",type:"organics" },
  { image: TPImage4,bottomImages:[TPImage2,TPImage3,TPImage4,TPImage5], hoverImage: TPImage8, text: "Organic Chilli", price: "$ 14.00" ,type:"organics"}
]
function TrendingNow() {
  const location = useLocation();
  const product = location.state?.product;
  const [hoverIndex, setHoverIndex] = useState(null)
  if (!product) return <p>No product data found.</p>;
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedColor, setSelectedColor] = useState("yellow");
  const [mainImage, setMainImage] = useState(TNImage1);
  const navigate = useNavigate()
  const handleQuantityChange = (type) => {
    setQuantity((prev) => (type === "inc" ? prev + 1 : Math.max(1, prev - 1)));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <>
    <div className="trending-now-conatiner">
      <div className="trending-now-conatiner-heading">
        <h1>TRENDING NOW</h1>
      </div>

      <div className="product-container">
        <div className="image-section">
          <img src={product.image} alt="Product" className="product-image" />

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
          <h2 className="product-title">{product.text}</h2>
          <div className="rating-stars">★★★★★</div>

          <div className="price">
            <span className="original-price">$20.00</span>
            <span className="discounted-price">{product.price}</span>
            <span className="tax-info">Tax included.</span>
          </div>

          <p style={{ color: "grey", fontSize: "20px" }}><strong>Vendor :</strong> kenza-demo</p>
          <p style={{ color: "grey", fontSize: "20px" }}><strong>Product Type :</strong>Organics</p>

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
              {["M", "L"].map((size) => (
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
    <div>
    <h5>Free Delivery</h5>
    <p>Lorem Ipsum dummy</p>
    </div>

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
      <Reviews/>

      <div>
    <div className='trending-product-container'>
    <h1>YOU MAY ALSO LIKE</h1>
      <div className='grid-box-container'>
        {featuredProducts.map((data, index) => {
          const activeDot = hoverIndex === index ? 1 : 0;

          return (
            <div 
              className='data-grid' 
              key={index}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <div className='image-wrapper' onClick={() => navigate(`/product/${data.text}`, { state: { product: data } })}>
                <img 
                  src={hoverIndex === index ? data.hoverImage : data.image} 
                  alt={`product-${index}`} 
                />
                <div className='star-overlay'>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                </div>
                <div className='hover-icons'>
                  <i className="bi bi-heart"></i>
                  <i className="bi bi-eye"></i>
                </div>
              </div>
              <p>{data.text}</p>
              <p>{data.price}</p>

              {/* Dots */}
              <div className="dots-container">
                <span className={`dot ${activeDot === 0 ? 'active' : ''}`}></span>
                <span className={`dot ${activeDot === 1 ? 'active' : ''}`}></span>
              </div>
            </div>
          )
        })}
      </div>
    </div>

      </div>
    </>
  );
}

export default TrendingNow;

import React, { useState, useEffect } from "react";
import './TrendingNow.css';
import Reviews from '../Reviews/Reviews';
import TNImage1 from '../../Assets/trendingNowImage.webp';
import TNImage2 from '../../Assets/trendingNowImage2.webp';
import TNImage3 from '../../Assets/trendingNowImage3.webp';
import TNImage4 from '../../Assets/trendingNowImage4.webp';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../CartContext/CartContext';
import { getProductById, getAllProducts } from '../../Api/productApi';

function TrendingNow() {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [mainImage, setMainImage] = useState(TNImage1);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedColor, setSelectedColor] = useState("yellow");
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productData = await getProductById(id);
        setProduct(productData);
        setMainImage(productData.images?.[0] || TNImage1);

        const allProducts = await getAllProducts();
        const filtered = allProducts
          .filter((p) => p._id !== productData._id)
          .slice(0, 8);
        setRelatedProducts(filtered);
      } catch (err) {
        console.error("Failed to load product or related products", err);
      }
    };

    fetchProductData();
    window.scrollTo(0, 0);
  }, [id]);

  const handleQuantityChange = (type) => {
    setQuantity((prev) => (type === "inc" ? prev + 1 : Math.max(1, prev - 1)));
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        ...product,
        quantity,
        selectedSize,
        selectedColor,
      });
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 1500);
    }
  };

  if (!product) return <p className="text-center p-10">Loading product...</p>;

  return (
    <>
      <div className="trending-now-conatiner">
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
            <h2 className="product-title">{product.name}</h2>
            <div className="rating-stars">★★★★★</div>

            <div className="price">
              <span className="original-price">₹60000</span>
              <span className="discounted-price">₹{product.price}</span>
              <span className="tax-info">Tax included.</span>
            </div>

            <p><strong>Vendor:</strong> kenza-demo</p>
            <p><strong>Category:</strong> {product.category}</p>

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
              <p>Hurry! Only {product.stock || 20} units left in stock!</p>
              <div className="stock-bar-track">
                <span className="stock-bar-fill" />
              </div>
            </div>

            <div className="size-section">
              <label>Size</label>
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
              <label>Color</label>
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
              <label>Quantity</label>
              <div className="quantity-box">
                <button onClick={() => handleQuantityChange("dec")}>−</button>
                <span>{quantity}</span>
                <button onClick={() => handleQuantityChange("inc")}>+</button>
              </div>
            </div>

            <div className="add-to-cart-buy-btn-div">
              <button className="add-btn" onClick={handleAddToCart}>
                {addedToCart ? "✅ Added to Cart" : "ADD TO CART"}
              </button>
              <button className="buy-btn" onClick={() => navigate('/payment', { state: { product } })}>
                BUY IT NOW
              </button>
            </div>

            <div className="product-dtl">
              <div className="feature-box"><i className="bi bi-box-seam pink-icon"></i><div><h5>Free Delivery</h5><p>Lorem Ipsum dummy</p></div></div>
              <div className="feature-box"><i className="bi bi-currency-rupee pink-icon"></i><div><h5>Big Savings</h5><p>Lorem Ipsum dummy</p></div></div>
              <div className="feature-box"><i className="bi bi-person pink-icon"></i><div><h5>Customer Care</h5><p>Lorem Ipsum dummy</p></div></div>
              <div className="feature-box"><i className="bi bi-gift pink-icon"></i><div><h5>Gift Voucher</h5><p>Lorem Ipsum dummy</p></div></div>
            </div>
          </div>
        </div>
      </div>

      <Reviews />

      <div className='trending-product-container'>
        <h1>YOU MAY ALSO LIKE</h1>
        <div className='grid-box-container'>
          {relatedProducts.map((data, index) => {
            const activeDot = hoverIndex === index ? 1 : 0;
            const relImage = data.images?.[0] || "/fallback-image.jpg";
            return (
              <div
                className='data-grid'
                key={data._id}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <div className='image-wrapper' onClick={() => navigate(`/product/${data._id}`)}>
                  <img src={relImage} alt={data.name} />
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
                <p>{data.name}</p>
                <p>₹{data.price}</p>
                <div className="dots-container">
                  <span className={`dot ${activeDot === 0 ? "active" : ""}`}></span>
                  <span className={`dot ${activeDot === 1 ? "active" : ""}`}></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default TrendingNow;

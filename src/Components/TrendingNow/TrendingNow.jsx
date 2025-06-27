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
import { getAllCategories } from '../../Api/categoryApi';
import { useMemo } from "react";
import { Heart, Ruler } from "lucide-react";
import CountdownTimer from "./Countdown";
import { useWishlist } from "../WishlistContext/WishlistContext";
import { addProductToCart } from "../../Api/cartApi";
function TrendingNow() {
  const { cartItems,addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [mainImage, setMainImage] = useState();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedColor, setSelectedColor] = useState("yellow");
  const isInWishlist = product && wishlist.some(item => item._id === product._id);

  const [addedToCart, setAddedToCart] = useState(false);
  const [categories, setCategories] = useState([]);

useEffect(() => {
  const fetchCategories = async () => {
    try {
      const res = await getAllCategories();
      setCategories(res);   
    } catch (err) {
      console.error("Error fetching categories", err);
    }
  };

  fetchCategories();
}, []);


const categoryIdToNameMap = useMemo(() => {
  const map = {};
  categories.forEach((cat) => {
    map[cat._id] = cat.name;
  });
  return map;
}, [categories]);


  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true)
      try {
        const response = await getProductById(id);
        const productData = response.data;
        console.log("trendingNow:",productData)
        console.log("Fetched product images:", productData.images);

        setProduct(productData);
        setMainImage(productData.images && productData.images.length > 0 ? productData.images[0] : TNImage1);
        console.log("Main Image set to:", productData.images?.[0] || TNImage1);

        const allProductsResponse = await getAllProducts();
        const allProducts = allProductsResponse.data;
        console.log("Filtered products source:", allProducts);
        const filtered = allProducts
          .filter((p) => p._id !== productData._id)
          .slice(0, 8);
        setRelatedProducts(filtered);
      } catch (err) {
        console.error("Failed to load product or related products", err);
      }finally{
        setLoading(false)
      }
    };

    fetchProductData();
    window.scrollTo(0, 0);
  }, [id]);

  const handleQuantityChange = (type) => {
    setQuantity((prev) => (type === "inc" ? prev + 1 : Math.max(1, prev - 1)));
  };

  const handleAddToCart = async () => {
    if (!product) return;
  
    try {
      await addToCart(product); // ✅ uses context function (already does backend call)
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 1500);
    } catch (err) {
      console.error("❌ Error adding to cart:", err);
      alert("Failed to add to cart.");
    }
  };
  
  

  if (loading || !product) return <p className="text-center py-10 my-10">Loading product...</p>;

  return (
    <>
      <div className="trending-now-conatiner">
        <div className="product-container">
          <div className="image-section">
            <img src={mainImage} alt="Product" className="product-image" />
            {product.images?.length > 1 && (
            <div className="thumbnail-container">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`thumb-${index}`}
                  className="thumbnail-image"
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          )}
          </div>

          <div className="details-section">
            <h2 className="product-title">{product.name}</h2>
            <div className="rating-stars">★★★★★</div>

            <div className="price">
              <span className="original-price">₹60</span>
              <span className="discounted-price">₹ {product.price}</span>
              <span className="tax-info text-muted">Tax included.</span>
            </div>

            <p><strong>Vendor:</strong> {product.name.split(' ')[0]}</p>
            {categoryIdToNameMap[product.category] && (
              <p><strong>Category:</strong> {categoryIdToNameMap[product.category]}</p>
            )}


<div className="actions">
  <span
    className="wishlist-action"
    onClick={() => {
      if (isInWishlist) {
        removeFromWishlist(product._id);
      } else {
        addToWishlist(product);
      }
    }}
  >
    <Heart
      className={`wishlist-icon ${isInWishlist ? "active" : ""}`}
      size={20}
    />
    {isInWishlist ? " Added to Wishlist" : " Add to Wishlist"}
  </span>
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

            {/* <div className="countdown">
              <div><div className="time-box">00</div><p>Days</p></div>
              <div><div className="time-box">00</div><p>Hours</p></div>
              <div><div className="time-box">00</div><p>Mins</p></div>
              <div><div className="time-box">00</div><p>Secs</p></div>
            </div> */}
            <CountdownTimer targetDate={"2025-07-31T23:59:59"}/>

            <div className="stock-status">
              <p>Hurry! Only {product.stock || 20} units left in stock!</p>
              <div className="stock-bar-track">
                <span className="stock-bar-fill" />
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

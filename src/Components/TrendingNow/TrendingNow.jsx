import React, { useState, useEffect,useRef } from "react";
import "./TrendingNow.css";
import Reviews from "../Reviews/Reviews";
import TNImage1 from "../../Assets/trendingNowImage.webp";
// import TNImage2 from "../../Assets/trendingNowImage2.webp";
// import TNImage3 from "../../Assets/trendingNowImage3.webp";
// import TNImage4 from "../../Assets/trendingNowImage4.webp";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../CartContext/CartContext";
import { getProductById, getAllProducts } from "../../Api/productApi";
import { getAllCategories } from "../../Api/categoryApi";
import { useMemo } from "react";
import { Heart, Ruler } from "lucide-react";
import CountdownTimer from "./Countdown";
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { useWishlist } from "../WishlistContext/WishlistContext";
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSwipeable } from 'react-swipeable';
function TrendingNow() {
  const { cartItems, addToCart } = useCart();
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
  const isInWishlist =
    product && wishlist.some((item) => item._id === product._id);

  const [addedToCart, setAddedToCart] = useState(false);
  const [categories, setCategories] = useState([]);
  const thumbnailRefs = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
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

const renderStars = (rating) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} color="#FFD700" size={18} />); // full star
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} color="#FFD700" size={18} />); // half star
    } else {
      stars.push(<FaRegStar key={i} color="#ccc" size={18} />); // empty star
    }
  }

  return stars;
};

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      try {
        const response = await getProductById(id);
        const productData = response.data;

        setProduct(productData);
        setMainImage(productData.images?.[0] || TNImage1);

        const allProductsResponse = await getAllProducts();
        const allProducts = allProductsResponse.data;
        const filtered = allProducts
          .filter((p) => p._id !== productData._id)
          .slice(0, 8);
        setRelatedProducts(filtered);
      } catch (err) {
        console.error("Failed to load product or related products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
    window.scrollTo(0, 0);
  }, [id]);

  // ✅ Make sure this hook comes before the return
  useEffect(() => {
    if (product?.images?.length > 0) {
      setMainImage(product.images[currentIndex]);
    }
  }, [currentIndex, product]);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev > 0 ? prev - 1 : product.images.length - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev < product.images.length - 1 ? prev + 1 : 0
    );
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventScrollOnSwipe: true,
    trackMouse: false,
  });

  const handleQuantityChange = (type) => {
    setQuantity((prev) => (type === "inc" ? prev + 1 : Math.max(1, prev - 1)));
  };

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      await addToCart(product);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 1500);
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add to cart.");
    }
  };

  if (loading || !product)
    return <p className="text-center py-10 my-10">Loading product...</p>;
  return (
    <>
      <div className="trending-now-conatiner">
        <div className="product-container">
        <div className="d-flex flex-column-reverse gap-3 position-relative">
  {/* Thumbnails */}
  <div className="d-flex flex-row align-items-center">
    <button
      onClick={handlePrev}
      className="btn d-none d-md-block w-10"
      style={{ borderRadius: 0, background: '#EFEFEF', border: 0,height:"88px" }}
      disabled={currentIndex === 0}
    >
      <ChevronLeft size={18} />
    </button>

    <div
      className="d-flex flex-row flex-md-row gap-2 overflow-auto"
      style={{
        maxHeight: 510,
        maxWidth: '100%',
        overflowX: 'auto',
        overflowY: 'auto',
        scrollbarWidth: 'none',
      }}
    >
      {product.images.map((img, i) => (
        <img
          key={i}
          ref={(el) => (thumbnailRefs.current[i] = el)}
          src={img}
          alt={`Thumb ${i + 1}`}
          onClick={() => setCurrentIndex(i)}
          className={`img-thumbnail ${currentIndex === i ? 'border border-dark' : ''}`}
          style={{
            width: 90,
            height: 90,
            objectFit: 'cover',
            cursor: 'pointer',
            borderRadius: 4,
            flexShrink: 0,
          }}
        />
      ))}
    </div>

    <button
      onClick={handleNext}
      className="btn d-none d-md-block w-10"
      style={{ borderRadius: 0, background: '#EFEFEF', border: 0,height:"88px" }}
    >
      <ChevronRight size={18} />
    </button>
  </div>

  {/* Main Image */}
  <div className="product-image position-relative text-center" {...swipeHandlers}>
    <img
      src={product.images[currentIndex]}
      alt="Main Product"
      className="img-fluid main-image"
      style={{
        border: '1px solid #ccc',
        borderRadius: '4px',
        maxHeight: '700px',
        objectFit: 'cover',
        width: '100%',
      }}
    />
    <button
      onClick={handlePrev}
      className="btn border-0 position-absolute p-2 top-50 translate-middle-y"
      style={{
        zIndex: 2,
        left: '10px',
        background: '#ffffff6b',
        borderRadius: 0,
      }}
    >
      <ChevronLeft size={20} />
    </button>
    <button
      onClick={handleNext}
      className="btn border-0 position-absolute p-2 top-50 translate-middle-y"
      style={{
        zIndex: 2,
        right: '10px',
        background: '#ffffff6b',
        borderRadius: 0,
      }}
    >
      <ChevronRight size={20} />
    </button>
  </div>
</div>


          <div className="details-section">
            <h2 className="product-title mt-4">{product.name}</h2>
            <div className="rating-stars m-0 flex gap-1" >
              {renderStars(product.rating || 4.5)}
            </div>
            <div className="price">
              <span className="original-price text-danger">
                ₹{product.price * 1.99}
              </span>
              <span className="discounted-price">₹ {product.price}</span>
              <span className="tax-info text-muted">Tax included.</span>
            </div>

            <div className="d-flex flex-column gap-2 mb-2">
              <p className="m-0">
                <strong className="text-success">Vendor:</strong> {product.SKU}
              </p>
              {categoryIdToNameMap[product.category] && (
                <p className="m-0">
                  <strong className="text-success">Category:</strong>{" "}
                  {categoryIdToNameMap[product.category]}
                </p>
              )}
            </div>

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
              <span>
                <Ruler color="green" /> Sizechart
              </span>
            </div>
            <div id="varient" style={{ display: "none" }}>
              <div className="size-section">
                <label>Size</label>
                <div className="size-options">
                  {["M", "L"].map((size) => (
                    <div
                      key={size}
                      className={`size-box ${
                        selectedSize === size ? "selected" : ""
                      }`}
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
                      className={`color-dot ${color} ${
                        selectedColor === color ? "selected" : ""
                      }`}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="quantity-section d-flex align-items-center gap-3">
              <label className="text-dark fw-bold">Quantity</label>
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
            <CountdownTimer targetDate={"2025-07-31T23:59:59"} />

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
              <button className="buy-btn" onClick={() =>
  navigate('/payment', {
    state: {
      product: {
        ...product,
        quantity,
        selectedSize,
        selectedColor,
      },
      source: 'buy-now'  // ✅ Add this
    }
  })
}
>
                BUY IT NOW
              </button>
            </div>

            <div className="product-dtl">
              <div className="feature-box">
                <i className="bi bi-box-seam pink-icon"></i>
                <div>
                  <h5>Free Delivery</h5>
                  <p style={{ fontSize: "11px" }}>
                    Free Delivery all over india
                  </p>
                </div>
              </div>
              <div className="feature-box">
                <i className="bi bi-currency-rupee pink-icon"></i>
                <div>
                  <h5>Big Savings</h5>
                  <p style={{ fontSize: "11px" }}>Save big while Spending</p>
                </div>
              </div>
              <div className="feature-box">
                <i className="bi bi-person pink-icon"></i>
                <div>
                  <h5>Customer Care</h5>
                  <p style={{ fontSize: "11px" }}>
                    24/7 Support Team available
                  </p>
                </div>
              </div>
              <div className="feature-box">
                <i className="bi bi-gift pink-icon"></i>
                <div>
                  <h5>Gift Voucher</h5>
                  <p style={{ fontSize: "11px" }}>Buy using Gift cards</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Reviews
        paragraphText={product.discription}
        unorderedList={[
          "Comodous in tempor ullamcorper miaculis",
          "Pellentesque vitae neque mollis urna mattis laoreet.",
          "Divamus sit amet purus justo.",
          "Proin molestie egestas orci ac suscipit risus posuere loremou.",
        ]}
        orderedList={[
          "Comodous in tempor ullamcorper miaculis",
          "Pellentesque vitae neque mollis urna mattis laoreet.",
          "Divamus sit amet purus justo.",
          "Proin molestie egestas orci ac suscipit risus posuere loremous",
        ]}
        reviewsData={[
          { name: "Jeeva S.", rating: 5, comment: "Absolutely loved it!" },
          {
            name: "Ananya P.",
            rating: 4,
            comment: "Product quality is great.",
          },
        ]}
        questionsData={[
          {
            question: "Is this available in other colors?",
            answer: "Available in black and white.",
          },
          {
            question: "Does this come with a warranty?",
            answer: "Yes, 1-year manufacturer warranty.",
          },
        ]}
      />

      <div className="trending-product-container">
        <h1>YOU MAY ALSO LIKE</h1>
        <div className="grid-box-container">
          {relatedProducts.map((data, index) => {
            const activeDot = hoverIndex === index ? 1 : 0;
            const relImage = data.images?.[0] || "/fallback-image.jpg";
            return (
              <div
                className="data-grid"
                key={data._id}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <div
                  className="image-wrapper"
                  onClick={() => navigate(`/product/${data._id}`)}
                >
                  <img src={relImage} alt={data.name} />
                  <div className="star-overlay">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                  </div>
                  <div className="hover-icons">
                    <i className="bi bi-heart"></i>
                    <i className="bi bi-eye"></i>
                  </div>
                </div>
                <p>{data.name}</p>
                <p>₹{data.price}</p>
                <div className="dots-container">
                  <span
                    className={`dot ${activeDot === 0 ? "active" : ""}`}
                  ></span>
                  <span
                    className={`dot ${activeDot === 1 ? "active" : ""}`}
                  ></span>
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

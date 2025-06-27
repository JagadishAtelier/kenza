import React, { useEffect, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "./CartDrawer.css";
import { getAllProducts } from "../../Api/productApi";
import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContext/CartContext";
import TPImage1 from "../../Assets/p1.webp";
import TPImage2 from "../../Assets/p2.webp";
import TPImage3 from "../../Assets/p3.webp";
import TPImage4 from "../../Assets/p4.webp";
import TPImage5 from "../../Assets/p5.webp";
import TPImage6 from "../../Assets/p6.webp";
import TPImage7 from "../../Assets/p1.webp";
import TPImage8 from "../../Assets/p8.webp";
import { updateProductQuantity } from "../../Api/cartApi";
// const featuredProducts = [
//   {
//     image: TPImage1,
//     bottomImages: [TPImage2, TPImage3, TPImage4, TPImage5],
//     hoverImage: TPImage2,
//     text: "Aliqunaim Retrum Mollis",
//     price: "$ 18.00",
//     type: "organics",
//   },
//   {
//     image: TPImage2,
//     bottomImages: [TPImage2, TPImage3, TPImage4, TPImage5],
//     hoverImage: TPImage3,
//     text: "American Grapes",
//     price: "$ 17.00",
//     type: "organics",
//   },
//   {
//     image: TPImage3,
//     bottomImages: [TPImage2, TPImage3, TPImage4, TPImage5],
//     hoverImage: TPImage4,
//     text: "Autum Eua Guide",
//     price: "$ 16.00",
//     type: "organics",
//   },
//   {
//     image: TPImage4,
//     bottomImages: [TPImage2, TPImage3, TPImage4, TPImage5],
//     hoverImage: TPImage5,
//     text: "Consectuar Adipicing",
//     price: "$ 15.00",
//     type: "organics",
//   },
//   {
//     image: TPImage7,
//     bottomImages: [TPImage2, TPImage3, TPImage4, TPImage5],
//     hoverImage: TPImage6,
//     text: "Fuse Fermentum",
//     price: "$ 12.00",
//     type: "organics",
//   },
//   {
//     image: TPImage8,
//     bottomImages: [TPImage2, TPImage3, TPImage4, TPImage5],
//     hoverImage: TPImage1,
//     text: "Maruis Bibendum",
//     price: "$ 10.00",
//     type: "organics",
//   },
//   {
//     image: TPImage3,
//     bottomImages: [TPImage2, TPImage3, TPImage4, TPImage5],
//     hoverImage: TPImage7,
//     text: "Mustard",
//     price: "$ 15.00",
//     type: "organics",
//   },
//   {
//     image: TPImage4,
//     bottomImages: [TPImage2, TPImage3, TPImage4, TPImage5],
//     hoverImage: TPImage8,
//     text: "Organic Chilli",
//     price: "$ 14.00",
//     type: "organics",
//   },
// ];
function CartDrawer({ show, onClose }) {
  const { cartItems, removeFromCart, addToCart, setCartItems } =
    useCart();
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [allproduct, setAllProducts] = useState([]);
  const user = JSON.parse(localStorage.getItem("userDetails"));

  <CartDrawer show={showCartDrawer} onClose={() => setShowCartDrawer(false)} />;
  const navigate = useNavigate();
  const handleQuantityChange = async (productId, type) => {
    const productIndex = cartItems.findIndex(
      (item) => item.productId._id === productId
    );
    if (productIndex === -1) return;

    const currentQuantity = cartItems[productIndex].quantity || 1;
    const newQuantity =
      type === "inc" ? currentQuantity + 1 : Math.max(1, currentQuantity - 1);

    try {
      await updateProductQuantity(user._id, productId, newQuantity); // ✅ backend sync

      setCartItems((prev) =>
        prev.map((item) =>
          item.productId._id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } catch (err) {
      console.error("❌ Failed to update quantity:", err);
    }
  };

  const handleAddToCart = async (product) => {
    if (!product) return;

    try {
      await addToCart(product); // Uses your CartContext function
      // Optionally show some feedback
    } catch (err) {
      console.error("❌ Error adding to cart:", err);
      alert("Failed to add to cart.");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const allProductsResponse = await getAllProducts();
      const allProducts = allProductsResponse.data;
      setAllProducts(allProducts); // 🔁 Fix: Use correct variable
    };

    fetchProducts(); // 🟢 Call the async function
  }, []);

  const totalAmount = cartItems.reduce((total, item) => {
    const priceStr = item?.productId?.price || "0";
    const numericPrice =
      typeof priceStr === "string"
        ? parseFloat(priceStr.replace(/[^\d.]/g, ""))
        : priceStr;
    return total + numericPrice * (item.quantity || 1);
  }, 0);

  return (
    <div className={`cart-drawer ${show ? "open" : ""}`}>
      <div className="cart-header">
        <h3>CART</h3>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
      </div>
      <div className="cart-top-carousel">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          loop={true}
        >
          <SwiperSlide>
            <p>🎁 Free Delivery on Orders Above $50!</p>
          </SwiperSlide>
          <SwiperSlide>
            <p>🎉 Flat 10% Off with Gift Voucher Code: SAVE10</p>
          </SwiperSlide>
          <SwiperSlide>
            <p>💸 Big Savings This Week Only – Don’t Miss Out!</p>
          </SwiperSlide>
          <SwiperSlide>
            <p>🚀 Fast & Secure Checkout Experience!</p>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="cart-body">
        {/* Cart Items List */}
        {cartItems.map((item, index) => {
          const product = item?.productId;
          if (!product) return null; // Skip if productId not populated

          const priceStr = product.price || "0";
          const numericPrice =
            typeof priceStr === "string"
              ? parseFloat(priceStr.replace(/[^\d.]/g, ""))
              : Number(priceStr);
          // const quantity = item.quantity || 1;
          return (
            <div className="cart-item" key={index}>
              <img src={product.images?.[0]} alt={item.text} />
              <div className="cart-drawer-text-price">
                <div className="cart-drawer-item-text-div">
                  <div className="cart-drawer-item-text">
                    <p>
                      <strong>{item.text}</strong>
                    </p>
                    <p>
                      {item.quantity || 1} x ₹{numericPrice.toFixed(2)} = ₹
                      {(numericPrice * (item.quantity || 1)).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="cart-item-price-container">
                  <div className="cart-item-quantity-container">
                    <div className="quantity-section">
                      <div className="quantity-box">
                        <button
                          onClick={() =>
                            handleQuantityChange(item.productId._id, "dec")
                          }
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item.productId._id, "inc")
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="cart-drawer-remove-buy-btn-div">
                  <button
                    onClick={() => removeFromCart(item.productId._id)}
                    className="cart-remove-btn"
                  >
                    Remove
                  </button>

                  {/* <button
  onClick={() => {
    onClose(); // Close drawer
    navigate('/payment', { state: { product: item } }); // Navigate with item
  }}
  className='cart-buy-btn'
>
  Buy Now
</button> */}
                </div>
              </div>
            </div>
          );
        })}

        <hr />

        {/* You Might Like Section */}
        <div className="recommend">
          <h4>You Might Also Like</h4>
          <div className="recommend-list">
            {allproduct.map((item, index) => {
              const isInCart = cartItems.some(
                (ci) => ci.productId._id === item._id
              );
              return (
                <div className="recommend-item" key={index}>
                  <img src={item.images?.[0]} alt={item.text} />
                  <div>
                    <p>{item.name}</p>
                    <p>₹{item.price}</p>
                    <button
                      onClick={() => handleAddToCart(item)}
                      disabled={isInCart}
                    >
                      {isInCart ? "Added" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="check-out-container">
        <div className="check-out-price">
          <h3>Total</h3>
          <h3>₹{totalAmount}.00</h3>
        </div>
        <div className="check-out-para">
          <p>Taxes and shipping calculated at checkout</p>
        </div>
        <div className="check-out-btn-div">
          <button
            style={{ backgroundColor: "#3b9048" }}
            onClick={() => {
              onClose();
              navigate("/payment", {
                state: { source: "cart" }, // ✅ Pass source
              });
            }}
            disabled={cartItems.length === 0}
          >
            CHECK OUT
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartDrawer;

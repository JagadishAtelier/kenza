import React,{useEffect, useState} from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import './CartDrawer.css';
import { getAllProducts } from '../../Api/productApi';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext/CartContext';
import TPImage1 from '../../Assets/p1.webp'
import TPImage2 from '../../Assets/p2.webp'
import TPImage3 from '../../Assets/p3.webp'
import TPImage4 from '../../Assets/p4.webp'
import TPImage5 from '../../Assets/p5.webp'
import TPImage6 from '../../Assets/p6.webp'
import TPImage7 from '../../Assets/p1.webp'
import TPImage8 from '../../Assets/p8.webp'
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
function CartDrawer({ show, onClose }) {
  const { cartItems, removeFromCart,addToCart,updateQuantity  } = useCart();
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [allproduct,setAllProducts] = useState([]);
<CartDrawer show={showCartDrawer} onClose={() => setShowCartDrawer(false)} />
  console.log("CartPage cartItems:", cartItems)
   const navigate = useNavigate() 
   const handleQuantityChange = (index, type) => {
    updateQuantity(index, type);
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
    const numericPrice = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0;
    return total + numericPrice * (item.quantity || 1);
  }, 0);
  
  return (
    <div className={`cart-drawer ${show ? 'open' : ''}`}>
      <div className="cart-header">
        <h3>CART</h3>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
      <div className="cart-top-carousel">
  <Swiper
    modules={[Autoplay]}
    spaceBetween={30}
    slidesPerView={1}
    autoplay={{ delay: 2000, disableOnInteraction: false }}
    loop={true}
  >
    <SwiperSlide><p>🎁 Free Delivery on Orders Above $50!</p></SwiperSlide>
    <SwiperSlide><p>🎉 Flat 10% Off with Gift Voucher Code: SAVE10</p></SwiperSlide>
    <SwiperSlide><p>💸 Big Savings This Week Only – Don’t Miss Out!</p></SwiperSlide>
    <SwiperSlide><p>🚀 Fast & Secure Checkout Experience!</p></SwiperSlide>
  </Swiper>
</div>

      <div className="cart-body">
        {/* Cart Items List */}
        {cartItems.map((item, index) => {
const numericPrice = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0;
const itemTotal = numericPrice * (item.quantity || 1);
  return (
    <div className="cart-item" key={index}>
      <img src={item.images?.[0]} alt={item.text} />
      <div className='cart-drawer-text-price'>
        <div className='cart-drawer-item-text-div'>
          <div className='cart-drawer-item-text'>
            <p><strong>{item.text}</strong></p>
            <p>{item.quantity || 1} x ₹{numericPrice.toFixed(2)} = ₹{(numericPrice * (item.quantity || 1)).toFixed(2)}</p>
          </div>
        </div>
        <div className="cart-item-price-container">
              <div className="cart-item-quantity-container">
                <div className="quantity-section">
                  <div className="quantity-box">
                    <button onClick={() => handleQuantityChange(index, 'dec')}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(index, 'inc')}>+</button>
                  </div>
                </div>
              </div>
            </div>

        <div className='cart-drawer-remove-buy-btn-div'>
          <button onClick={() => removeFromCart(index)} className='cart-remove-btn'>Remove</button>
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
  const isInCart = cartItems.some(ci => ci.text === item.text);
  return (
    <div className="recommend-item" key={index}>
      <img src={item.images?.[0]} alt={item.text} />
      <div>
        <p>{item.name}</p>
        <p>₹{item.price}</p>
        <button
          onClick={() => addToCart(item)}
          disabled={isInCart}
        >
          {isInCart ? 'Added' : 'Add to Cart'}
        </button>
      </div>
    </div>
    
  );
})}

          </div>
        </div>
      </div>
      <div className='check-out-container'>
      <div className='check-out-price'>
        <h3>Total</h3>
        <h3>₹{totalAmount}.00</h3>
      </div>
      <div className='check-out-para'>
        <p>Taxes and shipping calculated at checkout</p>
      </div>
      <div className='check-out-btn-div'>
        <button style={{backgroundColor:"#3b9048"}} onClick={()=>{onClose();navigate('/payment')}} disabled={cartItems.length === 0}>CHECK OUT</button>
      </div>
    </div>
    </div>


  );
}

export default CartDrawer;

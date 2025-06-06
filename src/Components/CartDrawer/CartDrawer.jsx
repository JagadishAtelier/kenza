import React from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import './CartDrawer.css';
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
  const { cartItems, removeFromCart, addToCart } = useCart();

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
        {cartItems.map((item, index) => (
          <div className="cart-item" key={index}>
            <img src={item.image} alt={item.text} />
            <div className='cart-drawer-text-price'>
              <p><strong>{item.text}</strong></p>
              <p>1 x {item.price}</p>
              <div className='cart-drawer-remove-buy-btn-div'>
                <button onClick={() => removeFromCart(index)} className='cart-remove-btn'>Remove</button>
                <button onClick={() => removeFromCart(index)} className='cart-buy-btn'>Buy Now</button>
              </div>
            </div>
          </div>
        ))}

        <hr />

        {/* You Might Like Section */}
        <div className="recommend">
          <h4>You Might Also Like</h4>
          <div className="recommend-list">
            {featuredProducts.map((item, index) => (
              <div className="recommend-item" key={index}>
                <img src={item.image} alt={item.text} />
                <div>
                  <p>{item.text}</p>
                  <p>{item.price}</p>
                  <button onClick={() => addToCart(item)}>Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartDrawer;

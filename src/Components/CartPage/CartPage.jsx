import React, { useEffect, useState } from 'react';
import './CartPage.css';
import {useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext/CartContext';
function CartPage() {
  const navigate = useNavigate();
  const { cartItems, updateQuantity } = useCart();
  console.log("CartPage cartItems:", cartItems)
  // useEffect(() => {
  //   if (incomingProduct) {
  //     setCartItems((prevItems) => {
  //       const existingIndex = prevItems.findIndex(
  //         (item) => item.name === incomingProduct.name
  //       );
  //       if (existingIndex !== -1) {
  //         const updatedItems = [...prevItems];
  //         updatedItems[existingIndex].quantity += 1;
  //         return updatedItems;
  //       } else {
  //         const rawPrice = incomingProduct.price?.toString().replace(/[^\d.]/g, '');
  //         const price = Number(rawPrice);

  //         return [
  //           ...prevItems,
  //           {
  //             ...incomingProduct,
  //             price,
  //             quantity: 1,
  //           },
  //         ];
  //       }
  //     });
  //   }
  // }, [incomingProduct]);

  const handleQuantityChange = (index, type) => {
    updateQuantity(index, type); // from context
  };
  

  if (cartItems.length === 0) {
    return (
      <div className="cart-page-container">
        <h2>No product in cart</h2>
        <button onClick={() => navigate('/')}>Go to Home</button>
      </div>
    );
  }

  return (
    <div className="cart-page-container">
      <h1>Your Shopping Cart</h1>

      {/* Headings only once */}
      <div className="cart-item-content cart-item-heading">
        <div className="cart-item-product-container">
          <h3>Product</h3>
        </div>
        <div className="cart-item-price-container">
          <h3>Price</h3>
        </div>
        <div className="cart-item-price-container">
          <h3>Quantity</h3>
        </div>
        <div className="cart-item-price-container">
          <h3>Total</h3>
        </div>
      </div>

      {/* Product list */}
      {cartItems.map((product, index) => {
        const totalPrice = product.price * product.quantity;

        return (
            <>
          <div className="cart-item-content" key={index}>
            {/* Product Info */}
            <div className="cart-item-product-container">
              <div className="cart-item-product-container-image-text">
                <img src={product.images?.[0]} alt="product" />
                <h6>{product.name}</h6>
              </div>
            </div>

            {/* Price */}
            <div className="cart-item-price-container">
              <div className="cart-item-price-container-text">
                <h6>₹{product.price}</h6>
              </div>
            </div>

            {/* Quantity */}
            <div className="cart-item-price-container">
              <div className="cart-item-quantity-container-text">
                <div className="quantity-section">
                  <div className="quantity-box">
                    <button onClick={() => handleQuantityChange(index, 'dec')}>−</button>
                    <span>{product.quantity}</span>
                    <button onClick={() => handleQuantityChange(index, 'inc')}>+</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="cart-item-price-container">
              <div className="cart-item-price-container-text">
                <h6>₹{totalPrice}.00</h6>
              </div>
            </div>
          </div>
          <hr className='CART-hr'/>
          </>
        );
      })}

    </div>
  );
}

export default CartPage;

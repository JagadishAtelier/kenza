import React,{useState} from 'react'
import './PaymentPage.css'
import TPImage1 from '../../Assets/p1.webp'
import TPImage2 from '../../Assets/p2.webp'
import TPImage3 from '../../Assets/p3.webp'
import TPImage4 from '../../Assets/p4.webp'
import TPImage5 from '../../Assets/p5.webp'
import TPImage6 from '../../Assets/p6.webp'
import TPImage7 from '../../Assets/p1.webp'
import TPImage8 from '../../Assets/p8.webp'
import { useCart } from '../CartContext/CartContext'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
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
function PaymentPage() {
  const navigate = useNavigate()
  const location = useLocation();
  const productFromState = location.state?.product;
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [showContact, setShowContact] = useState(false);
const [showDelivery, setShowDelivery] = useState(false);
const [showPayment, setShowPayment] = useState(false);
const [activeSection, setActiveSection] = useState('contact');
const { placeOrder, clearCart, cartItems } = useCart();
const handleConfirmOrder = () => {
  const confirmedOrders = productFromState ? [productFromState] : cartItems;

  setOrderConfirmed(true);

  // Clear cart if needed
  clearCart();

  // Navigate to profile with confirmedOrders
  navigate('/profile', {
    state: {
      confirmedOrders
    }
  });
};

const totalAmount =
  cartItems.reduce((total, item) => {
    const price = parseFloat(item.price.replace('$', '').trim());
    return total + price * (item.quantity || 1);
  }, 0) +
  (productFromState
    ? parseFloat(productFromState.price.replace('$', '').trim())
    : 0);


    const [paymentMethod, setPaymentMethod] = useState('card');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [securityCode, setSecurityCode] = useState('');
    const [nameOnCard, setNameOnCard] = useState('');
    const [useShippingAsBilling, setUseShippingAsBilling] = useState(true);

const handleSubmit = () => {
  if (paymentMethod === 'card') {
    if (!cardNumber || !expiry || !securityCode || !nameOnCard) {
      alert('Please fill all card details.');
      return;
    }
    alert(`Payment method: Credit Card\nName: ${nameOnCard}`);
  } else {
    alert('Payment method: Cash on Delivery (COD)');
  }
  
  const confirmedOrders = productFromState ? [productFromState] : cartItems;
  console.log("✅ Confirmed Orders:", confirmedOrders);
  placeOrder(confirmedOrders); // ✅ Save order globally
  clearCart(); // ✅ Clear the cart

  setOrderConfirmed(true);

  navigate('/profile-page'); // ✅ Profile page will now access order from context
};

    
  return (
    <div className='payment-page-container'>
        <div className='payment-left-side-container'>
        <div className='payent-page-contact-container'>
  <div className='payment-contact-text-login'>
    <h4>Contact</h4>
    <button onClick={() => setActiveSection('contact')} className='info-edit-btn'>Edit</button>
  </div>

  {activeSection === 'contact' ? (
    <>
      <input type='text' placeholder='Email or Mobile Phone Number' className='payment-text-box' />
      <div className='payment-page-checkbox-input-text'>
        <input type='checkbox' className='payment-check-box' />
        <p>Email me with news and offers</p>
      </div>
    </>
  ) : (
    <p>Contact Info: Not Provided</p>
  )}
</div>


<div className='payment-delivery-conatiner-left'>
  <div className='payment-contact-text-login'>
    <h4>Delivery</h4>
    <button onClick={() => setActiveSection('delivery')} className='info-edit-btn'>Edit</button>
  </div>

  {activeSection === 'delivery' ? (
    <>
      <select className='delivery-country-select-box'>
        <option>India</option>
        <option>United States</option>
        <option>United Kingdom</option>
      </select>
      <div className='delivery-name-container'>
        <input type='text' placeholder='First Name' className='payment-delivery-name-box' />
        <input type='text' placeholder='Last Name' className='payment-delivery-name-box' />
      </div>
      <input type='text' placeholder='Address' className='payment-text-box' />
      <input type='text' placeholder='Apartment,Suite,etc(Optional)' className='payment-text-box' />
      <div className='delivery-name-container'>
        <input type='text' placeholder='City' className='payment-text-box' />
        <input type='text' placeholder='State' className='payment-text-box' />
        <input type='text' placeholder='Pincode' className='payment-text-box' />
      </div>
      <div className='payment-page-checkbox-input-text'>
        <input type='checkbox' className='payment-check-box' />
        <p>Save this information for next time</p>
      </div>
    </>
  ) : (
    <p>Delivery Address: Not Selected</p>
  )}
</div>
{/* Product Details Section under Delivery */}
<div className="product-details-under-delivery">
  <h4>Product Details</h4>
  <div className="product-items-list">
    {cartItems.map((product, index) => (
      <div className="product-item-row" key={index}>
        <img src={product.image} alt={product.text} className="product-thumb" />
        <div className="product-info">
          <p className="product-name">{product.text}</p>
          <p className="product-price">Qty: {product.quantity}</p>
          <p className="product-price">{product.price}</p>

        </div>
      </div>
    ))}
  {productFromState && (
    <div className="product-item-row" key="buy-now">
      <img src={productFromState.image} alt={productFromState.text} className="product-thumb" />
      <div className="product-info">
        <p className="product-name">{productFromState.text}</p>
        <p className="product-price">Qty: 1</p>
        <p className="product-price">{productFromState.price}</p>
      </div>
    </div>
  )}
  </div>
  <div className="product-total-amount">
    <strong>Total: ₹ {totalAmount.toFixed(2)}</strong>
  </div>
</div>


<div className="payment-container">
  <div className='payment-contact-text-login'>
    <h2>Payment</h2>
    <button onClick={() => setActiveSection('payment')} className='info-edit-btn'>Edit</button>
  </div>
  <p className="secure-text">All transactions are secure and encrypted.</p>

  {activeSection === 'payment' ? (
    <div className="payment-option">
      <div className={`option ${paymentMethod === 'card' ? 'selected' : ''}`}>
        <input
          type="radio"
          name="payment"
          checked={paymentMethod === 'card'}
          onChange={() => setPaymentMethod('card')}
          className='payment-check-box'
        />
        <p>Credit card</p>
      </div>

      {paymentMethod === 'card' && (
        <div className="card-details">
          <input type="text" placeholder="Card number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className='payment-text-box' />
          <div className="row">
            <input type="text" placeholder="Expiration date (MM / YY)" value={expiry} onChange={(e) => setExpiry(e.target.value)} className='payment-text-box' />
            <input type="text" placeholder="Security code" value={securityCode} onChange={(e) => setSecurityCode(e.target.value)} className='payment-text-box' />
          </div>
          <input type="text" placeholder="Name on card" value={nameOnCard} onChange={(e) => setNameOnCard(e.target.value)} className='payment-text-box' />
          <div className="checkbox">
            <input type="checkbox" checked={useShippingAsBilling} onChange={(e) => setUseShippingAsBilling(e.target.checked)} className='payment-check-box' />
            <p>Use shipping address as billing address</p>
          </div>
        </div>
      )}

      <div className={`option ${paymentMethod === 'cod' ? 'selected' : ''}`}>
        <input
          type="radio"
          name="payment"
          checked={paymentMethod === 'cod'}
          onChange={() => setPaymentMethod('cod')}
          className='payment-check-box'
        />
        <p>Cash on Delivery (COD)</p>
      </div>
    </div>
  ) : (
    <p>Payment Method: Not Selected</p>
  )}

  <button className="pay-btn" onClick={handleSubmit}>Pay now</button>
</div>

            

        </div>

        <div className='payment-right-side-container'>
            <div className='payment-right-heading'>
              <h1>Items</h1>
            </div>
            <div className='payment-grid-container'>
              {cartItems.map((product,index)=>(
                <div className='payment-data-grid'>
                  <img src={product.image}/>
                  <p>{product.text}</p>
                  <p>{product.price}</p>
                  <p>Qty: {product.quantity}</p>
                </div>
              ))}
{productFromState && (
    <div className='payment-data-grid' key="buy-now-summary">
      <img src={productFromState.image} />
      <p>{productFromState.text}</p>
      <p>{productFromState.price}</p>
      <p>Qty: 1</p>
    </div>
  )}
            </div>
        </div>
      
    </div>
  )
}

export default PaymentPage

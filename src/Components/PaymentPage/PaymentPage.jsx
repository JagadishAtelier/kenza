import React,{useState} from 'react'
import './PaymentPage.css'
import { createOrder } from '../../Api/orderApi';
import { createCustomerAddress } from '../../Api/customerAddressApi';

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

const [contactInfo, setContactInfo] = useState('');
const [addressInfo, setAddressInfo] = useState({
  house: '',
  street: '',
  landMark: '',
  district: '',
  city: '',
  state: '',
  pincode: ''
});

const isContactValid = contactInfo.trim() !== '';
const isDeliveryValid =
  addressInfo.house?.trim() !== '' &&
  addressInfo.street?.trim() !== '' &&
  addressInfo.landMark?.trim() !== '' &&
  addressInfo.city?.trim() !== '' &&
  addressInfo.district?.trim() !== '' &&
  addressInfo.state?.trim() !== '' &&
  addressInfo.pincode?.trim() !== '';

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
    const price = parseFloat(item.productId?.price?.replace(/[^\d.]/g, '') || '0');
    return total + price * (item.quantity || 1);
  }, 0) +
  (productFromState
    ? parseFloat(productFromState.price?.replace(/[^\d.]/g, '') || '0')
    : 0);



    const [paymentMethod, setPaymentMethod] = useState('card');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [securityCode, setSecurityCode] = useState('');
    const [nameOnCard, setNameOnCard] = useState('');
    const [useShippingAsBilling, setUseShippingAsBilling] = useState(true);

    const handleSubmit = async () => {
      const storedUser = localStorage.getItem("userDetails");
      const userId = storedUser ? JSON.parse(storedUser)._id : null;
    
      if (!userId) {
        alert("User not logged in. Please login to place order.");
        return;
      }
    
      if (paymentMethod === 'card') {
        if (!cardNumber || !expiry || !securityCode || !nameOnCard) {
          alert('Please fill all card details.');
          return;
        }
        alert('Paid Successfully');
      } else {
        alert('Payment method: Cash on Delivery (COD)');
      }
    
      // 🟢 Save address to DB
      const addressData = {
        userId,
        houseNo: addressInfo.house,
        street: addressInfo.street,
        landMark: addressInfo.landMark,
        city: addressInfo.city,
        district: addressInfo.district,
        state: addressInfo.state,
        pincode: addressInfo.pincode
      };
    
      try {
        console.log("📦 Address Payload:", addressData);
        const savedAddress = await createCustomerAddress(addressData);
        console.log('✅ Address saved:', savedAddress);
      } catch (err) {
        console.error('❌ Error saving address:', err);
        alert('Error saving address. Please try again.');
        return;
      }
    
      // 🛒 Order Data
      const productsToOrder = productFromState
        ? [{ productId: productFromState._id || productFromState.id, quantity: 1 }]
        : cartItems.map((item) => ({
            productId: item.productId?._id || item.productId?.id || item._id,
            quantity: item.quantity || 1,
          }));
    
      const generateOrderId = () => {
        const random = Math.floor(1000 + Math.random() * 9000);
        const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        return `ORD${date}-${random}`;
      };
    
      const orderData = {
        id: generateOrderId(),
        buyer: userId,
        location: `${addressInfo.city}, ${addressInfo.state}, ${addressInfo.pincode}`,
        status: 'Completed',
        paymentMethod: paymentMethod === 'card' ? 'Credit Card' : 'Cash on Delivery',
        paymentDate: new Date(),
        products: productsToOrder,
        total: totalAmount,
      };
    
      try {
        console.log("🟡 Order Data Sending to API:", orderData);
        const savedOrder = await createOrder(orderData);
        console.log('✅ Order saved:', savedOrder);
        setOrderConfirmed(true);
        clearCart();
        navigate('/payment-success', {
          state: {
            confirmedOrders: productFromState ? [productFromState] : cartItems
          }
        });
      } catch (err) {
        console.error('❌ Error creating order:', err);
        alert('Error placing order. Please try again.');
      }
    };
    
    
    
  return (
    <div className='payment-page-container'>
        <div className='payment-left-side-container'>
        <div className='payent-page-contact-container'>
  <div className='payment-contact-text-login'>
    <h4>Contact  {!isContactValid && <span style={{ color: 'red', fontSize: '14px' }}> (Incomplete)</span>}</h4>
    <button onClick={() => setActiveSection('contact')} className='info-edit-btn'>Add</button>
  </div>

  {activeSection === 'contact' ? (
    <>
      <input type='text' placeholder='Email or Mobile Phone Number' className='payment-text-box' value={contactInfo}
  onChange={(e) => setContactInfo(e.target.value)}/>
      <div className='payment-page-checkbox-input-text'>
        <input type='checkbox' className='payment-check-box' required/>
        <p>Email me with news and offers</p>
      </div>
    </>
  ) : (
    <p>Contact Info: {contactInfo || 'Not Provided'}</p>
  )}
</div>


<div className='payment-delivery-conatiner-left'>
  <div className='payment-contact-text-login'>
    <h4>Delivery {!isDeliveryValid && <span style={{ color: 'red', fontSize: '14px' }}> (Incomplete)</span>}</h4>
    <button onClick={() => setActiveSection('delivery')} className='info-edit-btn'>Add</button>
  </div>

  {activeSection === 'delivery' ? (
  <>
    <select className='delivery-country-select-box' required>
      <option>India</option>
      <option>United States</option>
      <option>United Kingdom</option>
    </select>


    <input type='text' placeholder='House Number'
      className='payment-text-box'
      value={addressInfo.house}
      onChange={(e) => setAddressInfo({ ...addressInfo, house: e.target.value })}
      required />

    <input type='text' placeholder='Street Name'
      className='payment-text-box'
      value={addressInfo.street}
      onChange={(e) => setAddressInfo({ ...addressInfo, street: e.target.value })}
      required />

    <input type='text' placeholder='Landmark'
      className='payment-text-box'
      value={addressInfo.landMark}
      onChange={(e) => setAddressInfo({ ...addressInfo, landMark: e.target.value })}
      required />

    <div className='delivery-name-container'>
      <input type='text' placeholder='City'
        className='payment-text-box'
        value={addressInfo.city}
        onChange={(e) => setAddressInfo({ ...addressInfo, city: e.target.value })}
        required />

      <input type='text' placeholder='District'
        className='payment-text-box'
        value={addressInfo.district}
        onChange={(e) => setAddressInfo({ ...addressInfo, district: e.target.value })}
        required />

      <input type='text' placeholder='State'
        className='payment-text-box'
        value={addressInfo.state}
        onChange={(e) => setAddressInfo({ ...addressInfo, state: e.target.value })}
        required />
    </div>

    <input type='text' placeholder='Pincode'
      className='payment-text-box'
      value={addressInfo.pincode}
      onChange={(e) => setAddressInfo({ ...addressInfo, pincode: e.target.value })}
      required />

    <div className='payment-page-checkbox-input-text'>
      <input type='checkbox' className='payment-check-box' />
      <p>Save this information for next time</p>
    </div>
  </>
) : (
  <p>
    {addressInfo.firstName
      ? `${addressInfo.firstName} ${addressInfo.lastName}, ${addressInfo.house}, ${addressInfo.street}, ${addressInfo.landMark}, ${addressInfo.address}, ${addressInfo.city}, ${addressInfo.district}, ${addressInfo.state} - ${addressInfo.pincode}, Phone: ${addressInfo.phone}`
      : 'Delivery Address: Not Selected'}
  </p>
)}

</div>
{/* Product Details Section under Delivery */}
<div className="product-details-under-delivery">
  <h4>Product Details</h4>
  <div className="product-items-list">
  {cartItems.map((item, index) => {
              const product = item.productId || item;
              return (
                <div className="product-item-row" key={index}>
                  <img src={product.images?.[0]} alt={product.name} className="product-thumb" />
                  <div className="product-info">
                    <p className="product-name">{product.name}</p>
                    <p className="product-price">Qty: {item.quantity}</p>
                    <p className="product-price">₹{product.price}</p>
                  </div>
                </div>
              );
            })}
  {productFromState && (
    <div className="product-item-row" key="buy-now">
      <img src={productFromState.images?.[0]} alt={productFromState.text} className="product-thumb" />
      <div className="product-info">
        <p className="product-name">{productFromState.name}</p>
        <p className="product-price">Qty: 1</p>
        <p className="product-price">₹{productFromState.price}</p>
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
    <button onClick={() => setActiveSection('payment')} className='info-edit-btn'>Add</button>
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

<button
  className="pay-btn"
  onClick={handleSubmit}
  disabled={
    !contactInfo.trim() ||
    !addressInfo.house?.trim() ||
    !addressInfo.street?.trim() ||
    !addressInfo.landMark?.trim() ||
    !addressInfo.city?.trim() ||
    !addressInfo.district?.trim() ||
    !addressInfo.state?.trim() ||
    !addressInfo.pincode?.trim()
  }
>
  Pay now
</button>


</div>

            

        </div>

        <div className='payment-right-side-container'>
            <div className='payment-right-heading'>
              <h1>Items</h1>
            </div>
            <div className='payment-grid-container'>
            {cartItems.map((item, index) => {
            const product = item.productId || item;
            return (
              <div className='payment-data-grid' key={index}>
                <img src={product.images?.[0]} />
                <p>{product.name}</p>
                <p>₹{product.price}</p>
                <p>Qty: {item.quantity}</p>
              </div>
            );
          })}
{productFromState && (
    <div className='payment-data-grid' key="buy-now-summary">
      <img src={productFromState.images?.[0]} />
      <p>{productFromState.name}</p>
      <p>₹{productFromState.price}</p>
      <p>Qty: 1</p>
    </div>
  )}
            </div>
        </div>
      
    </div>
  )
}

export default PaymentPage

import React,{useState} from 'react'
import './PaymentPage.css'
import image from '../../Assets/TP1.webp'
function PaymentPage() {
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
    
        // Clear form (optional)
        setCardNumber('');
        setExpiry('');
        setSecurityCode('');
        setNameOnCard('');
      };
    
  return (
    <div className='payment-page-container'>
        <div className='payment-left-side-container'>
            <div className='payment-contact-text-login'>
                <h4>Contact</h4>
                <a>login</a>
            </div>
            <input type='text' placeholder='Email or Mobile Phone Number' className='payment-text-box'/>
            <div className='payment-page-checkbox-input-text'>
                <input type='checkbox' className='payment-check-box'/>
                <p>Email me with news and offers</p>
            </div>

            <div className='payment-delivery-conatiner-left'>
                <h4>Delivery</h4>
                <select className='delivery-country-select-box'>
                    <option>India</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                </select>
                <div className='delivery-name-container'>
                    <input type='text' placeholder='First Name' className='payment-delivery-name-box'/>
                    <input type='text' placeholder='Last Name' className='payment-delivery-name-box'/>
                </div>
                <input type='text' placeholder='Address' className='payment-text-box'/>
                <input type='text' placeholder='Apartment,Suite,etc(Optionl)' className='payment-text-box'/>
                <div className='delivery-name-container'>
                    <input type='text' placeholder='City' className='payment-text-box'/>
                    <input type='text' placeholder='State' className='payment-text-box'/>
                    <input type='text' placeholder='Pincode' className='payment-text-box'/>
                </div>
                <div className='payment-page-checkbox-input-text'>
                    <input type='checkbox' className='payment-check-box'/>
                    <p>Save this information for next time</p>
            </div>
            </div>
            <div className="payment-container">
      <h2>Payment</h2>
      <p className="secure-text">All transactions are secure and encrypted.</p>

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
            <input
              type="text"
              placeholder="Card number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className='payment-text-box'
            />
            <div className="row">
              <input
                type="text"
                placeholder="Expiration date (MM / YY)"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className='payment-text-box'
              />
              <input
                type="text"
                placeholder="Security code"
                value={securityCode}
                onChange={(e) => setSecurityCode(e.target.value)}
                className='payment-text-box'
              />
            </div>
            <input
              type="text"
              placeholder="Name on card"
              value={nameOnCard}
              onChange={(e) => setNameOnCard(e.target.value)}
              className='payment-text-box'
            />
            <div className="checkbox">
              <input
                type="checkbox"
                checked={useShippingAsBilling}
                onChange={(e) => setUseShippingAsBilling(e.target.checked)}
                className='payment-check-box'
              />
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

      <button className="pay-btn" onClick={handleSubmit}>Pay now</button>
    </div>
            

        </div>

        <div className='payment-right-side-container'>
            <div className='payment-right-img-text-div'>
                <div className='payment-right-img-div'>
                    <img src={image}/>
                    <h2>Mustard</h2>
                </div>
                <p>$ 15.00</p>
            </div>

            <div className='payment-right-discount-div'>
                <input type='text'placeholder='Discount Code' className='Discount-text-box'/>
                <button>Apply</button>
            </div>
            <div className='payment-right-details-div'>
                <div className='payment-right-total-div'>
                    <h5>Sub Total</h5>
                    <p>$ 15.00</p>
                </div>
                <div className='payment-right-total-div'>
                    <h5>Shipping</h5>
                    <p>Enter shipping address</p>
                </div>
                <div className='payment-right-total-div'>
                    <h4>Total</h4>
                    <p> USD $ 15.00</p>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default PaymentPage

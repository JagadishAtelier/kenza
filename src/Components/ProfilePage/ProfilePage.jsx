import React,{useState,useEffect} from 'react'
import './ProfilePage.css'
import profileImge from '../../Assets/blog1.webp'
import { useLocation } from 'react-router-dom';
import { useCart } from '../CartContext/CartContext';
function ProfilePage() {
    const { orderedItems, cartItems } = useCart();
    const [activeSection, setActiveSection] = useState('profile'); // 'profile' or 'address'
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const location = useLocation();
    const productFromState = location.state?.product; // for Buy Now item
    const [confirmedOrders, setConfirmedOrders] = useState([]);  
    // useEffect(() => {
    //     console.log("✅ Ordered Items from Context:", orderedItems); // <--- Log here
    //   }, [orderedItems]);
    useEffect(() => {
        if (location.state?.confirmedOrders) {
          setConfirmedOrders(location.state.confirmedOrders);
        }
      }, [location.state]);
    const [user, setUser] = useState({
        name: 'Jeeva Sumathi',
        email: 'jeeva@example.com',
        phone: '+91 98765 43210',
        dob: '1995-03-10',
        gender: 'Female',
        profilePic: '',
      });
    
      const [addresses, setAddresses] = useState([
        {
          type: 'Home',
          house:"#123",
          street:"4th Cross",
          LanndMark : "Near XYZ Supermarket",
          city :"Chennai",
          district:"Chennai District",
          state:"Tamil Nadu",
          pincode:"600040",
          phone: '+91 98765 43210',
        }
      ]);
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
      };
      const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddresses((prev) => {
          const updated = [...prev];
          updated[0][name] = value;
          return updated;
        });
    }
    const handleDeleteAddress = () => {
        if (window.confirm("Are you sure you want to delete this address?")) {
          setAddresses([]); // Or remove specific address if multiple
        }
      };
      
  return (
    <div className='profile-page-container'>
    <div className='profile-page-left'>
      <div className='profile-image-content-div'>
        <img src={profileImge}/>
        <h4>Sami</h4>
      </div>

      <hr className='profile-page-hr-line'/>

      <div className='profile-page-personal-details-div'>
        <div className='profile-page-personal-details'style={{cursor:"pointer"}} onClick={() => setActiveSection('profile')}>
            <i class="bi bi-person"></i>
            <h6>My Profile</h6>
        </div>
        <div className='profile-page-personal-details' style={{cursor:"pointer"}} onClick={() => setActiveSection('address')}>
            <i class="bi bi-geo-alt"></i>
            <h6>Delivery Address</h6>
        </div>
      </div>

      <hr className='profile-page-hr-line'/>

      <div className='profile-page-personal-details-div'>
        <div className='profile-page-personal-details' style={{cursor:"pointer"}} onClick={() => setActiveSection('orders')}>
            <i class="bi bi-cart-check"></i>
            <h6>My Order</h6>
        </div>
        <div className='profile-page-personal-details'style={{ cursor: "pointer" }} onClick={() => setActiveSection('wishlist')}>
            <i class="bi bi-heart"></i>
            <h6>My Wishlist</h6>
        </div>
      </div>
    </div>
    <div className='profile-page-right'>
    {activeSection === 'profile' && (
        <div className='profile-page-right-my-profile'>
        <h2>User Information</h2>
        <div className="form-group">
          <h5>Name:</h5>
          <input name="name" value={user.name} onChange={handleInputChange}   readOnly={!isEditingProfile}/>
        </div>
        <div className="form-group">
          <h5>Email:</h5>
          <input name="email" value={user.email} onChange={handleInputChange}  readOnly={!isEditingProfile} />
        </div>
        <div className="form-group">
          <h5>Phone:</h5>
          <input name="phone" value={user.phone} onChange={handleInputChange} readOnly={!isEditingProfile}/>
        </div>
        <div className="form-group">
          <h5>Date of Birth:</h5>
          <input type="date" name="dob" value={user.dob} onChange={handleInputChange} readOnly={!isEditingProfile}/>
        </div>
        <div className="form-group">
          <h5>Gender:</h5>
          <select name="gender" value={user.gender} onChange={handleInputChange}  readOnly={!isEditingProfile}>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
        <div className='form-group-button'>
  {!isEditingProfile ? (
    <button className="edit-btn" onClick={() => setIsEditingProfile(true)}>Edit</button>
  ) : (
    <>
      <button className="save-btn" onClick={() => setIsEditingProfile(false)}>Save Changes</button>
      <button className="edit-btn" onClick={() => setIsEditingProfile(false)}>Cancel</button>
    </>
  )}
</div>
        </div>
    )}
     {activeSection === 'address' && (
        <div className='profile-page-right-my-profile'>
        <h2>Home Address</h2>
        <div className="form-group-address">
          <h5>House/Flat No. :</h5>
          <input name="house" value={addresses[0].house} onChange={handleAddressChange}  readOnly={!isEditingProfile} />
        </div>
        <div className="form-group-address">
          <h5>Street / Locality :</h5>
          <input name="street" value={addresses[0].street} onChange={handleAddressChange}  readOnly={!isEditingProfile} />
        </div>
        <div className="form-group-address">
          <h5>Landmark (Optional) :</h5>
          <input name="landMark" value={addresses[0].LanndMark} onChange={handleAddressChange}  readOnly={!isEditingProfile} />
        </div>
        <div className="form-group-address">
          <h5>City / Town :</h5>
          <input type="text" name="city" value={addresses[0].city} onChange={handleAddressChange}  readOnly={!isEditingProfile} />
        </div>
        <div className="form-group-address">
          <h5>District:</h5>
          <input type="text" name="district" value={addresses[0].district} onChange={handleAddressChange}  readOnly={!isEditingProfile} />
        </div>
        <div className="form-group-address">
          <h5>State:</h5>
          <input type="text" name="state" value={addresses[0].state} onChange={handleAddressChange}  readOnly={!isEditingProfile} />
        </div>
        <div className="form-group-address">
          <h5>Pincode:</h5>
          <input type="text" name="pincode" value={addresses[0].pincode} onChange={handleAddressChange}  readOnly={!isEditingProfile} />
        </div>
        <div className='form-group-button'>
  {!isEditingProfile ? (
    <button className="edit-btn" onClick={() => setIsEditingProfile(true)}>Edit</button>
  ) : (
    <>
      <button className="save-btn" onClick={() => setIsEditingProfile(false)}>Save Changes</button>
      <button className="edit-btn" onClick={() => setIsEditingProfile(false)}>Cancel</button>
      <button className="delete-btn" onClick={handleDeleteAddress}>Delete</button>
    </>
  )}
</div>
        </div>
     )}
     {/* {activeSection === 'wishlist' && (
  <div className='payment-right-side-container'>
    <div className='payment-right-heading'>
      <h1>My Wishlist</h1>
    </div>
    <div className='payment-grid-container'>
      {wishlist.length === 0 ? (
        <p>No items in your wishlist.</p>
      ) : (
        wishlist.map((item, index) => (
          <div className='payment-data-grid' key={index}>
            <img src={item.image} alt="wishlist product"/>
            <p>{item.text}</p>
            <p>₹{item.price}</p>
          </div>
        ))
      )}
    </div>
  </div>
)} */}


{activeSection === 'orders' && (
  <div className='payment-right-side-container'>
    <div className='payment-right-heading'>
      <h1>My Orders</h1>
    </div>
    <div className='payment-grid-container'>
      {orderedItems.length === 0 && !productFromState ? (
        <p>No items ordered yet.</p>
      ) : (
        <>
          {orderedItems.map((product, index) => (
            <div className='payment-data-grid' key={index}>
              <img src={product.image} alt="product"/>
              <p>{product.text}</p>
              <p>₹{product.price}</p>
              <p>Qty: {product.quantity}</p>
            </div>
          ))}
          {orderedItems.length === 0 && (
                <p style={{ padding: "1rem" }}>You have not ordered anything yet.</p>
              )}
          {productFromState && (
            <div className='payment-data-grid' key="buy-now-summary">
              <img src={productFromState.image} alt="product"/>
              <p>{productFromState.text}</p>
              <p>₹{productFromState.price}</p>
              <p>Qty: 1</p>
            </div>
          )}
        </>
      )}
    </div>
  </div>
)}


    </div>
    </div>
  )
}

export default ProfilePage

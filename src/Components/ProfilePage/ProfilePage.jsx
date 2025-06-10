import React,{useState,useEffect} from 'react'
import './ProfilePage.css'
import profileImge from '../../Assets/blog1.webp'
import { useLocation } from 'react-router-dom';
import { useCart } from '../CartContext/CartContext';
import { useWishlist } from '../WishlistContext/WishlistContext';
function ProfilePage() {
    const { orderedItems, cartItems } = useCart();
    const { wishlist  } = useWishlist();
    const [activeSection, setActiveSection] = useState('profile'); // 'profile' or 'address'
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const location = useLocation();
    const productFromState = location.state?.product; // for Buy Now item
    const [confirmedOrders, setConfirmedOrders] = useState([]);  
    useEffect(() => {
        console.log("✅ wishlist  Items from Context:", wishlist ); // <--- Log here
      }, [wishlist ]);
    // useEffect(() => {
    //     console.log("✅ Ordered Items from Context:", orderedItems); // <--- Log here
    //   }, [orderedItems]);
    useEffect(() => {
        if (location.state?.confirmedOrders) {
          setConfirmedOrders(location.state.confirmedOrders);
        }
      }, [location.state]);
    const [user, setUser] = useState({
        name: 'Your Name',
        email: 'yourmail@gmail.com',
        phone: '+91 Your phone number',
        dob: 'Date of Borth',
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

      <hr className='profile-page-hr-line'/>

      <div className='profile-page-personal-details-div'>
        <div className='profile-page-personal-details' style={{cursor:"pointer"}} onClick={() => setActiveSection('Preferences')}>
            <i class="bi bi-cart-check"></i>
            <h6>About My Preferences</h6>
        </div>
        <div className='profile-page-personal-details'style={{ cursor: "pointer" }} onClick={() => setActiveSection('Instructions')}>
            <i class="bi bi-heart"></i>
            <h6>Delivery Instructions</h6>
        </div>
      </div>


      <hr className='profile-page-hr-line'/>

      <div className='profile-page-personal-details-div'>
        <div className='profile-page-personal-details' style={{cursor:"pointer"}} onClick={() => setActiveSection('Details')}>
            <i class="bi bi-cart-check"></i>
            <h6>Subscription Details</h6>
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
     {activeSection === 'wishlist' && (
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
)}


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
{activeSection === 'Preferences' &&(
    <div className='profile-page-right-my-profile'>
        <h1>About My Preferences</h1>
        <br/>
        <h5>What It Is</h5>
        <p>The "My Preferences" section allows users to define and manage their dietary or shopping preferences so the website/app can personalize recommendations, filters, and search results accordingly.</p>
        <br/>
        <h5> Purpose</h5>
        <ul>
            <li>Personalized Experience: Tailor product listings to user preferences.</li>
            <li>Health & Lifestyle Support: Support users with dietary restrictions (e.g., diabetic, keto, vegan).</li>
            <li>Improved Recommendations: Recommend relevant products or combos.</li>
            <li>Better Filters/Search: Let users auto-filter what not to show.</li>
        </ul>
        <br/>
        <h5>How It Can Be Implemented</h5>
        <h5>1. Profile Section UI</h5>
        <p>A "My Preferences" form with toggles, checkboxes, or multiselect dropdowns.Free text input for custom preferences (e.g., "Avoid bitter vegetables").</p>
        <br/>
        <h5>2. Saving Preferences</h5>
        <p>Save in user profile (database) when logged in.Use localStorage or cookies for guest users.</p>
        <br/>
        <h5> Benefits to Users</h5>
        <ul>
            <li>Saves time browsing.</li>
            <li>Builds trust by showing relevant items.</li>
            <li>Supports health needs automatically.</li>
            <li>Encourages more purchases with accurate suggestions.</li>
        </ul>
    </div>
)}
{activeSection === 'Instructions' &&(
    <div className='profile-page-right-my-profile'>
        <h1>Delivery Instructions</h1>
        <br/>
        <h5>What It Is</h5>
        <p>Delivery Instructions allow users to provide specific guidance to delivery agents or the platform to ensure smooth and accurate delivery of their orders.</p>
        <br/>
        <h5>Purpose</h5>
        <ul>
            <li>Help delivery agents find the address easily.</li>
            <li>Prevent missed deliveries due to unclear directions.</li>
            <li>Support users with unique needs (e.g., elderly, gated societies).</li>
            <li>Improve overall delivery success and customer satisfaction.</li>
        </ul>
        <br/>
        <h5>Benefits</h5>
        <ul>
            <li>Improves First-Time Delivery Success Rate.</li>
            <li>Reduces Confusion or Miscommunication.</li>
            <li>Enhances Customer Experience (especially for high-touch items like groceries).</li>
            <li>Increases Trust by respecting user instructions.</li>
        </ul>
    </div>
)}
{activeSection === 'Details' &&(
    <div className='profile-page-right-my-profile'>
        <h1>Subscription Details</h1>
        <br/>
        <p>Our subscription service is designed to ensure you receive the freshest vegetables at your doorstep on a regular basis — without the hassle of reordering every time. Here’s everything you need to know:</p>
        <br/>
        <h5>What’s Included</h5>
        <ul>
            <li>Fresh & Seasonal Vegetables: Curated selection of locally-sourced, farm-fresh vegetables.</li>
            <li>Customizable Boxes: Choose your preferences – organic, leafy greens, root vegetables, or mixed.</li>
            <li>Flexible Quantities: Select from small (for individuals), medium (for couples), or large (for families).</li>
            <li>Add-on Options: Include fruits, herbs, or exotic vegetables with your subscription.</li>
        </ul>
        <br/>
        <h5>Delivery Frequency</h5>
        <ul>
            <li>Weekly (Most Popular): Fresh vegetables delivered once a week.</li>
            <li>Bi-Weekly: Every two weeks, ideal for moderate users.</li>
            <li>Monthly: Once a month, great for occasional vegetable users or long-shelf-life items.</li>
            <li>Choose Your Slot: Morning or evening delivery options available.</li>
            <li>Timely Reminders: Get SMS/email reminders before your scheduled delivery.</li>
        </ul>
        <br/>
        <h5>Benefits</h5>
        <ul>
            <li>Freshness Guarantee</li>
            <li>Free doorstep delivery</li>
            <li>Priority support for subscribers</li>
            <li>Surprise free items on select orders</li>
        </ul>
    </div>
)}


    </div>
    </div>
  )
}

export default ProfilePage

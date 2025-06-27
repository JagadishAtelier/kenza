import React,{useState,useEffect} from 'react'
import './ProfilePage.css'
import profileImge from '../../Assets/blog1.webp'
import { useLocation } from 'react-router-dom';
import { useCart } from '../CartContext/CartContext';
import { useWishlist } from '../WishlistContext/WishlistContext';
import { getOrdersByUser } from '../../Api/orderApi';
import { getWishlistByUser } from '../../Api/wishlistApi';
import { getCustomerDetails } from '../../Api/customerDetailsApi';
import { updateCustomerDetails,updateUserBasicInfo } from '../../Api/customerDetailsApi';
import { getCustomerAddress,updateCustomerAddress  } from '../../Api/customerAddressApi';
function ProfilePage() {
    const [userDetails, setUserDetails] = useState({});
    const [savedAddress, setSavedAddress] = useState(null);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [orderList, setOrderList] = useState([]);
    useEffect(() => {
      const fetchOrders = async () => {
        const savedDetails = localStorage.getItem('userDetails');
        if (!savedDetails) return;
    
        const user = JSON.parse(savedDetails);
        try {
          const orders = await getOrdersByUser(user._id);
          setOrderList(orders);
          console.log("✅ Orders:", orders);
        } catch (err) {
          console.error("❌ Error fetching orders:", err);
        }
      };
    
      fetchOrders();
    }, []);
    useEffect(() => {
        const savedDetails = localStorage.getItem('userDetails');
        if (savedDetails) {
          setUserDetails(JSON.parse(savedDetails));
        }
      }, []);
      useEffect(() => {
        const fetchWishlist = async () => {
          const savedDetails = localStorage.getItem('userDetails');
          if (!savedDetails) {
            console.error("❌ No user details found in localStorage");
            return;
          }
      
          const user = JSON.parse(savedDetails);
          const userId = user._id || user.id; // ✅ fallback logic
      
          if (!userId) {
            console.error("❌ User ID not found in localStorage");
            return;
          }
      
          try {
            const wishlistData = await getWishlistByUser(userId);
            console.log("✅ Wishlist details from profile page:", wishlistData);
            setWishlistItems(wishlistData); // Fallback to empty
          } catch (err) {
            console.error("❌ Error fetching wishlist:", err);
          }
        };
      
        fetchWishlist();
      }, []);
      
      

      useEffect(() => {
        const fetchUserAddress = async () => {
          const stored = JSON.parse(localStorage.getItem('userDetails'));
          const userId = stored?._id || stored?.userId;
          if (!userId) return;
      
          try {
            const addressData = await getCustomerAddress(userId);
            console.log('📦 Address from API:', addressData);
      
            const formattedAddress = {
              house: addressData.houseNo,
              street: addressData.street,
              LanndMark: addressData.landMark,
              city: addressData.city,
              district: addressData.district,
              state: addressData.state,
              pincode: addressData.pincode,
              phone: stored.phone || ''
            };
      
            setAddresses([formattedAddress]);
          } catch (error) {
            console.error('❌ Failed to fetch address:', error);
          }
        };
      
        fetchUserAddress();
      }, []);
      
      
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
    name: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    profilePic: '',
  });
    
      const [addresses, setAddresses] = useState([
        {
          type: '',
          house:"",
          street:"",
          LanndMark : "",
          city :"",
          district:"",
          state:"",
          pincode:"",
          phone: '',
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
      const handleSaveProfile = async () => {
        const stored = JSON.parse(localStorage.getItem('userDetails'));
        const userId = stored?._id || stored?.userId;
      
        if (!userId) return alert("User ID not found");
      
        try {
          const payload = {
            phone: user.phone,
            DOB: user.dob,
            gender: user.gender
          };
          const res = await updateCustomerDetails(userId, payload);
          await updateUserBasicInfo(userId, { name: user.name, email: user.email });

      
          alert("✅ Profile updated in database!");
          setIsEditingProfile(false);
        } catch (err) {
          console.error("❌ Error updating customer details:", err);
          alert("Failed to update profile");
        }
      };
      const handleSaveAddress = async () => {
        const stored = JSON.parse(localStorage.getItem('userDetails'));
        const userId = stored?._id || stored?.userId;
      
        if (!userId) return alert("User ID not found");
      
        const updatedData = {
          houseNo: addresses[0].house,
          street: addresses[0].street,
          landMark: addresses[0].LanndMark,
          city: addresses[0].city,
          district: addresses[0].district,
          state: addresses[0].state,
          pincode: addresses[0].pincode,
        };
      
        try {
          const res = await updateCustomerAddress(userId, updatedData);
          console.log("✅ Address updated in DB:", res);
          alert("✅ Address updated successfully!");
          setIsEditingProfile(false);
        } catch (error) {
          console.error("❌ Failed to update address:", error);
          alert("❌ Address update failed");
        }
      };
      useEffect(() => {
        const fetchUserDetails = async () => {
          const user = JSON.parse(localStorage.getItem("userDetails"));
          console.log("fetched data from userDetails",user)
          if (!user || !user._id) return;
      
          try {
            const data = await getCustomerDetails(user._id);
      
            console.log("📦 Full getCustomerDetails Response:", JSON.stringify(data, null, 2));

      
            // Destructure or fallback
            const customer = data?.userDetails || data;
      
            console.log("✅ Parsed Customer Object:", customer);
      
            // Check individual fields
            console.log("🧾 Name:", customer.userId?.name || user.name);
            console.log("✉️ Email:", customer.userId?.email || user.email);
            console.log("📞 Phone:", customer.phone);
            console.log("🎂 DOB:", customer.DOB);
            console.log("⚧ Gender:", customer.gender);
      
            // Update UI state
            setUserDetails(customer);
            setUser({
              name: customer.userId?.name || user.name,
              email: customer.userId?.email || user.email,
              phone: customer.phone || '',
              dob: customer.DOB ? customer.DOB.slice(0, 10) : '',
              gender: customer.gender || '',
              profilePic: '',
            });
      
          } catch (error) {
            console.warn("❌ No customer details yet. Skipping setUser.");
            console.error(error);
            setUser({
              name: user.name || '',
              email: user.email || '',
              phone: '',
              dob: '',
              gender: '',
              profilePic: '',
            });
          }
        };
      
        fetchUserDetails();
      }, []);
      
      
    
  return (
    <div className='profile-page-container'>
    <div className='profile-page-left'>
      <div className='profile-image-content-div'>
        <img src={profileImge}/>
        <h4>{userDetails?.userId?.name || userDetails?.name || 'User'}</h4>

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
      <button className="save-btn" onClick={async () => {
  await handleSaveProfile();
  setIsEditingProfile(false);
}}>Save Changes</button>

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
      <button className="save-btn" onClick={handleSaveAddress}>Save Changes</button>
      <button className="edit-btn" onClick={() => setIsEditingProfile(false)}>Cancel</button>
    </>
  )}
</div>
        </div>
     )}
     {activeSection === 'wishlist' && (
  <div className='order-right-side-container'>
    <div className='payment-right-heading'>
      <h1>My Wishlist</h1>
    </div>
    <div className='order-grid-container'>
      {wishlistItems.length === 0 ? (
        <p>No items in your wishlist.</p>
      ) : (
        wishlistItems.map((item, index) => (
          <div className='order-data-grid' key={index}>
            <img src={item.product?.images?.[0]} alt="wishlist product" />
            <p>{item.product?.name}</p>
            <p>{item.product?.price}</p>
          </div>
        ))
      )}
    </div>
  </div>
)}


{activeSection === 'orders' && (
          <div className='order-right-side-container'>
            <div className='payment-right-heading'>
              <h1>My Orders</h1>
            </div>
            <div className='order-grid-container' style={{marginTop:"30px"}}>
              {orderList.length === 0 ? (
                <p>No items ordered yet.</p>
              ) : (
                orderList.map((order, index) => (
                  <div className='order-block' key={index}>
                    {order.products.map((item, idx) => (
                      <div className='order-data-grid' key={idx}>
                        <img src={item.productId?.images?.[0]} alt={item.productId?.name} style={{marginBottom:"20px"}}/>
                        <p>{item.productId?.name}</p>
                        <p>Qty : {item.quantity}</p>
                        <p>Total : ₹{item.productId?.price}</p>
                      </div>
                    ))}
                  </div>
                ))
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


    </div>
    </div>
  )
}

export default ProfilePage

import React,{useState}from 'react'
import './NavbarBlack.css'
import { useNavigate } from 'react-router-dom'
import phoneSystemImage from '../../Assets/phoneSystemImage.png'
import callSupport from '../../Assets/callSupport.png'
import CartDrawer from '../CartDrawer/CartDrawer'
// import fruit1 from '../../Assets/carrot.png'
// import fruit2 from '../../Assets/fruit2.png'
// import fruit3 from '../../Assets/fruit3.png'
// import fruit4 from '../../Assets/fruit4.png'
// import fruit5 from '../../Assets/fruit6.webp'
// import fruit6 from '../../Assets/fruit5.webp'
import logo from '../../Assets/logo.png'
// const blackNavData = [
//   {image : fruit1 , text : "CARROT"},
//   {image : fruit2 , text : "POTATO"},
//   {image : fruit3 , text : "WATERMELON"},
//   {image : fruit4 , text : "ORANGE"},
//   {image : fruit5 , text : "PAPAYA"},
//   {image : fruit6 , text : "TOMATO"},
// ]
const categories = [
    "Electronics",
    "Fashion",
    "Jewelry",
    "Home & Living",
    "Beauty & Health",
    "Toys",
    "Books"
  ];
function NavbarBlack() {
    const [showCategories, setShowCategories] = useState(false);
    const [showSearchBox, setShowSearchBox] = useState(false);
    const [showNavDetails, setShowNavDetails] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
const [formType, setFormType] = useState('login'); // 'login' | 'register' | 'forgot'
const navigate = useNavigate()
  return (
    <div style={{position:"relative"}}>
        <div className='navbar-black-container'>
        <div className='navbar-black-text-icon-conatiner'>
            <i class="bi bi-globe"></i>
            <h6>Global Worldwide Delivery</h6>
            <div className='navbar-black-vertical-line'></div>
        </div>
        <div className='navbar-black-text-icon-conatiner'>
            <i class="bi bi-gift"></i>
            <h6>Free Gift Voucher</h6>
            <div className='navbar-black-vertical-line'></div>
        </div>
        <div className='navbar-black-text-icon-conatiner'>
            <img src={phoneSystemImage}/>
            <h6>Money Back Guarantee</h6>
            <div className='navbar-black-vertical-line'></div>
        </div>
        <div className='navbar-black-text-icon-conatiner'>
            <img src={callSupport}/>
            <h6>24X7 Support Assistance</h6>
        </div>
      
    </div>

    <div className='navbar-white-container'>
        <div className='navbar-white-heading-and-details'>
            <img src={logo} onClick={()=>navigate('/')} style={{cursor:"pointer"}}/>
            <div className='mail-account-item-container'>
                <div className='navbar-white-icon-text' style={{cursor:"pointer"}}>
                    <i class="bi bi-envelope"></i>
                    <p>info@gmail.com</p>
                </div>
                <div className='navbar-white-icon-text' onClick={()=>setShowLogin(!showLogin)} style={{cursor:"pointer"}}>
                    <i class="bi bi-person"></i>
                    <p>Account</p>
                </div>

                <div className='navbar-white-icon-text'onClick={() => setCartOpen(true)} style={{cursor:"pointer"}}>
                    <i class="bi bi-basket"></i>
                    <p>Item</p>
                </div>
                <CartDrawer show={cartOpen} onClose={() => setCartOpen(false)} />
            </div>
        </div>
        <div className="navbar">
        <div className="navbar-categories-wrapper">
        <div className="categories-button" onClick={() => setShowCategories(!showCategories)}>
          <i className="bi bi-list"></i> CATEGORIES
        </div>

        {showCategories && (
          <ul className="categories-dropdown">
            {categories.map((category, index) => (
              <li key={index}>
                <a href={`/category/${category.toLowerCase().replace(/ /g, '-')}`}>{category}</a>
              </li>
            ))}
          </ul>
        )}
      </div>

  <div className="nav-links">
    <a href="/">Home</a>
    <a href="/shop">Shop</a>
    <a href="/blog">Blog</a>
    <a href="/contact-us">Contact</a>
    <a href="/about-us">About Us</a>
    <div className="view-more">
      View More <i className="bi bi-caret-down-fill ml-1 text-xs"></i>
    </div>
  </div>

  <div className="nav-search">
    <input type="text" placeholder="Search" />
    <button>
      <i className="bi bi-search"></i>
    </button>
  </div>
</div>


        
    </div>

     {/* Mobile Navbar */}
     <div className='black-nav-mobile'>
      <p onClick={()=>setShowLogin(!showLogin)}>Login</p>
      
      <div className='mobile-vertical-line'></div>
      <p onClick={()=>setShowLogin(!showLogin)}>Create A Account</p>

     </div>
     {showLogin && (
  <div className="nav-login-container animate-fade">
    {formType === 'login' && (
      <>
        <h3>LOGIN</h3>
        <input type='text' placeholder='Email' className='nav-login-container-input'/>
        <input type='password' placeholder='Password' className='nav-login-container-input'/>
        <p onClick={() => setFormType('forgot')} style={{cursor: 'pointer'}}>Forgot Password?</p>
        <button>SIGN IN</button>
        <p onClick={() => setFormType('register')} style={{cursor: 'pointer'}}>Create Account</p>
      </>
    )}
    {formType === 'register' && (
      <>
        <h3>CREATE ACCOUNT</h3>
        <input type='text' placeholder='Name' className='nav-login-container-input'/>
        <input type='email' placeholder='Email' className='nav-login-container-input'/>
        <input type='password' placeholder='Password' className='nav-login-container-input'/>
        <button>REGISTER</button>
        <p onClick={() => setFormType('login')} style={{cursor: 'pointer'}}>Already have an account? Login</p>
      </>
    )}
    {formType === 'forgot' && (
      <>
        <h3>RESET PASSWORD</h3>
        <input type='email' placeholder='Email' className='nav-login-container-input'/>
        <button>Send Reset Link</button>
        <p onClick={() => setFormType('login')} style={{cursor: 'pointer'}}>Back to Login</p>
      </>
    )}
  </div>
)}
     
     <div className="navbar-mobile">

     <div className="mobile-menu">
       <div onClick={() => setShowCategories(!showCategories)}>☰</div>
       {showCategories && (
          <ul className="categories-dropdown">
            {categories.map((category, index) => (
              <li key={index}>
                <a href={`/category/${category.toLowerCase().replace(/ /g, '-')}`}>{category}</a>
              </li>
            ))}
          </ul>
        )}
       <div className='mobile-search-box' onClick={() => setShowSearchBox(!showSearchBox)}><i className="bi bi-search"></i></div>
       {showSearchBox && (
          <div className="nav-search">
          <input type="text" placeholder="Search" />
          <button>
            <i className="bi bi-search"></i>
          </button>
        </div>
        )}
       <img src={logo}/>
       <div className='nav-links-mobile' onClick={() => setShowNavDetails(!showNavDetails)}><i class="bi bi-filter-left"></i></div>
       {showNavDetails && (
            <div className="nav-links">
            <a href="#">Home</a>
            <a href="#">Shop</a>
            <a href="#">Blog</a>
            <a href="#">Contact</a>
            <a href="#">About Us</a>
            <div className="view-more">
              View More <i className="bi bi-caret-down-fill ml-1 text-xs"></i>
            </div>
          </div>
        )}
       <div onClick={() => setCartOpen(true)} className='nav-cart-mobile'>
            <i className="bi bi-bag"></i>
          </div>
        <CartDrawer show={cartOpen} onClose={() => setCartOpen(false)} />
     </div>
   </div>
   <CartDrawer show={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  )
}

export default NavbarBlack

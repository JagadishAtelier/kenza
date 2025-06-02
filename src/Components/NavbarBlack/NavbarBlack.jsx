import React,{useState}from 'react'
import './NavbarBlack.css'
import phoneSystemImage from '../../Assets/phoneSystemImage.png'
import callSupport from '../../Assets/callSupport.png'
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
            <h1>KENZA</h1>
            <div className='mail-account-item-container'>
                <div className='navbar-white-icon-text'>
                    <i class="bi bi-envelope"></i>
                    <p>info@gmail.com</p>
                </div>
                <div className='navbar-white-icon-text'>
                    <i class="bi bi-person"></i>
                    <p>Account</p>
                </div>
                <div className='navbar-white-icon-text'>
                    <i class="bi bi-basket"></i>
                    <p>Item</p>
                </div>
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
    <a href="#">Home</a>
    <a href="#">Shop</a>
    <a href="#">Blog</a>
    <a href="#">Contact</a>
    <a href="#">About Us</a>
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
    </div>
  )
}

export default NavbarBlack

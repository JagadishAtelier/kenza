import React,{useState}from 'react'
import './NavbarBlack.css'
import phoneSystemImage from '../../Assets/phoneSystemImage.png'
import callSupport from '../../Assets/callSupport.png'
import fruit1 from '../../Assets/carrot.png'
import fruit2 from '../../Assets/fruit2.png'
import fruit3 from '../../Assets/fruit3.png'
import fruit4 from '../../Assets/fruit4.png'
import fruit5 from '../../Assets/fruit6.webp'
import fruit6 from '../../Assets/fruit5.webp'
import logo from '../../Assets/logo.png'
const blackNavData = [
  {image : fruit1 , text : "CARROT"},
  {image : fruit2 , text : "POTATO"},
  {image : fruit3 , text : "WATERMELON"},
  {image : fruit4 , text : "ORANGE"},
  {image : fruit5 , text : "PAPAYA"},
  {image : fruit6 , text : "TOMATO"},
]
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
        {blackNavData.map((data,index)=>(
          <div className='black-nav-image-and-text'>
            <img src={data.image}/>
            <h6>{data.text}</h6>
          </div>
        ))}
    </div>

    <div className='navbar-white-container'>
        <div className='navbar-white-heading-and-details'>
            <img src={logo}/>
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

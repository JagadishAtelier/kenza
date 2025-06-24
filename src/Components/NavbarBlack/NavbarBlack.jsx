import React, { useEffect, useState } from "react";
import "./NavbarBlack.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AccountForms from "../AccountForms/AccountForms";
import phoneSystemImage from "../../Assets/phoneSystemImage.png";
import callSupport from "../../Assets/callSupport.png";
import CartDrawer from "../CartDrawer/CartDrawer";
import { getAllCategories } from "../../Api/categoryApi";
import { useCart } from "../CartContext/CartContext";
// import fruit1 from '../../Assets/carrot.png'
// import fruit2 from '../../Assets/fruit2.png'
// import fruit3 from '../../Assets/fruit3.png'
// import fruit4 from '../../Assets/fruit4.png'
// import fruit5 from '../../Assets/fruit6.webp'
// import fruit6 from '../../Assets/fruit5.webp'
import logo from "../../Assets/logo.png";
import SearchBar from "../SearchBar/SearchBar";
// const blackNavData = [
//   {image : fruit1 , text : "CARROT"},
//   {image : fruit2 , text : "POTATO"},
//   {image : fruit3 , text : "WATERMELON"},
//   {image : fruit4 , text : "ORANGE"},
//   {image : fruit5 , text : "PAPAYA"},
//   {image : fruit6 , text : "TOMATO"},
// ]
// const categories = [
//   { text: "Organic", href: "/all-product" },
//   { text: "Accessories", href: "/all-product" },
//   { text: "Collection", href: "/all-product" },
//   { text: "Collection", href: "/all-product" },
// ];
function NavbarBlack() {
  const [showCategories, setShowCategories] = useState(false);
  const [getUserDetails, setGetUserDetails] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [showNavDetails, setShowNavDetails] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { cartItems } = useCart(); // Replace with your actual context structure
  // const itemCount = cartItems.length;
  const [formType, setFormType] = useState("login"); // 'login' | 'register' | 'forgot'
  const navigate = useNavigate();

const [categories, setCategories] = useState([]);

useEffect(() => {
  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  fetchCategories();
}, []);

  return (
    <div style={{ position: "relative" }}>
      <div className="navbar-black-container">
        <div className="navbar-black-text-icon-conatiner">
          <i class="bi bi-globe"></i>
          <h6>Global Worldwide Delivery</h6>
          <div className="navbar-black-vertical-line"></div>
        </div>
        <div className="navbar-black-text-icon-conatiner">
          <i class="bi bi-gift"></i>
          <h6>Free Gift Voucher</h6>
          <div className="navbar-black-vertical-line"></div>
        </div>
        <div className="navbar-black-text-icon-conatiner">
          <img src={phoneSystemImage} />
          <h6>Money Back Guarantee</h6>
          <div className="navbar-black-vertical-line"></div>
        </div>
        <div className="navbar-black-text-icon-conatiner">
          <img src={callSupport} />
          <h6>24X7 Support Assistance</h6>
        </div>
      </div>

      <div className="navbar-white-container">
        <div className="navbar-white-heading-and-details">
          <img
            src={logo}
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          />
          <div className="mail-account-item-container">
            <div
              className="navbar-white-icon-text"
              style={{ cursor: "pointer" }}
            >
              <i class="bi bi-envelope"></i>
              <p>info@gmail.com</p>
            </div>
            <div
              className="navbar-white-icon-text"
              onClick={() => setShowLogin(!showLogin)}
              style={{ cursor: "pointer" }}
            >
              <i class="bi bi-person"></i>
              <p>Account</p>
            </div>

            <div
              className="navbar-white-icon-text"
              onClick={() => setCartOpen(true)}
              style={{ cursor: "pointer" }}
            >
              <div className="cart-icon-with-count">
                <i className="bi bi-basket"></i>
                {cartItems.length > 0 && (
                  <span className="cart-count-badge">{cartItems.length}</span>
                )}
                <p>{cartItems.length === 1 ? "Item" : "Items"}</p>
              </div>
            </div>
            <CartDrawer show={cartOpen} onClose={() => setCartOpen(false)} />
          </div>
        </div>
        <div className="navbar">
          <div className="navbar-categories-wrapper">
            <div
              className="categories-button"
              onClick={() => setShowCategories(!showCategories)}
            >
              <i className="bi bi-list"></i> CATEGORIES
            </div>

            {showCategories && (
              <ul className="categories-dropdown">
                {categories.map((category) => (
                  <li key={category._id}>
                    <Link
                      to={`/all-product`}
                      state={{ product: category }}
                      onClick={() => setShowCategories(false)}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="nav-links">
            <a href="/">Home</a>
            <a href="/shop">Shop</a>
            <a href="/blog">Blog</a>
            <p
              onClick={() => {
                navigate("/about-us");
                setTimeout(() => (window.location.hash = "#about-us"), 100);
              }}
            >
              About Us
            </p>

            <p
              onClick={() => {
                navigate("/about-us");
                setTimeout(() => (window.location.hash = "#contact-us"), 100);
              }}
            >
              Contact
            </p>
          </div>

          {/* <div className="nav-search">
            <input type="text" placeholder="Search" />
            <button>
              <i className="bi bi-search"></i>
            </button>
          </div> */}
          <SearchBar/>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="black-nav-mobile">
        <p onClick={() => setShowLogin(!showLogin)}>Login</p>

        <div className="mobile-vertical-line"></div>
        <p onClick={() => setShowLogin(!showLogin)}>Create A Account</p>
      </div>
      {showLogin && (
        <AccountForms
          formType={formType}
          setFormType={setFormType}
          setShowLogin={setShowLogin}
          setGetUserDetails={setGetUserDetails}
        />
      )}
      {getUserDetails && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div style={{ textAlign: "center" }}>
              <h3>Additional Details</h3>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const userDetails = {
                  name: formData.get("name"),
                  email: formData.get("email"),
                  phone: formData.get("phone"),
                  dob: formData.get("dob"),
                  gender: formData.get("gender"),
                };
                localStorage.setItem(
                  "userDetails",
                  JSON.stringify(userDetails)
                );
                setGetUserDetails(false);
                navigate("/profile-page");
              }}
            >
              <div className="modal-details-container">
                <div>
                  <div className="modal-details-content">
                    <h5>Name</h5>
                    <input
                      name="name"
                      type="text"
                      placeholder="Name"
                      required
                    />
                  </div>
                  <div className="modal-details-content">
                    <h5>Email</h5>
                    <input
                      name="email"
                      type="text"
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div className="modal-details-content">
                    <h5>Phone</h5>
                    <input
                      name="phone"
                      type="text"
                      placeholder="Phone"
                      required
                    />
                  </div>
                </div>
                <div>
                  <div className="modal-details-content">
                    <h5>Date of Birth</h5>
                    <input
                      name="dob"
                      type="date"
                      placeholder="Date of Birth"
                      required
                    />
                  </div>
                  <div className="modal-details-content">
                    <h5>Gender</h5>
                    <input
                      name="gender"
                      type="text"
                      placeholder="Gender"
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="submit-btn-modal">
                  Submit
                </button>
              </div>
            </form>
            <button
              className="close-btn"
              onClick={() => setGetUserDetails(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="navbar-mobile">
        <div className="mobile-menu">
          <div onClick={() => setShowCategories(!showCategories)}>☰</div>
          {showCategories && (
            <ul className="categories-dropdown">
              {categories.map((category, index) => (
                <li key={index}>
                  <Link
                    to={category.href}
                    state={{ product: category }}
                    onClick={() => setShowCategories(false)}
                  >
                    {category.text}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <div
            className="mobile-search-box"
            onClick={() => setShowSearchBox(!showSearchBox)}
          >
            <i className="bi bi-search"></i>
          </div>
          {showSearchBox && (
            <div className="nav-search">
              <input type="text" placeholder="Search" />
              <button>
                <i className="bi bi-search"></i>
              </button>
            </div>
          )}
          <img src={logo} onClick={() => navigate("/")} />
          <div
            className="nav-links-mobile"
            onClick={() => setShowNavDetails(!showNavDetails)}
          >
            <i class="bi bi-filter-left"></i>
          </div>
          {showNavDetails && (
            <div className="nav-links">
              <a href="/">Home</a>
              <a href="/shop">Shop</a>
              <a href="/blog">Blog</a>
              <p
                onClick={() => {
                  navigate("/about-us");
                  setTimeout(() => (window.location.hash = "#about-us"), 100);
                }}
              >
                About Us
              </p>

              <p
                onClick={() => {
                  navigate("/about-us");
                  setTimeout(() => (window.location.hash = "#contact-us"), 100);
                }}
              >
                Contact
              </p>
            </div>
          )}
          <div onClick={() => setCartOpen(true)} className="nav-cart-mobile">
            <div className="cart-icon-with-count">
              <i className="bi bi-bag"></i>
              {cartItems.length > 0 && (
                <span className="cart-count-badge">{cartItems.length}</span>
              )}
            </div>
          </div>
          <CartDrawer show={cartOpen} onClose={() => setCartOpen(false)} />
        </div>
      </div>
      <CartDrawer show={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}

export default NavbarBlack;

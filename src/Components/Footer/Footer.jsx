import React, { useState } from 'react';
import './Footer.css';
import logo from '../../Assets/logo.png';
import { useNavigate } from 'react-router-dom';
const account = [
  { text: 'Organic',href : "/all-product" },
  { text: 'Accessories',href : "/all-product" },
  { text: 'Orders',href : "/all-product" },
  { text: 'Collection',href : "/all-product" },
];
const product = [
  { text: 'Home',href : "/" },
  { text: 'Shop',href : "/shop" },
  { text: 'Blog',href : "/blog" },
  { text: 'About Us',href : "/about-us" },
];
const ourCompany = [
  { text: 'About Us' },
  { text: 'New Products' },
  { text: 'Contact Us' },
  { text: 'Sitemap' },
  { text: 'Products' },
];

function Footer() {
  const [activeSection, setActiveSection] = useState(null);
  const navigate = useNavigate()
  const toggleSection = (section) => {
    setActiveSection((prev) => (prev === section ? null : section));
  };

  return (
    <>
      <div className="footer-container">
        {/* Common Section */}
        <div className="logo-and-content">
          <div>
          <img src={logo} alt="Logo" className="colored-icon" onClick={()=>navigate('/')}/>
          </div>
          <p>
            KENZA is the subscription box for book lovers. We are dedicated to bringing you beautiful, unique editions of books and quality merchandise!
          </p>
            <div className="social-icons">
            <div className="icon facebook"><i className="bi bi-facebook"></i></div>
            <div className="icon instagram"><i className="bi bi-instagram"></i></div>
            <div className="icon tiktok"><i className="bi bi-tiktok"></i></div>
            <div className="icon snapchat"><i className="bi bi-snapchat"></i></div>
            <div className="icon vimeo"><i className="bi bi-vimeo"></i></div>
          </div>

        </div>

        {/* Desktop Footer */}
        <div className="footer-details-container">
        <div className="footer-account-details">
            <h4>Learn</h4>
            <div className="footer-account-content">
              {account.map((data, index) => (
                <p key={index} onClick={()=> navigate(data.href,{ state: {product:data} })}>{data.text}</p>
              ))}
            </div>
          </div>
          <div className="footer-account-details">
            <h4>Useful Links</h4>
            <div className="footer-account-content">
              {product.map((data, index) => (
                <p key={index} onClick={()=> navigate(data.href,{ state: {product:data} })}>{data.text}</p>
              ))}
            </div>
          </div>
          <div className="information-container">
            <h4>STORE INFORMATION</h4>
            <p><i className="bi bi-geo-alt"></i> 4005, Silver business point France</p>
            <p><i className="bi bi-telephone"></i> +91 9876543210</p>
            <p><i className="bi bi-envelope"></i> info@gmail.com</p>
            {/* <div>
              <div style={{textAlign:"center"}}>
                <h4>SOCIAL</h4>
              </div>
            <div className="social-icons">
            <div className="icon facebook"><i className="bi bi-facebook"></i></div>
            <div className="icon instagram"><i className="bi bi-instagram"></i></div>
            <div className="icon tiktok"><i className="bi bi-tiktok"></i></div>
            <div className="icon snapchat"><i className="bi bi-snapchat"></i></div>
            <div className="icon vimeo"><i className="bi bi-vimeo"></i></div>
          </div>
          </div> */}
          </div>
        </div>

        {/* Mobile Footer */}
        <div className="mobile-footer">

          <div className="mobile-footer-section" onClick={() => toggleSection('account')}>
            <h4>Learn</h4>
            {activeSection === 'account' && (
              <div>
                {account.map((data, i) => <p key={i} onClick={()=> navigate(data.href,{ state: {product:data} })}>{data.text}</p>)}
              </div>
            )}
          </div>
          <hr className='mobile-footer-hr'/>
          <div className="mobile-footer-section" onClick={() => toggleSection('product')}>
            <h4>Useful Links</h4>
            {activeSection === 'product' && (
              <div>
                {product.map((data, i) => <p key={i} onClick={()=> navigate(data.href,{ state: {product:data} })}>{data.text}</p>)}
              </div>
            )}
          </div>
          <hr className='mobile-footer-hr'/>
          <div className="mobile-footer-section" onClick={() => toggleSection('store')}>
            <div>
              <h4>STORE INFORMATION</h4>
            </div>
            {activeSection === 'store' && (
              <div>
                <p><i className="bi bi-geo-alt"></i> 4005, Silver business point France</p>
                <p><i className="bi bi-telephone"></i> +91 9876543210</p>
                <p><i className="bi bi-envelope"></i> info@gmail.com</p>
              </div>
            )}
          </div>
          <hr className='mobile-footer-hr'/>
          {/* <div className="mobile-footer-section" onClick={() => toggleSection('company')}>
            <h4>OUR COMPANY</h4>
            {activeSection === 'company' && (
              <div>
                {ourCompany.map((data, i) => <p key={i}>{data.text}</p>)}
              </div>
            )}
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Footer;

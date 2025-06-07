import React, { useState } from 'react';
import './Footer.css';
import logo from '../../Assets/logo.png';

const account = [
  { text: 'My Account' },
  { text: 'Personal info' },
  { text: 'Orders' },
  { text: 'Your Cart' },
  { text: 'Addresses' },
];
const product = [
  { text: 'Delivery' },
  { text: 'Legal Notice' },
  { text: 'FAQs' },
  { text: 'New Product' },
  { text: 'Best Sales' },
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

  const toggleSection = (section) => {
    setActiveSection((prev) => (prev === section ? null : section));
  };

  return (
    <>
      <div className="footer-container">
        {/* Common Section */}
        <div className="logo-and-content">
          <img src={logo} alt="Logo" />
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
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
          <div className="information-container">
            <h4>STORE INFORMATION</h4>
            <p><i className="bi bi-geo-alt"></i> 4005, Silver business point France</p>
            <p><i className="bi bi-telephone"></i> +91 9876543210</p>
            <p><i className="bi bi-envelope"></i> info@gmail.com</p>
          </div>

          <div className="footer-account-details">
            <h4>YOUR ACCOUNT</h4>
            <div className="footer-account-content">
              {account.map((data, index) => (
                <p key={index}>{data.text}</p>
              ))}
            </div>
          </div>

          <div className="footer-account-details">
            <h4>PRODUCT</h4>
            <div className="footer-account-content">
              {product.map((data, index) => (
                <p key={index}>{data.text}</p>
              ))}
            </div>
          </div>

          <div className="footer-account-details">
            <h4>OUR COMPANY</h4>
            <div className="footer-account-content">
              {ourCompany.map((data, index) => (
                <p key={index}>{data.text}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Footer */}
        <div className="mobile-footer">
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
          <div className="mobile-footer-section" onClick={() => toggleSection('account')}>
            <h4>YOUR ACCOUNT</h4>
            {activeSection === 'account' && (
              <div>
                {account.map((data, i) => <p key={i}>{data.text}</p>)}
              </div>
            )}
          </div>
          <hr className='mobile-footer-hr'/>
          <div className="mobile-footer-section" onClick={() => toggleSection('product')}>
            <h4>PRODUCT</h4>
            {activeSection === 'product' && (
              <div>
                {product.map((data, i) => <p key={i}>{data.text}</p>)}
              </div>
            )}
          </div>
          <hr className='mobile-footer-hr'/>
          <div className="mobile-footer-section" onClick={() => toggleSection('company')}>
            <h4>OUR COMPANY</h4>
            {activeSection === 'company' && (
              <div>
                {ourCompany.map((data, i) => <p key={i}>{data.text}</p>)}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;

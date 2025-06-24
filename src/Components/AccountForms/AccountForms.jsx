// src/components/AccountForms/AccountForms.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
// import './AccountForms.css';

const AccountForms = ({
  formType,
  setFormType,
  setShowLogin,
  setGetUserDetails,
}) => {
  const navigate = useNavigate();

  return (
    <div className="nav-login-container animate-fade">
      {formType === 'login' && (
        <>
          <h3>LOGIN</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setShowLogin(false);
              navigate('/profile-page');
            }}
          >
            <input type="text" placeholder="Email" className="nav-login-container-input" required />
            <input type="password" placeholder="Password" className="nav-login-container-input" required />
            <p onClick={() => setFormType('forgot')} style={{ cursor: 'pointer' }}>Forgot Password?</p>
            <button type="submit" style={{color:'white'}}>SIGN IN</button>
          </form>
          <p onClick={() => setFormType('register')} style={{ cursor: 'pointer' }}>Create Account</p>
        </>
      )}

      {formType === 'register' && (
        <>
          <h3>CREATE ACCOUNT</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setShowLogin(false);
              setGetUserDetails(true);
            }}
          >
            <input type="text" placeholder="Name" className="nav-login-container-input" required />
            <input type="email" placeholder="Email" className="nav-login-container-input" required />
            <input type="password" placeholder="Password" className="nav-login-container-input" required />
            <button type="submit"style={{color:'white'}}>REGISTER</button>
          </form>
          <p>Already have an account? <a href="" onClick={() => setFormType('login')} style={{ cursor: 'pointer' }}>Login</a></p>
        </>
      )}

      {formType === 'forgot' && (
        <>
          <h3>RESET PASSWORD</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setShowLogin(false);
              navigate('/profile-page');
            }}
          >
            <input type="email" placeholder="Email" className="nav-login-container-input" required />
            <button type='submit' style={{color:'white'}}>Send Reset Link</button>
          </form>
          <p onClick={() => setFormType('login')} style={{ cursor: 'pointer' }}>Back to Login</p>
        </>
      )}
    </div>
  );
};

export default AccountForms;

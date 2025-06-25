// src/components/AccountForms/AccountForms.jsx
import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
// import './AccountForms.css';
import { createAccount,loginUser,sendOtp,resetPassword } from '../../Api/authApi';
const AccountForms = ({
  formType,
  setFormType,
  setShowLogin,
  setGetUserDetails,
}) => {
  const navigate = useNavigate();
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword,setLoginPassword] = useState('');
  const [loginError,setLoginError] = useState('');
  const [loginSuccess,setLoginSuccess] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');
  

  
  return (
    <div className="nav-login-container animate-fade">
            {formType === 'register' && (
        <>
          <h3>CREATE ACCOUNT</h3>
          <form
  onSubmit={async (e) => {
    e.preventDefault();
    setRegisterError('');

    // ✅ Define userData first
    const userData = {
      name: registerName,
      email: registerEmail,
      password: registerPassword,
    };

    // ✅ Log it to console
    console.log('Registering User:', userData);

    try {
      // ✅ Use the userData object
      const response = await createAccount(userData);
      console.log("✅ Registered user:", response.newUser);
      
      const createdUser = response?.newUser;
      if (createdUser && createdUser._id) {
        localStorage.setItem('userDetails', JSON.stringify(createdUser));
      }
      setRegisterSuccess('Account created successfully!');
      setGetUserDetails(true);
      setShowLogin(false);
      navigate('/profile-page');
    } catch (err) {
      setRegisterError(err.message || 'Account creation failed.');
    }
  }}
>

            <input
              type="text"
              placeholder="Name"
              className="nav-login-container-input"
              required
              value={registerName}
              onChange={(e) => setRegisterName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="nav-login-container-input"
              required
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="nav-login-container-input"
              required
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
            />
            {registerError && <p style={{ color: 'red' }}>{registerError}</p>}
            {registerSuccess && <p style={{ color: 'green' }}>{registerSuccess}</p>}
            <button type="submit" style={{ color: 'white' }}>REGISTER</button>
          </form>
          <p>Already have an account? <span onClick={() => setFormType('login')} style={{ cursor: 'pointer', color: 'blue' }}>Login</span></p>
        </>
      )}
      {formType === 'login' && (
  <>
    <h3>LOGIN</h3>
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setLoginError('');
        setLoginSuccess('');
      
        try {
          const response = await loginUser({
            email: loginEmail,
            password: loginPassword
          });
      
          const loggedInUser = response?.user; // Adjust based on API response shape
          console.log("login user",loggedInUser)
          if (loggedInUser && loggedInUser._id) {
            localStorage.setItem('userDetails', JSON.stringify(loggedInUser));
          }
      
          setLoginSuccess('Login successful!');
          setShowLogin(false);
          navigate('/profile-page');
        } catch (err) {
          setLoginError(err.message || 'Login failed');
        }
      }}
      
    >
      <input
        type="email"
        placeholder="Email"
        className="nav-login-container-input"
        required
        value={loginEmail}
        onChange={(e) => setLoginEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="nav-login-container-input"
        required
        value={loginPassword}
        onChange={(e) => setLoginPassword(e.target.value)}
      />
      {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
      {loginSuccess && <p style={{ color: 'green' }}>{loginSuccess}</p>}
      <p onClick={() => setFormType('forgot')} style={{ cursor: 'pointer' }}>Forgot Password?</p>
      <button type="submit" style={{ color: 'white' }}>SIGN IN</button>
    </form>
    <p onClick={() => setFormType('register')} style={{ cursor: 'pointer' }}>Create Account</p>
  </>
)}


{formType === 'forgot' && (
  <>
    <h3>RESET PASSWORD</h3>
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setResetError('');
        setResetSuccess('');

        try {
          if (!otpSent) {
            // Step 1: Send OTP
            await sendOtp(forgotEmail);
            setOtpSent(true);
            setResetSuccess('OTP sent to your email.');
          } else {
            // Step 2: Reset Password
            await resetPassword({ email: forgotEmail, otp, newPassword });
            setResetSuccess('Password reset successful!');
            setTimeout(() => {
              setFormType('login');
              setOtpSent(false);
            }, 1500);
          }
        } catch (err) {
          setResetError(err.message);
        }
      }}
    >
      <input
        type="email"
        placeholder="Email"
        className="nav-login-container-input"
        required
        value={forgotEmail}
        onChange={(e) => setForgotEmail(e.target.value)}
      />

      {otpSent && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            className="nav-login-container-input"
            required
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            className="nav-login-container-input"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </>
      )}

      {resetError && <p style={{ color: 'red' }}>{resetError}</p>}
      {resetSuccess && <p style={{ color: 'green' }}>{resetSuccess}</p>}

      <button type="submit" style={{ color: 'white' }}>
        {otpSent ? 'Reset Password' : 'Send OTP'}
      </button>
    </form>
    <p onClick={() => setFormType('login')} style={{ cursor: 'pointer' }}>Back to Login</p>
  </>
)}

    </div>
  );
};

export default AccountForms;

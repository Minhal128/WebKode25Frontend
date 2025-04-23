import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOTP } from '../feauture/auth/authSlice';
import './RegisterOTP.css';

const RegisterOTP = () => {
  const [otpData, setOtpData] = useState({
    email: '',
    otp: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { loading, error, isVerified } = useSelector((state) => state.auth);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOtpData(prev => ({ ...prev, [name]: value }));
  };
  
  const validateForm = () => {
    const newErrors = {};
    if (!otpData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(otpData.email)) newErrors.email = 'Email is invalid';
    if (!otpData.otp.trim()) newErrors.otp = 'OTP is required';
    else if (otpData.otp.length < 6) newErrors.otp = 'OTP must be 6 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    dispatch(verifyOTP(otpData));
  };
  
  useEffect(() => {
    if (isVerified) {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isVerified, navigate]);
  
  return (
    <div className="otp-verification-container">
      <div className="otp-card">
        <h2>Verify Your Email</h2>
        <p>Enter the OTP sent to your email address</p>
        
        {isVerified ? (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h3>Verification Successful!</h3>
            <p>Redirecting to login page...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="otp-form">
            <div className={`form-group ${errors.email ? 'error' : ''}`}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={otpData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            
            <div className={`form-group ${errors.otp ? 'error' : ''}`}>
              <label htmlFor="otp">OTP Code</label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={otpData.otp}
                onChange={handleChange}
                placeholder="Enter 6-digit OTP"
                maxLength="6"
              />
              {errors.otp && <span className="error-message">{errors.otp}</span>}
            </div>
            
            {error && <div className="form-error">{error}</div>}
            
            <button type="submit" disabled={loading} className="verify-button">
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegisterOTP;
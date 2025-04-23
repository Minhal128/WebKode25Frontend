import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../feauture/auth/authSlice";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isRegistered } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [errors, setErrors] = useState({});
  const [isMounted, setIsMounted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (isRegistered) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        navigate("/otp");
      }, 2000); // Show success message for 2 seconds before redirecting
      return () => clearTimeout(timer);
    }
  }, [isRegistered, navigate]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    await dispatch(registerUser(formData));
  };

  return (
    <div className={`register-container ${isMounted ? "mounted" : ""}`}>
      <div className="register-card">
        <div className="card-glow"></div>
        
        <div className="card-header">
          <h2 className="card-title">Create Your Account</h2>
          <p className="card-description">Join our exclusive community</p>
        </div>
        
        <div className="card-content">
          {showSuccess ? (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h3>Registration Successful!</h3>
              <p>Redirecting to OTP verification...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="register-form">
              <div className={`form-group ${errors.name ? "error" : ""}`}>
                <div className="input-container">
                  <User className="input-icon" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder=" "
                    className="form-input"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <label htmlFor="name" className="floating-label">Full Name</label>
                </div>
                {errors.name && <p className="error-message">{errors.name}</p>}
              </div>

              <div className={`form-group ${errors.email ? "error" : ""}`}>
                <div className="input-container">
                  <Mail className="input-icon" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder=" "
                    className="form-input"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <label htmlFor="email" className="floating-label">Email</label>
                </div>
                {errors.email && <p className="error-message">{errors.email}</p>}
              </div>

              <div className={`form-group ${errors.password ? "error" : ""}`}>
                <div className="input-container">
                  <Lock className="input-icon" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder=" "
                    className="form-input"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <label htmlFor="password" className="floating-label">Password</label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle"
                  >
                    {showPassword ? <EyeOff className="icon" /> : <Eye className="icon" />}
                  </button>
                </div>
                {errors.password && <p className="error-message">{errors.password}</p>}
              </div>

              {error && <div className="form-error">{error}</div>}

              <button 
                type="submit" 
                className="submit-button" 
                disabled={loading}
              >
                {loading ? (
                  <span className="button-loader"></span>
                ) : (
                  <>
                    <span className="button-text">Create Account</span>
                    <span className="button-icon">→</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
        
        {!showSuccess && (
          <div className="card-footer">
            <div className="login-prompt">
              Already have an account?{" "}
              <Link to="/login" className="login-link">
                Sign In
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Register;
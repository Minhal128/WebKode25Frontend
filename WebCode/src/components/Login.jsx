// Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import "./Login.css"; // You'll need to create this CSS file
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../feauture/auth/authSlice";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 // Login.jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  setIsLoading(true);
  try {
    const resultAction = await dispatch(loginUser(formData));
    
    if (loginUser.fulfilled.match(resultAction)) {
      const { requiresSubscription, data } = resultAction.payload;
      
      // Admin users get direct access
      if (data.user.role === 'admin') {
        navigate('/admin');
        return;
      }
      
      // Handle subscription requirement for non-admins
      if (requiresSubscription) {
        navigate('/', {
          state: { 
            message: "Please subscribe to access all features",
            requiresSubscription: true
          }
        });
      } else {
        navigate('/');
      }
    }
  } catch (error) {
    setErrors({ form: error.message });
  } finally {
    setIsLoading(false);
  }
};

  return (
<div className="bg-[#060606] min-h-screen w-full flex items-center justify-center login-container">

      <div className="login-card">
        <div className="card-header">
          <h2 className="card-title">Login to your account</h2>
          <p className="card-description">Enter your credentials to access your account</p>
        </div>
        
        <div className="card-content">
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-container">
                <Mail className="input-icon" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-container">
                <Lock className="input-icon" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="form-input"
                  value={formData.password}
                  onChange={handleChange}
                />
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

            {errors.form && <div className="form-error">{errors.form}</div>}

            <div className="form-options">
              <div className="remember-me">
                <input type="checkbox" id="remember" className="checkbox" />
                <label htmlFor="remember" className="checkbox-label">
                  Remember me
                </label>
              </div>
              <Link to="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="submit-button" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
        
        <div className="card-footer">
          <div className="divider">
            <span className="divider-text">Or continue with</span>
          </div>

          <button className="github-button">
            <svg className="github-icon" viewBox="0 0 24 24">
              <path
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                fill="currentColor"
              />
            </svg>
            Continue with GitHub
          </button>

          <div className="register-prompt">
            Don't have an account?{" "}
            <Link to="/register" className="register-link">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
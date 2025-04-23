import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isVerified: false,
  isRegistered: false,
  requiresSubscription: false
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || 'Registration failed');
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

export const verifyOTP = createAsyncThunk(
  'auth/verifyOTP',
  async (otpData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/auth/verify-otp', otpData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 
        'OTP verification failed. Please try again.'
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/auth/login', loginData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 
        'Login failed. Please check your credentials.'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetVerification: (state) => {
      state.isVerified = false;
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.isVerified = false;
      state.isRegistered = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Register User Cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isRegistered = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Verify OTP Cases
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.isVerified = true;
        if (action.payload.token) {
          state.token = action.payload.token;
        }
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Login Cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          id: action.payload.data.user.id,
          email: action.payload.data.user.email,
          isVerified: action.payload.data.user.isVerified,
          isSubscribed: action.payload.data.user.isSubscribed,
          role: action.payload.data.user.role, // Add role here
          name: action.payload.data.user.name // Add name if available
        };
        state.token = action.payload.token;
        state.requiresSubscription = action.payload.requiresSubscription;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, resetVerification, logoutUser } = authSlice.actions;
export default authSlice.reducer;
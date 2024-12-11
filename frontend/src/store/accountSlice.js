// src/redux/slices/accountSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define async thunk for signup
export const signupUser = createAsyncThunk(
  'account/signupUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'An error occurred');
      }
      return data;
    } catch (err) {
      return rejectWithValue('An error occurred');
    }
  }
);

// Define async thunk for login
export const loginUser = createAsyncThunk(
  'account/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'An error occurred');
      }
      return data;
    } catch (err) {
      return rejectWithValue('An error occurred');
    }
  }
);

const accountSlice = createSlice({
  name: 'account',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = accountSlice.actions;

export default accountSlice.reducer;

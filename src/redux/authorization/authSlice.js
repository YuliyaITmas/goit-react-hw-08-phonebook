import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    setLoggedIn: state => {
      state.isLoggedIn = true;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    logout: state => {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, setToken, setLoggedIn, setError, logout } =
  authSlice.actions;

export const authReducer = authSlice.reducer;

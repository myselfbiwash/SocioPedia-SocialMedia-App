import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
        state.user = null;
        state.token = null;
      },
      setPosts: (state, action) => {
        state.posts = action.payload.posts;
      },
    // add other reducers like logout here
  },
});

export const { login,logout,setPosts } = authSlice.actions;

export default authSlice.reducer;
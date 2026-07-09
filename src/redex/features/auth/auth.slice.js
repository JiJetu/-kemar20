import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  displayName: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens: (state, action) => {
      state.accessToken = action.payload.access ?? action.payload.accessToken ?? null;
      state.refreshToken = action.payload.refresh ?? action.payload.refreshToken ?? null;
      const userObj = action.payload.user ?? {};
      state.user = {
        role: userObj.role ?? action.payload.user_role ?? null,
        email: userObj.email ?? action.payload.email ?? null,
        id: userObj.id ?? action.payload.user_id ?? null,
        full_name: userObj.full_name ?? action.payload.full_name ?? null,
      };
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.displayName = null;
    },
    setUser: (state, action) => {
      state.user = action.payload ?? null;
    },
    setDisplayName: (state, action) => {
      state.displayName = action.payload ?? null;
    },
  },
});

export const { setTokens, logout, setUser, setDisplayName } = authSlice.actions;
export default authSlice.reducer;

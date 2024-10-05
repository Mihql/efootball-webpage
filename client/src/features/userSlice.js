import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: localStorage.getItem("userId") || null,
    email: localStorage.getItem("userEmail") || null,
    name: localStorage.getItem("userName") || null,
    role: localStorage.getItem("role") || null,
  },
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.role = action.payload.role;

      // Save user to local storage
      localStorage.setItem("userId", action.payload.id);
      localStorage.setItem("userEmail", action.payload.email);
      localStorage.setItem("userName", action.payload.name);
      localStorage.setItem("role", action.payload.role);
    },
    clearUser: (state) => {
      state.id = null;
      state.email = null;
      state.name = null;
      state.role = null;

      // Clear user from local storage
      localStorage.removeItem("userId");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userName");
      localStorage.removeItem("role");
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

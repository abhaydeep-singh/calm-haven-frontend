import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie"; // Import js-cookie to handle cookies

// Check if there is a token in the cookies and set the initial state accordingly
const tokenFromCookie = Cookies.get("authToken"); // Use your actual cookie name

const initialState = {
  status: !!tokenFromCookie, // Set to true if the token exists
};

// Redux slice for authentication
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      Cookies.set("refreshToken", action.payload.token); // Store token in cookies
    },
    logout: (state) => {
      state.status = false;
      Cookies.remove("refreshToken"); // Remove token from cookies on logout
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

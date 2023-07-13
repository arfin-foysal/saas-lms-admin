import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  user: localStorage.getItem("lms_user")
    ? JSON.parse(localStorage.getItem("lms_user"))
    : null,

  token: Cookies.get("lms_token")
    ? Cookies.get("lms_token")
    : null,
  role: localStorage.getItem("lms_user_role")
    ? JSON.parse(localStorage.getItem("lms_user_role"))
    : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authToken: (state, action) => {
      Cookies.set("lms_token", action.payload, { expires: 2 });
    },

    authUser: (state, action) => {
      localStorage.setItem("lms_user", JSON.stringify(action.payload));
    },

    userRole: (state, action) => {
      localStorage.setItem("lms_user_role", JSON.stringify(action.payload));
    },




    logout: (state) => {
      Cookies.remove("lms_token");
      localStorage.removeItem("lms_user");
      localStorage.removeItem("lms_user_role");
      

      state.user = null;
      state.token = null;
      state.role = null;

    },
  },
});

export const { authUser, userRole, authToken, logout } =
  authSlice.actions;
export default authSlice.reducer;

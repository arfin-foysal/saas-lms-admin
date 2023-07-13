import { createSlice } from "@reduxjs/toolkit";

const initialState = {
common: []
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
    reducers: {
      
    // authToken: (state, action) => {
    //   Cookies.set("lms_token", action.payload, { expires: 2 });
    // },

    // authUser: (state, action) => {
    //   localStorage.setItem("lms_user", JSON.stringify(action.payload));
    // },

    // userRole: (state, action) => {
    //   localStorage.setItem("lms_user_role", JSON.stringify(action.payload));
    // },


  },
});

export const { authUser, userRole, authToken } =
commonSlice.actions;
export default commonSlice.reducer;

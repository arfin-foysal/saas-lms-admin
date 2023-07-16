import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  common: [],
  pagination: {
    pageIndex: 1,
    pageSize: 5,
  },
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

    setPaginations: (state, action) => {
      state.pagination = action.payload;
      console.log(action.payload);
    },
  },
});

export const { setPaginations } = commonSlice.actions;
export default commonSlice.reducer;

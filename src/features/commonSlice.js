import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  common: [],
  quiz: {},
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {


    quizName: (state, action) => {
      state.quiz = action.payload;
    },
  },
});

export const { quizName } = commonSlice.actions;
export default commonSlice.reducer;

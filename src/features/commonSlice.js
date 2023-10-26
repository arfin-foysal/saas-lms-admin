import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  common: [],
  quiz: {},
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    quizSet: (state, action) => {
      state.quiz = action.payload;
    },
  },
});

export const { quizSet } = commonSlice.actions;
export default commonSlice.reducer;

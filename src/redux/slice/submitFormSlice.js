import { createSlice } from "@reduxjs/toolkit";

const submitFormSlice = createSlice({
  name: "register",
  initialState: {
    title: "",
    post: "",
    error: false,
    loading: false,
  },

  reducers: {
    newPost_begin: (state) => {
      state.loading = true;
      state.error = false;
    },
    newPost_error: (state) => {
      state.loading = false;
      state.error = true;
    },
    newPost_success: (state, action) => {
      state.loading = false;
      state.email = action.payload;
      console.log("payload", action.payload);
    },
    login_begin: (state) => {
      state.loading = true;
      state.error = false;
    },
    login_error: (state) => {
      state.loading = false;
      state.error = true;
    },
    login_success: (state, action) => {
      state.loading = false;
      state.email = action.payload;
      console.log("payload", action.payload.identifier);
    },
  },
});

export default submitFormSlice.reducer;
export const {
  newPost_begin,
  newPost_error,
  newPost_success,
  login_begin,
  login_error,
  login_success,
} = submitFormSlice.actions;

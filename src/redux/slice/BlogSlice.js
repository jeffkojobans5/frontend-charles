import { createSlice } from "@reduxjs/toolkit"

const fetchPostSlice = createSlice({
  name: "fetchPost",
  initialState: {
    posts: [],
    post: [],
    error: false,
    loading: true
  },

  reducers: {
    fetchPost_begin: (state) => {
      state.loading = true
      state.error = false
    },
    fetchPost_success: (state, action) => {
      state.posts = action.payload
      state.loading = false
    },
    fetchPost_error: (state) => {
      state.loading = false
      state.error = true
    },
    fetchSinglePost_begin: (state) => {
      state.loading = true
      state.error = false
    },
    fetchSinglePost_success: (state, action) => {
      state.loading = false
      state.post = action.payload
    },
    fetchSinglePost_error: (state) => {
      state.loading = false
      state.error = true
    },
    updateTitle: (action) => {
      console.log("action", action.payload)
    }
  }
})

export default fetchPostSlice.reducer

export const {
  fetchPost_begin,
  fetchPost_error,
  fetchPost_success,
  fetchSinglePost_begin,
  fetchSinglePost_error,
  fetchSinglePost_success,
  updateTitle
} = fetchPostSlice.actions

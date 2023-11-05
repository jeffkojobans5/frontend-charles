import { createSlice } from "@reduxjs/toolkit"

const fetchPostSlice = createSlice({
  name: "fetchPost",
  initialState: {
    posts: [],
    post: [],
    error: false,
    loading: true,
    deleteloading: true
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
    updatePost_begin: (state) => {
      state.loading = true
      state.error = false
    },
    updatePost_success: (state) => {
      state.loading = false
    },
    updatePost_error: (state) => {
      state.loading = false
      state.error = true
    },
    deletePost_begin: (state) => {
      state.deleteloading = true
      state.error = false
    },
    deletePost_success: (state) => {
      state.deleteloading = false
    },
    deletePost_error: (state) => {
      state.deleteloading = false
      state.error = true
    }
  }
})

export default fetchPostSlice.reducer

export const {
  fetchPost_begin,
  fetchPost_error,
  fetchPost_success,
  updatePost_begin,
  updatePost_error,
  updatePost_success,
  deletePost_begin,
  deletePost_error,
  deletePost_success
} = fetchPostSlice.actions

import { createSlice } from "@reduxjs/toolkit"
import Cookies from "universal-cookie"

const cookies = new Cookies()

const registerSlice = createSlice({
  name: "register",
  initialState: {
    email: "",
    password: "",
    confirmPassword: "",
    error: false,
    loading: false,
    isAuthenticated: cookies.get("user_name")
  },

  reducers: {
    register_begin: (state) => {
      state.loading = true
      state.error = false
    },
    register_error: (state) => {
      state.loading = false
      state.error = true
    },
    register_success: (state, action) => {
      state.loading = false
      state.email = action.payload
    },
    login_begin: (state) => {
      state.loading = true
      state.error = false
    },
    login_error: (state) => {
      state.loading = false
      state.error = true
    },
    login_success: (state, action) => {
      state.loading = false
      state.email = action.payload
    }
  }
})

export default registerSlice.reducer
export const {
  register_begin,
  register_error,
  register_success,
  login_begin,
  login_error,
  login_success
} = registerSlice.actions

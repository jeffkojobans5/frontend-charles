import { configureStore } from "@reduxjs/toolkit"
import registerSlice from "./slice/registerSlice"
import fetchPostSlice from "./slice/BlogSlice"
// import FetchMovies from "./features/moviesSlice";

export const store = configureStore({
  reducer: {
    registerSlice: registerSlice,
    fetchPost: fetchPostSlice
  }
})

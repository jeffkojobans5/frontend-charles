import axios from "axios"
import Cookies from "universal-cookie"
import { fetchPostsURL, fetchPostURL } from "../../constants/apis"

import {
  fetchPost_begin,
  fetchPost_error,
  fetchPost_success,
  fetchSinglePost_begin,
  fetchSinglePost_error,
  fetchSinglePost_success,
  updateTitle
} from "../slice/BlogSlice"

const fetchBlogApi = async (dispatch) => {
  dispatch(fetchPost_begin())
  try {
    const posts = await axios.get(fetchPostsURL)

    if (posts["status"] == 200) {
      dispatch(fetchPost_success({ posts: posts["data"]["data"] }))
    }
  } catch (error) {
    dispatch(fetchPost_error())
    console.log(error)
  }
}

export const editBlogApi = async (dispatch, id) => {
  dispatch(fetchSinglePost_begin())
  try {
    const cookies = new Cookies()
    const token = cookies.get("user_jwt")
    const BEARER = "bearer"

    const posts = await axios.get(`${fetchPostURL}/${id}`, {
      headers: { Authorization: `${BEARER} ${token}` }
    })

    if (posts["status"] == 200) {
      dispatch(fetchSinglePost_success({ posts: posts["data"]["data"] }))
    }
  } catch (error) {
    dispatch(fetchSinglePost_error())
    console.log(error)
  }
}

export const editTitle = (event, dispatch) => {
  // console.log(dispatch["target"]["value"])
  // console.log(man.target.value)
  dispatch(updateTitle({ title: event.target.value }))
}

export default fetchBlogApi

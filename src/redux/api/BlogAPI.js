import axios from "axios"
import Cookies from "universal-cookie"
// import { useDispatch, useSelector } from "react-redux"

import {
  fetchPostsURL,
  updatePostURL,
  deletePostURL
} from "../../constants/apis"
import Swal from "sweetalert2"

import {
  fetchPost_begin,
  fetchPost_error,
  fetchPost_success,
  updatePost_begin,
  updatePost_error,
  updatePost_success,
  deletePost_begin,
  deletePost_error,
  deletePost_success
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

export const updateBlog = async (dispatch, navigate, formData, id) => {
  dispatch(updatePost_begin())
  const cookies = new Cookies()
  const token = cookies.get("user_jwt")
  const BEARER = "bearer"
  try {
    const updatePost = await axios.put(
      `${updatePostURL}` + `/${id}`,
      {
        data: formData
      },
      {
        headers: { Authorization: `${BEARER} ${token}` }
      }
    )
    if (updatePost["status"] == 200) {
      dispatch(updatePost_success())
      Swal.fire({
        icon: "success",
        title: "Sucess",
        text: "Post updated Succesfully"
      })
      navigate("/blog")
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Something went wrong"
    })

    dispatch(updatePost_error())
    console.log(error)
  }
}

export const deleteBlog = async (dispatch, navigate, id) => {
  dispatch(deletePost_begin())
  const cookies = new Cookies()
  const token = cookies.get("user_jwt")
  const BEARER = "bearer"

  console.log(id)
  try {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deletePost = await axios.delete(`${deletePostURL}` + "/" + id, {
          headers: { Authorization: `${BEARER} ${token}` }
        })

        if (deletePost["status"] == 200) {
          // dispatch(deletePost_success())
          Swal.fire("Deleted!", "Post has been deleted.", "success")
          window.location.reload()
        }
      }
    })
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Opps .. Something went wrong"
    })

    dispatch(deletePost_error())
    console.log(error)
  }
}

export default fetchBlogApi

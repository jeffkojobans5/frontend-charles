import axios from "axios"
import Swal from "sweetalert2"
import { newPostURL } from "../../constants/apis"
import Cookies from "universal-cookie"

import {
  newPost_begin,
  newPost_success,
  newPost_error
} from "../slice/submitFormSlice"

export const Form = async (dispatch, navigate, formData) => {
  dispatch(newPost_begin())

  try {
    // call register API
    const cookies = new Cookies()
    const token = cookies.get("user_jwt")
    const BEARER = "bearer"

    const NewPost = await axios.post(
      newPostURL,
      {
        data: formData
      },
      {
        headers: { Authorization: `${BEARER} ${token}` }
      }
    )

    Swal.fire({
      icon: "success",
      title: "Success"
    })

    dispatch(newPost_success())
    navigate("/blog")
  } catch (error) {
    console.log("error", error)
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Oppss , Something went wrong"
    })
    dispatch(newPost_error())
  }
}

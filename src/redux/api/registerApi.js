import axios from "axios"
import Swal from "sweetalert2"
import { registerURL, loginURL } from "../../constants/apis"
import Cookies from "universal-cookie"

import {
  register_begin,
  register_success,
  register_error,
  login_begin,
  login_error,
  login_success
} from "../slice/registerSlice"

export const registerUser = async (dispatch, navigate, emailData) => {
  dispatch(register_begin())

  try {
    // call register API
    const RegisterUser = await axios.post(registerURL, emailData)

    Swal.fire({
      icon: "success",
      title: "Success",
      text: `${RegisterUser.data.user.username} Registered Succesfully`
    })

    const cookies = new Cookies()
    cookies.set("user_jwt", RegisterUser.data.jwt)
    cookies.set("user_name", RegisterUser.data.user.username)

    dispatch(register_success())
    navigate("/blog")
  } catch (error) {
    // console.log("error", error.response.data.error.message);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: `${error.response.data.error.message}`
    })
    dispatch(register_error())
  }
}

export const loginUser = async (dispatch, navigate, emailData) => {
  dispatch(login_begin())
  try {
    // call login API
    const LoginUser = await axios.post(loginURL, emailData)

    Swal.fire({
      icon: "success",
      title: "Success",
      text: `${LoginUser.data.user.username} logged Succesfully`
    })

    const cookies = new Cookies()
    cookies.set("user_jwt", LoginUser.data.jwt)
    cookies.set("user_name", LoginUser.data.user.username)

    dispatch(login_success(emailData))
    navigate("/blog")
  } catch (error) {
    // console.log("error", error.response.data.error.message);

    Swal.fire({
      icon: "error",
      title: "Error",
      text: `${error.response.data.error.message}`
    })
    dispatch(login_error())
  }
}

export const Logout = () => {
  const cookies = new Cookies()
  cookies.remove("user_jwt")
  cookies.remove("user_name")
}

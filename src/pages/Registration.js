import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

import { registerUser } from "../redux/api/registerApi"

export default function Registration() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const formChangeFunc = (e) => {
    const name = e.target.name
    const value = e.target.value
    setRegisterForm({ ...registerForm, [name]: value })
  }

  const registerUserFunc = (e) => {
    e.preventDefault()

    // console.log(registerForm);
    if (
      registerForm.email == "" ||
      registerForm.password == "" ||
      registerForm.confirmPassword == ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Field(s) cannot be empty"
      })
    }

    if (registerForm.confirmPassword != registerForm.password) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Passwords must match"
      })
    }

    registerUser(dispatch, navigate, registerForm)
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  name="email"
                  type="email"
                  value={registerForm.email}
                  autoComplete="email"
                  onChange={formChangeFunc}
                  className="block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  name="username"
                  type="text"
                  value={registerForm.username}
                  autoComplete="username"
                  onChange={formChangeFunc}
                  className="block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block  text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm"></div>
              </div>
              <div className="mt-2">
                <input
                  name="password"
                  type="password"
                  value={registerForm.password}
                  autoComplete="email"
                  onChange={formChangeFunc}
                  className="block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block  text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
                <div className="text-sm"></div>
              </div>
              <div className="mt-2">
                <input
                  name="confirmPassword"
                  type="password"
                  value={registerForm.confirmPassword}
                  autoComplete="email"
                  onChange={formChangeFunc}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={registerUserFunc}
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            <Link to="/login" className="m-10 text-sm text-gray-500">
              {" "}
              Already have an account ?{" "}
              <span className="text-red-700">Login</span>{" "}
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

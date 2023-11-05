import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"
import Cookies from "universal-cookie"
import { editBlogApi, editTitle } from "./../redux/api/BlogAPI"

import { Form } from "../redux/api/submitFormApi"

export default function EditPostForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cookies = new Cookies()
  const { id } = useParams()
  const { loading, post } = useSelector((state) => state.fetchPost)

  useEffect(() => {
    editBlogApi(dispatch, id)
  }, [])

  const [postForm, setPostForm] = useState({ ...post })
  const formChangeFunc = (e) => {
    const name = e.target.name
    const value = e.target.value
    console.log("postForm", postForm)
    setPostForm({ ...postForm, [name]: value })
  }

  useEffect(() => {
    setPostForm({ ...post })
    console.log(postForm)
  }, [loading])

  console.log("postForm ", postForm)

  const submitFunc = (e) => {
    e.preventDefault()

    // console.log(registerForm);
    if (postForm.title == "" || postForm.post == "") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Field(s) cannot be empty"
      })
      return
    }

    Form(dispatch, navigate, postForm)
  }

  if (loading) {
    return <p> Loading </p>
  }

  // if (postForm) {
  //   return <p>true</p>
  // }

  return (
    <div className="container mt-8 mx-auto w-4/6">
      <form onSubmit={submitFunc}>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Edit Post
          </h2>
        </div>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Title
                </label>
                {postForm && (
                  <div className="mt-2">
                    <input
                      type="text"
                      name="title"
                      value={postForm["posts"]["attributes"]["title"]}
                      onChange={(event) => editTitle(event, dispatch)}
                      autoComplete="given-name"
                      className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                )}
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Post
                </label>
                <div className="mt-2">
                  <textarea
                    name="post"
                    value={post["posts"]["attributes"]["post"]}
                    onChange={formChangeFunc}
                    rows={3}
                    className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
              </div>
            </div>
            <button className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
              Button
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

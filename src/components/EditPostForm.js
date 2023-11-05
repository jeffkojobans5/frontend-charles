import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import Swal from "sweetalert2"
import Cookies from "universal-cookie"
import { updateBlog } from "./../redux/api/BlogAPI"

import { Form } from "../redux/api/submitFormApi"
import { fetchPostURL } from "../constants/apis"

export default function EditPostForm() {
  const editBlogApi = async () => {
    try {
      const cookies = new Cookies()
      const token = cookies.get("user_jwt")
      const BEARER = "bearer"

      const posts = await axios.get(`${fetchPostURL}/${id}`, {
        headers: { Authorization: `${BEARER} ${token}` }
      })

      if (posts["status"] == 200) {
        setLoading(false)
        setPostForm({
          title: posts["data"]["data"]["attributes"]["title"],
          post: posts["data"]["data"]["attributes"]["post"]
        })
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    editBlogApi()
  }, [])

  const [postForm, setPostForm] = useState({ title: "", post: "" })
  const [loading, setLoading] = useState(true)

  const formChangeFunc = (e) => {
    const name = e.target.name
    const value = e.target.value
    setPostForm({ ...postForm, [name]: value })
  }

  const submitFunc = (e) => {
    e.preventDefault()

    if (postForm.title == "" || postForm.post == "") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Field(s) cannot be empty"
      })
      return
    }

    updateBlog(dispatch, navigate, postForm, id)
  }

  if (loading) {
    return <p> Loading </p>
  }

  return (
    <div className="container w-4/6 mx-auto mt-8">
      <form onSubmit={submitFunc}>
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Edit Post
          </h2>
        </div>
        <div className="space-y-12">
          <div className="pb-12 border-b border-gray-900/10">
            <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                      value={postForm["title"]}
                      onChange={formChangeFunc}
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
                    value={postForm["post"]}
                    onChange={formChangeFunc}
                    rows={3}
                    className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <button className="px-4 py-2 mt-5 font-bold text-white bg-blue-500 border border-blue-700 rounded hover:bg-blue-700">
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

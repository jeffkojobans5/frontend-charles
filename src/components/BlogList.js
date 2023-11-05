import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import fetchBlogApi from "../redux/api/BlogAPI"
import moment from "moment"
import Cookies from "universal-cookie"
import { Link } from "react-router-dom"

export default function BlogList() {
  const dispatch = useDispatch()
  const { loading, posts } = useSelector((state) => state.fetchPost)
  const cookies = new Cookies()
  const current_user = cookies.get("user_name")
  console.log(current_user)

  useEffect(() => {
    fetchBlogApi(dispatch)
  }, [])

  if (loading) {
    console.log(posts.length)
    return <p> Loading </p>
  }

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto  max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            From the blog
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Learn how to grow your business with our expert advice.
          </p>
        </div>
        <div className="mx-auto  mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts["posts"]?.map((post) => (
            <article
              key={post["attributes"]["publishedAt"]}
              className="flex z-0 bg-indigo-100 p-5 rounded max-w-xl flex-col items-start "
            >
              <div className="flex items-center gap-x-4 text-xs">
                <p> {moment(post["attributes"]["publishedAt"]).fromNow()} </p>
                {post["attributes"]["author"] == current_user ? (
                  <Link
                    to={`/editPost/${post["id"]}`}
                    className="bg-red-300 z-10 px-3 py-1 rounded"
                  >
                    Edit Post
                  </Link>
                ) : (
                  ""
                )}
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <span className="absolute inset-0" />
                  {post["attributes"]["title"]}
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electron
                </p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-500">
                    <span className="absolute inset-0" />
                    Author : {post["attributes"]["author"]}
                  </p>{" "}
                  <br />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

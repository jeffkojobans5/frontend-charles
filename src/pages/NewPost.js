import React from "react"
import Header from "../components/Header"
import BlogList from "../components/BlogList"
import NewPostForm from "../components/NewPostForm"

export const NewPost = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto max-w-500">
        <NewPostForm />
      </div>
    </>
  )
}

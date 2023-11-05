import React from "react"
import Header from "../components/Header"
import BlogList from "../components/BlogList"

export const Blog = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto max-w-500">
        <BlogList />
      </div>
    </>
  )
}

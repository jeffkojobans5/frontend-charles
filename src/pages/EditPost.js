import React from "react"
import Header from "../components/Header"
import BlogList from "../components/BlogList"
import EditForm from "../components/EditPostForm"

export const Edit = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto max-w-500">
        <EditForm />
      </div>
    </>
  )
}

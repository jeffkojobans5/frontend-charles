import React from "react"
import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.registerSlice)
  let location = useLocation()

  if (isAuthenticated == undefined) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return children
}

export default ProtectedRoute

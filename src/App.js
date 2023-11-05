import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useSelector } from "react-redux"
import Registration from "./pages/Registration"
import Login from "./pages/Login"
import { Blog } from "./pages/Blog"
import { NewPost } from "./pages/NewPost"
import { Edit } from "./pages/EditPost"
import ProtectedRoute from "./redux/protectRoute"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/" element={<Blog />} />

        <Route
          path="/addpost"
          element={
            <ProtectedRoute>
              <NewPost />
            </ProtectedRoute>
          }
        />

        <Route
          path="/editpost/:id"
          element={
            <ProtectedRoute>
              <Edit />
            </ProtectedRoute>
          }
        />

        {/* <Route
          path="/login"
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />

        <Route
          path="/register"
          element={
            <ProtectedRoute>
              <Blog />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App

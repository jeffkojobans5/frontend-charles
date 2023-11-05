import { BrowserRouter, Routes, Route } from "react-router-dom"
import Registration from "./pages/Registration"
import Login from "./pages/Login"
import { Blog } from "./pages/Blog"
import { NewPost } from "./pages/NewPost"
import { Edit } from "./pages/EditPost"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/addpost" element={<NewPost />} />
        <Route path="/editpost/:id" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

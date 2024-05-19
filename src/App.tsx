import { Route, Routes } from "react-router-dom"
import Layout from "./Layout"
import HomePage from "./pages/HomePage"
import Register from "./pages/Register"
import Login from "./pages/Login"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  )
}

export default App

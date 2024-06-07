import { Route, Routes } from "react-router-dom"
import Layout from "./Layout"
import HomePage from "./pages/HomePage"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import RequireAuth from "./RequireAuth"
import { useEffect, useLayoutEffect } from "react"
import { useAppDispatch } from "./feature/redux-hook"
import { getMe, setUserAuth } from "./feature/user/user-slice"
import CreateArt from "./pages/CreateArt"




function App() {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    // localStorage.clear();
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setUserAuth(token))
      dispatch(getMe(token))
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="profile/:id" element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        } />
        <Route path="art" element={
          <RequireAuth>
            <CreateArt />
          </RequireAuth>
        } />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  )
}

export default App

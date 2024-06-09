import { Route, Routes } from "react-router-dom"
import Layout from "./Layout"
import HomePage from "./pages/HomePage"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import RequireAuth from "./RequireAuth"
import { useLayoutEffect } from "react"
import { useAppDispatch } from "./feature/redux-hook"
import { getMe, getMeReducer, setUserAuth } from "./feature/user/user-slice"
import CreateArt from "./pages/CreateArt"
import DetailArt from "./pages/DetailArt"
import axios from "axios"




function App() {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    // localStorage.clear();
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setUserAuth(token))
      dispatch(getMe(token))

      const fetchInfoUser = async () => {
        const { data } = await axios.get(`http://localhost:5000/api/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        // console.log('Our User', data)
        // setUserInfo(data)
        dispatch(getMeReducer(data))
      }
      fetchInfoUser()
    }
  }, []);


  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="profile" element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        } />
        <Route path="profile/:id" element={<Profile />} />
        <Route path="art/:id" element={<DetailArt />} />
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

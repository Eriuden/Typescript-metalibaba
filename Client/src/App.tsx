import { useEffect, useState } from 'react'
import axios from 'axios'
import { Header } from './components/Header'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Home } from './pages/Home'
import { Searcher } from './components/Searcher'
import { getUser } from './redux/actions/user.actions'
import { UserProfile } from './pages/UserProfile'
import { ResetPassword } from './pages/ResetPassword'
import UpdatePassword from './pages/UpdatePassword'
import { ArticlePage } from './pages/ArticlePage'
import { Cart } from './pages/Cart'
import './App.css'

function App() {
  const [uid, setUid] = useState("")
  const dispatch = useDispatch()

  useEffect(()=> {
    const fetchToken = async () => {
      await axios({
        method:"get",
        url: `${process.env.REACT_APP_API_URL}/jwtid`,
        withCredentials: true
      })
      .then((res) => {
        console.log(res)
        setUid(res.data)
      })
      .catch(() => console.log("Pas de tokens"))
    }
    fetchToken()
    if (uid)
     dispatch(getUser(uid))
  }, [uid])
  

  return (
    <>
      <div>
        <Header/>
        <Searcher/>
        <Routes>
          <Route path={"/"} element={<Home/>}/>
          <Route path={"/user-profile/:id"} element={<UserProfile/>}/>
          <Route path={"/reset-password"} element={<ResetPassword/>}/>
          <Route path={"/update-password"} element={<UpdatePassword/>}/>
          <Route path={"/article-page/:id"} element={<ArticlePage/>}/>
          <Route path={"/cart"} element={<Cart/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App

import React, { useEffect } from 'react'
import{Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Navbarr from './components/Navbar'
import { useAuthStore } from './store/useAuthStore'

const App = () => {
 const{authUser,checkAuth}= useAuthStore()

 useEffect(() =>{
   checkAuth()
 },[checkAuth])
 console.log(authUser)  
  return (
    <div>
      <Navbarr />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='*' element={<h1>404 Not Found</h1>} />
        {/* Add more routes as needed */}
      </Routes>
      
    </div>
  )
}

export default App